<?php
function readCSV($csvFile) {
    if (!file_exists($csvFile)) {
        error_log("File not found: $csvFile");
        return [];
    }
    
    $file_handle = fopen($csvFile, 'r');
    if (!$file_handle) {
        error_log("Unable to open file: $csvFile");
        return [];
    }
    
    $data = [];
    while (($row = fgetcsv($file_handle, 1024)) !== FALSE) {
        if ($row && count($row) > 1) {
            $data[] = $row;
        }
    }
    fclose($file_handle);
    return $data;
}

// Baca data
$destination_data = readCSV('tourism_with_id.csv');
$destination_rating_data = readCSV('tourism_rating.csv');
$user_data = readCSV('user.csv');

// Filter untuk tempat wisata di Jakarta
$filtered_destinations = array_filter($destination_data, function($row) {
    return isset($row[4]) && $row[4] === 'Jakarta';
});

$places = [];
foreach ($filtered_destinations as $row) {
    if (isset($row[1]) && isset($row[3]) && isset($row[2])) {
        $places[] = [
            'name' => $row[1],
            'desc' => isset($row[2]) ? $row[2] : 'No description available',
            'category' => $row[3],
            'price' => isset($row[5]) ? (float)$row[5] : 0,
            'rating' => isset($row[6]) ? (float)$row[6] : 0,
            'place_id' => $row[0]
        ];
    }
}

function generateTFIDF($places) {
    $unique_categories = array_unique(array_column($places, 'category'));
    $document_count = count($places);
    $category_doc_frequency = array_count_values(array_column($places, 'category'));
    
    $tfidf = [];
    foreach ($places as $place) {
        $tfidf_vector = [];
        foreach ($unique_categories as $category) {
            // Hitung TF (Term Frequency)
            $tf = ($place['category'] === $category) ? 1 : 0;
            
            // Hitung IDF (Inverse Document Frequency)
            $doc_with_category = isset($category_doc_frequency[$category]) ? $category_doc_frequency[$category] : 1;
            $idf = log($document_count / $doc_with_category);
            
            //TF-IDF dengan faktor tambahan
            $additional_factors = [
                'rating_weight' => $place['rating'] / 10,  // Normalisasi rating
                'price_weight' => 1 / (1 + $place['price'])  // Inversi harga
            ];
            
            $tfidf_value = $tf * $idf * 
                (1 + $additional_factors['rating_weight']) * 
                (1 + $additional_factors['price_weight']);
            
            $tfidf_vector[] = $tfidf_value;
        }
        $tfidf[] = $tfidf_vector;
    }
    return [$unique_categories, $tfidf];
}

function cosineSimilarity($matrix) {
    $similarity_matrix = [];
    foreach ($matrix as $i => $vec1) {
        $similarity_matrix[$i] = [];
        foreach ($matrix as $j => $vec2) {
            $epsilon = 1e-10;
            
            $dot_product = array_sum(array_map(function($a, $b) {
                return $a * $b;
            }, $vec1, $vec2));
            
            $magnitude1 = sqrt(array_sum(array_map(function($x) {
                return $x * $x;
            }, $vec1)) + $epsilon);
            
            $magnitude2 = sqrt(array_sum(array_map(function($x) {
                return $x * $x;
            }, $vec2)) + $epsilon);
            
            $similarity_matrix[$i][$j] = $dot_product / ($magnitude1 * $magnitude2);
        }
    }
    return $similarity_matrix;
}

function getWeightedRecommendations($place_name, $places, $tfidf_matrix, $k = 10) {
    $index = array_search($place_name, array_column($places, 'name'));
    if ($index === false) return [];

    $cosine_sim_matrix = cosineSimilarity($tfidf_matrix);
    $similarities = $cosine_sim_matrix[$index];

    // Informasi tempat asal
    $original_place = $places[$index];
    
    $weighted_scores = [];
    foreach ($similarities as $i => $score) {
        $current_place = $places[$i];
        
        // Filter
        $score_multipliers = [
            // Pkategori mirip
            'category_match' => ($current_place['category'] === $original_place['category']) ? 1.5 : 1,
            
            // rentang harga yang mirip
            'price_similarity' => 1 - abs($current_place['price'] - $original_place['price']) / 
                                   max($current_place['price'], $original_place['price'] + 1),
            
            // rating tinggi
            'rating_boost' => 1 + ($current_place['rating'] / 10)
        ];
        
        $weighted_score = $score * 
            $score_multipliers['category_match'] * 
            $score_multipliers['price_similarity'] * 
            $score_multipliers['rating_boost'];
        
        $weighted_scores[$i] = $weighted_score;
    }

    arsort($weighted_scores);
    $recommended = array_slice($weighted_scores, 0, $k, true);

    $recommendations = [];
    foreach ($recommended as $i => $score) {
        $recommendations[] = $places[$i];
    }
    return $recommendations;
}

