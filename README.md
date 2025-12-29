# 🏝️ Jakarta Tourism Recommendation System

<div align="center">

![Python](https://img.shields.io/badge/Python-3.9+-blue?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

**A web application for recommending tourist destinations in Jakarta using Content-Based Filtering with TF-IDF and Cosine Similarity.**

[Demo](#demo) • [Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [API](#-api-endpoints) • [Contributing](#-contributing)

</div>

---

## 📖 Description

Jakarta Tourism Recommendation System is a web application that helps users discover tourist destinations in Jakarta based on their preferences. When a user selects a tourist destination, the system recommends 10 other similar places based on category.

### How It Works

1. **TF-IDF (Term Frequency-Inverse Document Frequency)**: Converts tourism categories into numerical vectors
2. **Cosine Similarity**: Calculates similarity between destinations based on TF-IDF vectors
3. **Ranking**: Sorts destinations by highest similarity score

---

## ✨ Features

| Feature                   | Description                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------ |
| 🔍 **Smart Search**       | Autocomplete search with real-time filtering                                         |
| 🤖 **AI Recommendations** | 10 similar destination recommendations based on category                             |
| 📍 **85+ Destinations**   | Complete Jakarta tourism database                                                    |
| 🏷️ **6 Categories**       | Culture, Theme Parks, Maritime, Nature Reserves, Shopping Centers, Places of Worship |
| 💰 **Rupiah Format**      | Ticket prices in Indonesian currency format (Rp)                                     |
| 🌙 **Dark Mode**          | Modern design with dark theme                                                        |
| 📱 **Responsive**         | Optimal display on desktop and mobile                                                |

---

## 🛠️ Tech Stack

### Backend

| Technology   | Version | Purpose                    |
| ------------ | ------- | -------------------------- |
| Python       | 3.9+    | Main programming language  |
| FastAPI      | 0.100+  | REST API framework         |
| Pandas       | 2.0+    | Data manipulation          |
| Scikit-learn | 1.3+    | TF-IDF & Cosine Similarity |
| Uvicorn      | 0.23+   | ASGI server                |

### Frontend

| Technology   | Version | Purpose     |
| ------------ | ------- | ----------- |
| React        | 18.3    | UI library  |
| Vite         | 6.0     | Build tool  |
| Tailwind CSS | 3.4     | Styling     |
| Axios        | 1.6     | HTTP client |

---

## 📁 Project Structure

```
jakartourism-v2/
├── 📂 server/                    # FastAPI Backend
│   ├── main.py                   # API endpoints & ML logic
│   ├── requirements.txt          # Python dependencies
│   ├── tourism_with_id.csv       # Destination dataset
│   └── tourism_rating.csv        # Rating dataset
│
├── 📂 client/                    # React Frontend
│   ├── index.html                # HTML entry point
│   ├── package.json              # Node.js dependencies
│   ├── vite.config.js            # Vite configuration
│   ├── tailwind.config.js        # Tailwind configuration
│   ├── postcss.config.js         # PostCSS configuration
│   └── 📂 src/
│       ├── main.jsx              # React entry point
│       ├── App.jsx               # Main component
│       ├── index.css             # Global styles
│       ├── 📂 api/
│       │   └── api.js            # Axios API calls
│       └── 📂 components/
│           ├── HeroSection.jsx       # Header & intro
│           ├── SearchBar.jsx         # Search with autocomplete
│           ├── DestinationDetail.jsx # Selected destination details
│           ├── DestinationCard.jsx   # Recommendation card
│           └── RecommendationList.jsx # Recommendation grid
│
├── .gitignore                    # Git ignore rules
└── README.md                     # Documentation (this file)
```

---

## 🚀 Installation

### Prerequisites

- **Python** 3.9 or higher
- **Node.js** 18 or higher
- **npm** or **yarn**

### 1. Clone Repository

```bash
git clone https://github.com/username/jakartourism-v2.git
cd jakartourism-v2
```

### 2. Backend Setup

```bash
# Navigate to server folder
cd server

# Create virtual environment (optional but recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run server
python -m uvicorn main:app --reload --port 8000
```

Server will run at `http://localhost:8000`

### 3. Frontend Setup

```bash
# Open new terminal, navigate to client folder
cd client

# Install dependencies
npm install

# Run development server
npm run dev
```

Application will run at `http://localhost:5173`

---

## 🔌 API Endpoints

### Base URL

```
http://localhost:8000
```

### Endpoints

#### 1. Get All Destinations

Retrieves list of all Jakarta tourist destinations.

```http
GET /destinations
```

**Response:**

```json
{
  "total": 85,
  "destinations": [
    {
      "Place_Id": 1,
      "Place_Name": "Monumen Nasional",
      "Category": "Budaya",
      "Rating": 4.6,
      "Price": 20000
    },
    ...
  ]
}
```

#### 2. Get Recommendations

Retrieves 10 similar destination recommendations.

```http
GET /recommend/{place_name}
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| place_name | string | Destination name (URL encoded) |

**Example:**

```http
GET /recommend/Taman%20Impian%20Jaya%20Ancol
```

**Response:**

```json
{
  "query": "Taman Impian Jaya Ancol",
  "total_recommendations": 10,
  "recommendations": [
    {
      "Place_Id": 3,
      "Place_Name": "Dunia Fantasi",
      "Category": "Taman Hiburan",
      "Description": "...",
      "Rating": 4.6,
      "Price": 270000,
      "Similarity_Score": 1.0
    },
    ...
  ]
}
```

#### 3. Get Destination Detail

Retrieves full details of a destination.

```http
GET /detail/{place_name}
```

**Response:**

```json
{
  "Place_Id": 6,
  "Place_Name": "Taman Impian Jaya Ancol",
  "Category": "Taman Hiburan",
  "City": "Jakarta",
  "Description": "Taman Impian Jaya Ancol is a recreation area in North Jakarta.",
  "Rating": 4.5,
  "Price": 25000,
  "Lat": -6.1173332,
  "Long": 106.8579951
}
```

---

## 📊 Dataset

### tourism_with_id.csv

Main dataset containing tourist destination information.

| Column      | Type   | Description              |
| ----------- | ------ | ------------------------ |
| Place_Id    | int    | Unique destination ID    |
| Place_Name  | string | Destination name         |
| Description | string | Full description         |
| Category    | string | Tourism category         |
| City        | string | City (filtered: Jakarta) |
| Price       | int    | Ticket price (Rupiah)    |
| Rating      | float  | Average rating (1-5)     |
| Lat         | float  | Latitude coordinate      |
| Long        | float  | Longitude coordinate     |

### Tourism Categories in Jakarta

1. **Budaya (Culture)** - Museums, monuments, historical sites
2. **Taman Hiburan (Theme Parks)** - Theme parks, waterparks, amusement parks
3. **Bahari (Maritime)** - Beaches, islands, marine tourism
4. **Cagar Alam (Nature Reserves)** - Forests, zoos, nature parks
5. **Pusat Perbelanjaan (Shopping Centers)** - Malls, markets, shopping areas
6. **Tempat Ibadah (Places of Worship)** - Historic mosques, churches, temples

---

## 🧮 Recommendation Algorithm

### Content-Based Filtering

The system uses a Content-Based Filtering approach that recommends destinations based on content similarity (category).

### Steps:

1. **Preprocessing**

   - Filter data for Jakarta city only
   - Remove unnecessary columns

2. **TF-IDF Vectorization**

   ```python
   from sklearn.feature_extraction.text import TfidfVectorizer

   tf = TfidfVectorizer()
   tfidf_matrix = tf.fit_transform(destination['Category'])
   ```

3. **Cosine Similarity**

   ```python
   from sklearn.metrics.pairwise import cosine_similarity

   cosine_sim = cosine_similarity(tfidf_matrix)
   ```

4. **Generate Recommendations**
   - Get similarity scores for selected destination
   - Sort by highest score
   - Take top 10 (excluding the destination itself)

### Example Similarity Matrix

|                  | Monumen Nasional | Kota Tua | Dunia Fantasi |
| ---------------- | ---------------- | -------- | ------------- |
| Monumen Nasional | 1.0              | 1.0      | 0.0           |
| Kota Tua         | 1.0              | 1.0      | 0.0           |
| Dunia Fantasi    | 0.0              | 0.0      | 1.0           |

> Destinations with the same category have similarity score of 1.0

---

## 🐛 Troubleshooting

### Error: "Data belum dimuat" (Data not loaded)

- Make sure CSV files are in the `server/` folder
- Restart the backend server

### Error: "Gagal memuat data destinasi" (Failed to load destinations)

- Make sure backend is running at `http://localhost:8000`
- Check CORS settings in `main.py`

### Frontend not working

```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
npm run dev
```

### Backend not working

```bash
# Make sure virtual environment is activated
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Komara Indra Putra**

- GitHub: [@komaraip](https://github.com/komaraip)

---

<div align="center">

Made with ❤️ for Jakarta Tourism

</div>
