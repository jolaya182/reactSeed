const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
 
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
          test: /\.(jpg|png|svg)$/,
          use: {
            loader: "file-loader",
          },
        },
      {
        test: /\.ejs$/,
        loader: 'ejs-html-loader',
      },
      {
        test:/\.ejs$/,
        exclude:/node_modules/,
        use:
          {
            loader: 'ejs-loader'
          }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", {
          loader: "postcss-loader",
          options: {
            plugins: () => { [require("autoprefixer")] }
          }
        }]
      },
      {
        test: /\.scss/,
        use: ["style-loader", "css-loader", {
          loader: "postcss-loader",
          options: {
            plugins: () => [require("autoprefixer")],
          },
        }, "sass-loader"],
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
     
    })
  ]
};
