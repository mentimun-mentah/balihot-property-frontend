module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    API_URL: 'http://backend:5000'
    // API_URL: process.env.API_URL
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    API_URL: process.env.API_URL
  },
  env: {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    API_URL: process.env.API_URL,
    BASE_URL: process.env.BASE_URL
  }
};
