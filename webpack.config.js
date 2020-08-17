const HtmlWebpackPlugin = require("html-webpack-plugin");

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
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            url: false
                        }
                    }
                ]
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
        ...htmlPlugins()
    ],
    mode: "development"
};
