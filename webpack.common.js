const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV === 'development';
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
    entry: {
        main: './src/index.js',
        print: './src/print.js'
    },
    output: {
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
        {
            test: /\.(c|sa|sc)ss$/,
            use:[
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: process.env.NODE_ENV === 'development',
                        reloadAll: true,
                    },
                }, 'css-loader','sass-loader',
            ],
            
        },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management'
        }),
        new CleanWebpackPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
        new webpack.ProvidePlugin({
            _:'lodash'
        }),
    ],
    optimization: {
        runtimeChunk: 'single',
        minimize: true,
        minimizer: [new TerserWebpackPlugin({
            test: /\.js(\?.*)?$/i,
            extractComments: true,
        }), new OptimizeCssAssetsWebpackPlugin({})],
        splitChunks: {
           cacheGroups: {
               vendor: {
                   test: /[\\/]node_modules[\\/]/,
                   name: 'vendors',
                   chunks:  'all'
               }
           }
        }
    }

}