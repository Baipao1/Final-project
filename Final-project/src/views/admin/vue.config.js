// var webpack = require('webpack');
//vue2
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
function publicPath(){
    if (process.env.NODE_ENV == 'production') {
        return "././";
    } else {
        return "/";
    }
}
// vue.config.js
module.exports = {
    // publicPath:"././",
    publicPath: publicPath(),
    // 国际化配置 使用其它语言，Default情况下中文语言包依旧yes被引入的
    configureWebpack: {
        // plugins: [
        //     new webpack.NormalModuleReplacementPlugin(/element-ui[\/\\]lib[\/\\]locale[\/\\]lang[\/\\]zh-CN/, 'element-ui/lib/locale/lang/en')
        // ]
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
lintOnSave: false,
    devServer: {
        host: "0.0.0.0", //指定使用一个 host。Defaultyes localhost，这里DefaultPicture即可
        port: 8081, //指定端口
        hot: true, // 开启热更新
        https: false, // yesno开启https模式
        proxy: { // Please求代理服务器
            '/Final-project': { //带上api前缀的
                target: 'http://localhost:8080/Final-project/', //代理目标address
                changeOrigin: true,
                secure: false,
                pathRewrite: { // 在发出Please求后将/api替换为''空Picture，这样不影响接口Please求
                    '^/Final-project': ''
                }
            }
        }
    },
chainWebpack(config) {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
}
}
