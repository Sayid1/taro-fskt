const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  weapp: {},
  h5: {
    devServer: {
      port: 3001,
      proxy: {
        '/api': {
          // target: 'http://192.168.1.16:8081',
          target: 'https://xuexi-dev.fsstudy.com/api',
          // target: 'https://xuexi.fsstudy.com/api',
          secure: true, // 如果是https接口，需要配置这个参数
          changeOrigin: true, // 如果接   口跨域，需要进行这个参数配置
          pathRewrite: {
              '^/api': ''
          }
        }
      },
    }
  }
}
