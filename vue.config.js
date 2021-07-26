// vue.config.js
module.exports = {
    chainWebpack: config => {
        config.devServer
            .disableHostCheck(true)
    },
    configureWebpack: {
        optimization: {
            splitChunks: {
                minSize: 10000,
                maxSize: 250000,
            }
        }
    }
}