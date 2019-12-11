const path = require("path");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/js/index.js",

    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        // publicPath: "/dist/",
    },

    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },

    module: {
        rules: [
            {
                rules: [
                    {
                        test: /\.(html)$/,
                        use: ["html-loader"],
                    },
                ],
            },
            {
                test: /\.js$/,

                use: ["babel-loader"],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: /(node_modules)/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[path][name].[ext]",
                    },
                },
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: /(node_modules)/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [autoprefixer],
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            removeComments: true,
        }),
    ],
    devServer: {
        // contentBase: "dist/",
        inline: true,
        compress: true,
        open: false,
        hot: true,
        port: 9000,
    },
};
