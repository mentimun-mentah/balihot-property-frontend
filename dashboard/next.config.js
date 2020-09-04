module.exports = {
  assetPrefix: process.env.DASHBOARD_URL,
  serverRuntimeConfig: {
    // Will only be available on the server side
    API_URL: process.env.BACKEND_URL
    // API_URL: process.env.API_URL
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    API_URL: process.env.API_URL
  },
  env: {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    API_URL: process.env.API_URL,
    BASE_URL: process.env.BASE_URL,
    DASHBOARD_URL: process.env.DASHBOARD_URL,
    BACKEND_URL: process.env.BACKEND_URL,
    DOMAIN: process.env.DOMAIN,
    SECRET_KEY: process.env.SECRET_KEY,
  },
}
