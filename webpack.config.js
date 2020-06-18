const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  resolve: {
    extensions: [".js", ".css"],
    modules: ["node_modules"]
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: "/node_modules/",
        use: "babel-loader"
      },
      {
        test: /\.css?$/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
      filename: "index.html"
    })
  ]
};
