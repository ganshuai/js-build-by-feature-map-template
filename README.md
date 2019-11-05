#### 说明

此工程是一个非常简易的vue工程，主要是为了说明js-build-by-feature-map-express-service的使用

service.js提供了前端开发服务中的一些基本功能：http，转发，编译和打包。


#### service.js

service.js是使用express提供前端的开发服务，js-build-by-feature-map-express-service提供动态转化打包服务，http-proxy-middleware提供代理服务



#### service.js中配置说明

port：前端开发服务的端口号

pagesDirectory: html文件的存放目录，在此工程为pages

pagesUrl: 页面访问的url，在此工程为/pages

scriptsUrl: js请求的url，在此工程为/scripts。注意，scripts不需要文件目录路径是因为js-build-by-feature-map-express-service会根据webpack中的output自动识别

ajaxBaseUrl: ajax请求的基础路径，此工程未涉及。此配置是为了在mock模式下代理ajax请求到mock服务

public: 静态文件的请求url，此工程未涉及。注意，public不需要public的文件目录路径是因为service.js中默认public的请求返回是依赖于mock服务或者远程服务器。如果需要在service.js中自己实现，则可以按照pages的方式配置：

```javascript
var publicDirectory = path.resolve(__dirname, '../public')
app.use(config.public, express.static(publicDirectory))
```

mockServiceUrl: mock服务的请求url

remoteServiceUrl：远程服务器地址。在非mock模式下，除了/pages下的所有请求都会真实请求到远程服务器。在mock模式下，所有未在本地处理的请求都会发送到远程服务器。

isMockMode：是否以mock方式运行，推荐使用`cross-env`传递。参考npm run start:mock

webpackConfig：webpack的配置



#### service.js使用的依赖

1. express
2. js-build-by-feature-map-express-service
3. http-proxy-middleware
4. open



#### 工程

pages目录存放html页面

dist目录存放js打包代码

src存放源代码

mock服务在此工程中未提供，推荐使用node-mock-server



#### 快速配置

可以按照如下步骤快速配置一个工程的js-build-by-feature-map：

1. 做好除了js-build-by-feature-map以外的配置，确保工程能正确build代码
2. 拷贝service.js到工程根目录
3. 根据工程需要配置service.js中的config
4. 安装service.js中使用到的依赖
5. 在package.json中添加命令service: node service.js。或者直接运行node service.js