// vue.config.js
const PrerenderSpaPlugin = require('prerender-spa-plugin')
const path = require('path')
const Renderer = PrerenderSpaPlugin.PuppeteerRenderer

module.exports = {
    chainWebpack: config => {
        config.devServer
            .disableHostCheck(true)
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV !== 'production') return

        return {
            optimization: {
                splitChunks: {
                    minSize: 10000,
                    maxSize: 250000,
                }
            },
            plugins: [
                new PrerenderSpaPlugin({
                    staticDir: path.join(__dirname, 'dist'),
                    routes: ['/', '/products'],
                    renderer: new Renderer({})
                })
            ]
        }
    }
}

