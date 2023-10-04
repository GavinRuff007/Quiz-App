const pathPrefix = process.env.NODE_ENV === 'production'
  ? '/Quiz-App'
  : '';

module.exports = {
  assetPrefix: pathPrefix,
  env: {
    pathPrefix,
  },
};