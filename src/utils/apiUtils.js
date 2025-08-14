/**
 * API endpoint'i oluşturan yardımcı fonksiyon
 * @param {string} path - API endpoint path'i (örn. "/api/chat")
 * @returns {string} Tam API endpoint URL'si
 */
export const getApiEndpoint = (path) => {
  // Path'in başında / varsa kontrol et
  const formattedPath = path.startsWith('/') ? path : `/${path}`;
  
  // AllOrigins proxy kullanarak Mixed Content hatasını çöz
  // Bu proxy daha güvenilir ve kısıtlamasız
  return `https://api.allorigins.win/raw?url=${encodeURIComponent(`http://94.154.32.75:8092${formattedPath}`)}`;
};

/**
 * Fetch API'yi CORS sorunlarını çözerek kullanmak için yardımcı fonksiyon
 * @param {string} url - API URL
 * @param {Object} options - Fetch options
 * @returns {Promise} Fetch promise
 */
export const fetchWithProxy = async (url, options = {}) => {
  try {
    // AllOrigins proxy için POST isteklerini özel olarak işle
    if (options.method === 'POST') {
      // POST istekleri için özel işleme
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: options.body
      });
      return response;
    } else {
      // Diğer istekler için normal fetch
      const response = await fetch(url, {
        ...options,
        mode: 'cors',
        credentials: 'omit',
        headers: {
          ...options.headers,
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      return response;
    }
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
