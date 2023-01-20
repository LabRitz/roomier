module.exports = {
  DOMAIN: process.env.DOMAIN,
  PORT: process.env.PORT,
  PROTOCOL: 'https://',
  SERVER_PORT: process.env.SERVER_PORT,
  DATABASE: {
    URI: process.env.ATLAS_URI,
    dbName: process.env.DB_TABLE,
  }
}