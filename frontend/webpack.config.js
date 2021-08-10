const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry:'./src/index.js',
  output:{
    path: path.join(__dirname, '/blog/static'),
    filename: 'main.js'
  },
  devServer: {
    contentBase: './blog',
    open: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      { 
        test: /\.css$/, 
        use: [{loader: 'style-loader'}, {loader:'css-loader'}] ,
      },
      { 
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:'public/index.html',
     
    }),

    new CleanWebpackPlugin(
        {
            cleanOnceBeforeBuildPatterns: [
                '!.git/**',
               
            ],
        
           
            cleanAfterEveryBuildPatterns: [ '!.git/**'],
        }
    ),
  ],
};