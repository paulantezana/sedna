const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const fs = require('fs');
require("babel-polyfill");

const getFilesInFolder = (base = '.', scanSubDirectories = false, regularExpression = /\.js$/) => {
    const files = [];
    const rootPath = path.resolve(__dirname, base);

    function readDirectory(directory) {
        fs.readdirSync(directory).forEach((file) => {
            const fullPath = path.resolve(directory, file);

            if (fs.statSync(fullPath).isDirectory()) {
                if (scanSubDirectories) readDirectory(fullPath);
                return;
            }

            if (!regularExpression.test(fullPath)) return;

            const fileName = fullPath.replace(rootPath, '').replace(/\\/g, '/').trim().replace(/^[\/]+|[\/]+$/g, '');
            const absPath = '.' + fullPath.replace(path.resolve(__dirname, '.'), '').replace(/\\/g, '/').trim();
            files.push({ fileName, path: absPath });
        });
    }

    readDirectory(rootPath);

    return files;
};

let pugPages = getFilesInFolder('./src/pug/pages', true, /\.(pug)$/);
pugPages = pugPages.map(item => {
    return new HtmlWebpackPlugin({
        filename: item.fileName.replace('.pug', '.html'),
        minify: {
            collapseWhitespace: false
        },
        hash: true,
        template: item.path,
    })
});

module.exports = {
    entry: {
        sedna: './src/sedna.js',
        app: ['babel-polyfill','./src/app.js'],
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: 'assets/script/[name].js'
    },
    devServer: {
        contentBase: path.join(__dirname, "build"),
        compress: true,
        port: 3000,
        open: true,
        stats: 'errors-only',
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            // url: false,
                            // minimize: true,
                            sourceMap: true,
                            // modules: true,
                            // localIdentName: '[local]__[hash:base64:5]',
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ],
            },
            {
                test: /\.pug$/,
                use: ['html-loader', 'pug-html-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "assets/css/[name].css",
            chunkFilename: "[id].css"
        }),
        ...pugPages,
    ]
};
