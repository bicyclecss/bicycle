const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env => {
    const min = env.CSS === 'min';

    return {
        entry: './scss/bicycle.scss',
        output: {
            path: __dirname + '/css/',
            publicPath: '/css/',
            filename: 'bicycle' + (min ? '.min' : '') + '.css'
        },
        mode: 'none',
        plugins: [
            new ExtractTextPlugin({
                filename: 'bicycle' + (min ? '.min' : '') + '.css'
            })
        ],
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        use: [{
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2,
                                minimize: min
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        require('autoprefixer')
                                    ]
                                }
                            }
                        }, {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                data: '@import "scss/common/variables"; @import "scss/common/mixins";',
                                includePaths: [
                                    path.resolve(__dirname, './scss')
                                ]
                            }
                        }]
                    })
                }
            ]
        }
    }
};