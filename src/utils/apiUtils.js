/**
 * API endpoint'i oluşturan yardımcı fonksiyon
 * @param {string} path - API endpoint path'i (örn. "/api/chat")
 * @returns {string} Tam API endpoint URL'si
 */
export const getApiEndpoint = (path) => {
  // Path'in başında / varsa kontrol et
  const formattedPath = path.startsWith('/') ? path : `/${path}`;
  
  // JSONP kullanarak CORS sorunlarını çöz
  return `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(`http://94.154.32.75:8092${formattedPath}`)}`;
};

/**
 * Fetch API'yi CORS sorunlarını çözerek kullanmak için yardımcı fonksiyon
 * @param {string} url - API URL
 * @param {Object} options - Fetch options
 * @returns {Promise} Fetch promise
 */
export const fetchWithProxy = async (url, options = {}) => {
  try {
    // Basit fetch işlemi
    const response = await fetch(url, {
      ...options,
      mode: 'cors',
      credentials: 'omit',
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
