const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './client/index.tsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    },
    // mode: process.env.NODE_ENV,
    mode: process.env.NODE_ENV,
    // externalsPresets: { node: true },
    // externals: [nodeExternals()],
    devServer: {
        publicPath: '/build/',
        // hot: true,
        proxy: {
            '/api':'http://localhost:3000',
            '/ConfigureApplication':'http://localhost:3000',
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            "@babel/preset-typescript"
                        ]
                    }
                }
            },
            // re-enable to check ts
            // {
            //     test: /\.(ts|tsx)$/,
            //     loader: "awesome-typescript-loader",
            // },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                    "css-loader",
                    "sass-loader"
                ]
            },
        ]
    }
}

