module.exports = {
  trailingSlash: true, // Ensures trailing slashes on all routes
  exportPathMap: function () {
    return {
      '/': { page: '/' },
    };
  },
};
