const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv').config();

const packageVersion = require('./package.json').version;
let mode = 'development';

let publicPath = `/`;

module.exports = [{
    mode: mode,
    devServer: {
        historyApiFallback: true,
    },
    context: path.join(__dirname),
    entry: {
        'index': [
            './src/index.js',
        ],
        style: [
            './scss/index.scss',
        ]
    },
    output: {
        path: path.join(__dirname, 'dist', packageVersion),
        publicPath: '/',
        filename: '[name].js',
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: 'template/template.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'style[name].css',
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(dotenv.parsed)
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }, {
                test: /\.(graphql|gql)$/,
                exclude: /(node_modules|bower_compontents)/,
                use: {
                    loader: 'graphql-tag/loader',
                }
            }, {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: {
                                safe: true
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            autoprefixer: {
                                browsers: ['last 2 versions']
                            },
                            plugins: () => [
                                require('autoprefixer')
                            ]
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            sourceMapContents: false
                        }
                    }
                ]
            }, {
                test: /\.(jpe?g|png|gif|mp3|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            publicPath: publicPath,
                            emitFile: true
                        }
                    }
                ]
            }
        ]
    },
}];
