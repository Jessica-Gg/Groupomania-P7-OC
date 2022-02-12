module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '^/api/': '/', // rewrite path
        }
      },
      '^/images': {
        target: 'http://localhost:3000',
      },
    }
  }
}