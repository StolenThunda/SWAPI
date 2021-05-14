module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://swapi.dev/api/',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/api': '/' },
      },
    },
  },
};
