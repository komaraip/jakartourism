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
    return isset($row[4]) && $row[4] === 'Jakarta'; // Misalkan kolom 4 adalah nama kota
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
    // Tambahkan pembobotan yang lebih komprehensif
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
            
            // Gabungkan TF-IDF dengan faktor tambahan
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
            // Tambahkan mekanisme smoothing
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

    // Dapatkan informasi tempat asal
    $original_place = $places[$index];
    
    $weighted_scores = [];
    foreach ($similarities as $i => $score) {
        $current_place = $places[$i];
        
        // Filter berdasarkan kriteria tambahan
        $score_multipliers = [
            // Prioritaskan rekomendasi dengan kategori mirip
            'category_match' => ($current_place['category'] === $original_place['category']) ? 1.5 : 1,
            
            // Pertimbangkan rentang harga yang mirip
            'price_similarity' => 1 - abs($current_place['price'] - $original_place['price']) / 
                                   max($current_place['price'], $original_place['price'] + 1),
            
            // Prioritaskan rating tinggi
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
    <title>Jakarta Destination Recommendations</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css">
    <script>
        function updateCategory() {
            var select = document.getElementById("placeDropdown");
            var selectedCategory = select.options[select.selectedIndex].getAttribute("data-category");
            document.getElementById("categoryDisplay").innerText = selectedCategory;
        }

        function showDescription(description) {
            document.getElementById("modalDescription").innerText = description;
            var modal = new bootstrap.Modal(document.getElementById('descriptionModal'));
            modal.show();
        }
    </script>
</head>
<body>
    <div class="container mt-5">
        <h1>JAKARTA DESTINATIONS</h1>
        <form method="POST" action="">
            <div class="mb-3">
                <h6><label for="placeDropdown" class="form-label">Destination Place:</label></h6>
                <select id="placeDropdown" name="selected_place" class="form-select" onchange="updateCategory()">
                    <option value="">Select a Destination Place</option>
                    <?php foreach ($places as $place): ?>
                        <option value="<?php echo htmlspecialchars($place['name']); ?>" data-category="<?php echo htmlspecialchars($place['category']); ?>">
                            <?php echo htmlspecialchars($place['name']); ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div>
                <h6>Destination Category:</h6>
                <p id="categoryDisplay">Select a place to see its category.</p>
            </div>
            <button type="submit" class="btn btn-primary mt-3">Get Recommendations</button>
        </form>

        <?php if (!empty($recommendations)): ?>
            <h2 class="mt-5">Recommended Destinations Similar to "<?php echo htmlspecialchars($selected_place); ?>"</h2>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Rating</th>
                        <th>Price</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($recommendations as $place): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($place['name']); ?></td>
                            <td><?php echo htmlspecialchars($place['category']); ?></td>
                            <td><?php echo htmlspecialchars($place['rating']); ?></td>
                            <td><?php echo htmlspecialchars($place['price']); ?></td>
                            <td>
                                <button class="btn btn-info" onclick="showDescription('<?php echo htmlspecialchars($place['desc']); ?>')">Detail</button>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php elseif (isset($_POST['selected_place'])): ?>
            <p>No recommendations available for "<?php echo htmlspecialchars($selected_place); ?>".</p>
        <?php endif; ?>
    </div>

    <div class="modal fade" id="descriptionModal" tabindex="-1" aria-labelledby="descriptionModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="descriptionModalLabel">Description</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p id="modalDescription"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
</body>
</html>
