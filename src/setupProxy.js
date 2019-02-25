const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use('/safe',
    proxy({ 
      target:'http://aqhy-common.citydo.com.cn',
      secure: false,
      changeOrigin: true
    })
  )
  //https://zlxprod.citydo.com.cn
// "proxy": "http://172.16.16.77:8071",

  //http://172.16.16.77:8071
  //http://10.72.1.155:81
  //http://aqhy-admin.citydo.com.cn

}