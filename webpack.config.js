const path = require('path');
const glob = require('glob');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  node: path.join(__dirname, 'node_modules'),
};

module.exports = {
  entry: './src/index.tsx',

  output: {
    filename: 'main.js',
    path: PATHS.dist,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  module: {
    rules: [
      {
        rules: [
          {
            test: /\.html$/,
            use: 'html-loader',
            exclude: PATHS.node,
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: PATHS.node,
      },
      {
        test: /\.jpe?g|png|gif|svg$/,
        exclude: PATHS.node,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
      {
        test: /\.s?css/,
        exclude: PATHS.node,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer],
            },
          },
          {
            loader: 'sass-loader',
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
      filename: 'index.html',
      template: './src/index.html',
      removeComments: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      ignoreOrder: false,
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    }),
  ],

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ exclude: PATHS.node, extractComments: 'all' })],
  },

  devServer: {
    inline: true,
    compress: true,
    open: false,
    hot: true,
    port: 9000,
  },
};
