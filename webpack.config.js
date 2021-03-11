const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        background: [
            'babel-polyfill',
            './src/background.js'
        ], content_script: './src/content_script.js',
    }, output: {
        filename: '[name].bundle.js',
    }, plugins: [
        new CopyWebpackPlugin([
            {from: 'static', to: 'static'},
            {from: 'manifest.json', to: 'manifest.json'},
        ], {debug: true, context: '.'}),
    ],
};
