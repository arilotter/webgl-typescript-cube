const HtmlWebpackPlugin = require("html-webpack-plugin");
const { HotModuleReplacementPlugin } = require("webpack");

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "./build/bundle.js",
    path: __dirname
  },
  plugins: [new HtmlWebpackPlugin(), new HotModuleReplacementPlugin()],
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        enforce: "pre",
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ["source-map-loader", "babel-loader", "ts-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  devtool: "inline-source-map",
  devServer: {
    hot: true,
    inline: true,
    contentBase: "./build"
  }
};
