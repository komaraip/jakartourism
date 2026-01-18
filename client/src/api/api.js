import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Mengambil daftar semua destinasi wisata Jakarta
 */
export const getDestinations = async () => {
  try {
    const response = await api.get('/destinations');
    return response.data;
  } catch (error) {
    console.error('Error fetching destinations:', error);
    throw error;
  }
};

/**
 * Mengambil rekomendasi berdasarkan nama tempat
 * @param {string} placeName - Nama tempat wisata
 */
export const getRecommendations = async (placeName) => {
  try {
    const encodedName = encodeURIComponent(placeName);
    const response = await api.get(`/recommend/${encodedName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};

/**
 * Mengambil detail lengkap destinasi
 * @param {string} placeName - Nama tempat wisata
 */
export const getDetail = async (placeName) => {
  try {
    const encodedName = encodeURIComponent(placeName);
    const response = await api.get(`/detail/${encodedName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching detail:', error);
    throw error;
  }
};

/**
 * Mengambil daftar kategori wisata dengan jumlah destinasi
 */
export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

/**
 * Mengambil daftar destinasi berdasarkan kategori
 * @param {string} categoryName - Nama kategori
 */
export const getDestinationsByCategory = async (categoryName) => {
  try {
    const encodedName = encodeURIComponent(categoryName);
    const response = await api.get(`/destinations/category/${encodedName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching destinations by category:', error);
    throw error;
  }
};

/**
 * Format harga ke Rupiah Indonesia
 * @param {number} price - Harga dalam angka
 */
export const formatRupiah = (price) => {
  if (price === 0) return 'Gratis';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export default api;
