const path = require('path');

module.exports = {
  devtool: "source-map",
  entry: "./dist/gcp/index.js",
  externals: './config.json',
  mode: 'production',
  output: {
    filename: 'index.js',
    libraryTarget: "commonjs2",
    path: path.resolve(__dirname, '.webpack'),
  },
  target: 'node'
};
