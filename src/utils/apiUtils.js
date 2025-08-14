/**
 * API URL'yi protokole ve ortama göre ayarlayan yardımcı fonksiyon
 * @returns {string} API URL
 */
export const getApiUrl = () => {
  // Her zaman .env dosyasındaki URL'yi kullan
  let apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080';
  
  // Eğer sayfa HTTPS üzerinden yüklendiyse ve API URL'si HTTP ise, HTTPS'e çevir
  if (window.location.protocol === 'https:' && apiUrl.startsWith('http:')) {
    apiUrl = apiUrl.replace('http:', 'https:');
  }
  return apiUrl;
};

/**
 * API endpoint'i oluşturan yardımcı fonksiyon
 * @param {string} path - API endpoint path'i (örn. "/api/chat")
 * @returns {string} Tam API endpoint URL'si
 */
export const getApiEndpoint = (path) => {
  const apiUrl = getApiUrl();
  
  // Üretim ortamında CORS proxy kullan
  if (process.env.NODE_ENV === 'production' && !apiUrl.includes('localhost')) {
    // CORS proxy kullanmak yerine doğrudan URL'yi döndür
    return `${apiUrl}${path}`;
  }
  
  return `${apiUrl}${path}`;
};
