'use strict'

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8085', // 개발서버
                changeOrigin: true
            }
        }
    }
}
