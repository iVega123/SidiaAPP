/* eslint-disable no-param-reassign */
const withImages = require('next-images');

module.exports = withImages({
  future: {
    webpack5: true,
  },
  webpack(config) {
    config.experiments = {};
    return config;
  },
  images: {
    disableStaticImages: true
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000',
      },
    ],
  },
});
