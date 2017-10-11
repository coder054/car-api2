module.exports = {
  entry: ["./public/app.js"],
  output: {
    path: __dirname,
    publicPath: "/",
    filename: "./public/bundle.js"
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: "babel-loader",
        query:{
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};