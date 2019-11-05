var service = require('js-build-by-feature-map-express-service')
var express = require('express')
var webpackConfig = require('./webpack.config')
var path = require('path')
var proxy = require('http-proxy-middleware')
var open = require('open')

// 工程配置
var config = {
  port: 81, //开发服务端口号
  pagesDirectory: './pages', //页面html目录
  pagesUrl: '/pages', //页面请求的url
  scriptsUrl: '/scripts', //js请求的url
  ajaxBaseUrl: '/api', //ajax请求的base url
  public: '/public', //静态资源的url。如：图片等
  mockServiceUrl: 'http://localhost:8081', //mock服务的url
  remoteServiceUrl: 'http://dev.service.com', //非mock服务的url
  isMockMode: process.env.MOCK, //是否以mock方式启动
  webpackConfig: require('./webpack.config') //工程webpack的config配置
}

var app = express()
var target = config.isMockMode ? config.mockServiceUrl : config.remoteServiceUrl

var localProxyHandle = proxy({
  target: target,
  changeOrigin: true
})
var remoteProxyHandle = config.isMockMode ? localProxyHandle : proxy({
  target: config.remoteServiceUrl,
  changeOrigin: true
})

var pageDirectory = path.resolve(__dirname, config.pagesDirectory)
var pageHandle = express.static(pageDirectory)
app.use(config.pagesUrl, function(req, res, next) {
  if(/\.html\b/.test(req.originalUrl)) {
    return pageHandle(req, res, next)
  }

  return remoteProxyHandle(req, res, next)
})

service.service(app, {
  route: config.scriptsUrl,
  webpackConfig: config.webpackConfig,
  buildConfig: {
    isDifferentFile: true
  }
})

app.use(config.ajaxBaseUrl, localProxyHandle)
app.use(config.public, localProxyHandle)
app.all('*', remoteProxyHandle)

app.listen(config.port)
var url = `http://localhost:${config.port}/pages/index.html`
console.log(`started at ${url}`)
open(url)