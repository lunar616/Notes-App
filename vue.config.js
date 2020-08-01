module.exports = {
  publicPath: process.env.NODE_ENV  === 'production'
    ? '/Notes-App/'
    : '/',
  assetsDir: 'assets',
  productionSourceMap: false,
}