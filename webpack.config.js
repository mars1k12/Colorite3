const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const fs = require('fs');
const path = require('path');


const htmlFileNames = fs.readdirSync('./src/html/');
const cssFileNames = fs.readdirSync('./src/css/');

const getHtmlFiles = () => {
    const entries = [];
    htmlFileNames.forEach(filename => entries.push(`./src/html/${filename}`));
    return entries;
}

const getCssFiles = () => {
    const entries = [];
    cssFileNames.forEach(filename => entries.push(`./src/css/${filename}`));
    return entries;
}

const htmlPlugins = () => {
    const plugins = [];
    htmlFileNames.forEach(filename => {
        const splitted = filename.split('.');
        if (splitted[1] === 'html') {
            plugins.push(
                new HtmlWebpackPlugin({
                    template: `./src/html/${filename}`,
                    filename: `./${filename}`
                }),
            );
        }
    })
    return plugins;
}

module.exports = {
    entry: [
        './src/js/main.js',
        ...getHtmlFiles(),
        ...getCssFiles()
    ],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            { test: /\.(js)$/, exclude: /node_modules/, use: ["babel-loader"] },
            {
                test: /\.(html)$/,
                use: ["html-loader"]
            },
            {
                test: /\.(css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: "postcss-loader",
                            options: {
                                ident: 'postcss',
                                plugins: () => [
                                    require('autoprefixer')({
                                        overrideBrowserslist: ['ie >= 8', 'last 4 version']
                                    }),
                                    require('postcss-import')()
                                ]
                            }
                        },
                    ]
                })
            },
            {
                test: /\.(png|svg|jpg|gif|ttf|woff|woff2)$/,
                use: [
                    'file-loader',
                ]
            }
        ]
    },
    plugins: [
        ...htmlPlugins(),
        new ExtractTextPlugin('./src/css/style.css')
    ],
    mode: "development",
    resolve: {
        extensions: ['.js', '.jpg', '.html', '.css'],
    }
};