list($unique_categories, $tfidf_matrix) = generateTFIDF($places);

$recommendations = [];
if (isset($_POST['selected_place'])) {
    $selected_place = $_POST['selected_place'];
    $recommendations = getWeightedRecommendations($selected_place, $places, $tfidf_matrix);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jakartourism - Explore Jakarta's Best Destinations</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="header">
        <h1>JAKARTOURISM</h1>
        <h3>Jakarta Tourist Destination Recommendations based on Similarities</h3>      
        
        <div class="search-container">
            <form method="POST">
                <select name="selected_place" onchange="this.form.submit()">
                    <option value="">Select a destination</option>
                    <?php foreach ($places as $place): ?>
                        <option value="<?php echo htmlspecialchars($place['name']); ?>"
                                <?php echo (isset($_POST['selected_place']) && $_POST['selected_place'] === $place['name']) ? 'selected' : ''; ?>>
                            <?php echo htmlspecialchars($place['name']); ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </form>
        </div>
    </header>

    <main>
        <?php if (!empty($recommendations)): ?>
            <section class="recommendations">
                <h2>Top 10 Tourist Destination Similarity Results</h2>
                <p class="txt">Explore the best tourist destinations in Indonesia's capital</p>
                <div class="destinations">
                    <?php foreach ($recommendations as $place): ?>
                        <div class="place-card" onclick="showModal('<?php echo htmlspecialchars(json_encode($place), ENT_QUOTES); ?>')">
                            <div class="place-info">
                                <h3><?php echo htmlspecialchars($place['name']); ?></h3>
                                <h4><?php echo htmlspecialchars($place['category']); ?></h4>
                                <p><?php echo htmlspecialchars(substr($place['desc'], 0, 100)) . '...'; ?></p>
                                <div class="place-meta">
                                    <span>💰 <?php echo number_format($place['price'], 0); ?> IDR</span>
                                    <span>⭐ <?php echo number_format($place['rating'], 1); ?></span>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </section>
        <?php endif; ?>

        <section class="recommendations">
            <h2>Jakarta Tourist Destinations</h2>
            <div class="destinations">
                <?php foreach ($places as $place): ?>
                    <div class="place-card" onclick="showModal('<?php echo htmlspecialchars(json_encode($place), ENT_QUOTES); ?>')">
                        <div class="place-info">
                            <h3><?php echo htmlspecialchars($place['name']); ?></h3>
                            <h4><?php echo htmlspecialchars($place['category']); ?></h4>
                            <p><?php echo htmlspecialchars(substr($place['desc'], 0, 75)) . '...'; ?></p>
                            <div class="place-meta">
                                <span>💰 <?php echo number_format($place['price'], 0); ?> IDR</span>
                                <span>⭐ <?php echo number_format($place['rating'], 1); ?></span>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="footer-content">
            <div class="footer-logo">
                <h3>Jakartourism</h3>
            </div>

            <div class="footer-links">
                <p class="txt">Explore the best tourist destinations in Indonesia's capital</p>
            </div>

            <div class="footer-copyright">
                <p>&copy; <?php echo date('Y'); ?> KomaraIP. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <div id="placeModal" class="modal">
        <div class="modal-content">
            <span class="close-modal" onclick="closeModal()">&times;</span>
            <div class="modal-details">
                <h2 id="modalTitle"></h2>
                <h4 id="modalCategory"></h4>
                <p id="modalDescription"></p>
                <div class="place-meta">
                    <span id="modalPrice"></span>
                    <span id="modalRating"></span>
                </div>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>