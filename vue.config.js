const model = 'dev' // dev 为开发环境 build 为测试环境  product 为生产环境

module.exports = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: './assets',
    devServer: {
        overlay: {
            warnings: false, //不显示警告
            errors: false //不显示错误
        },
        host: 'localhost',
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://169.254.110.244:8443',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    lintOnSave: false //关闭eslint检查
}
