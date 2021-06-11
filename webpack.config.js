const HtmlWebpackPlugin = require("html-webpack-plugin");
const target = process.env.NODE_ENV === "production" ? "browserslist" : "web";
const path = require("path");
module.exports = {
devServer: { // devserver modifed to remember browserHistory for react router 
    historyApiFallback: true, // allows the browser history to be stored in order for react router to access pages 
    contentBase: './',
    hot: true
},
node: {
    fs:"empty",
    child_process: 'empty',
},
externals:{
    fsevents: "require('fsevents')"
},
performance:{
    hints: false,
    maxAssetSize: 100000,
},
entry: "./src/index.js",
output: {
filename: "bundle.[hash].js",
path: path.resolve(__dirname, "dist"),
},
// optional local host 3000 sever code in for slow live reload 
// devServer:{
//     contentBase: path.join(__dirname, 'dist'),
//     port: 3000,
//     open:true,
// },
plugins: [
new HtmlWebpackPlugin({
template: "./src/index.html",
}),
],
resolve: {
modules: [__dirname, "orc", "node_modules"],
extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
},
target:'web',
module: {
rules: [
{
test: /\.jsx?$/,
exclude: /node_modules/,
loader: require.resolve("babel-loader"),
},
{
test: /\.css$/,
use: ["style-loader", "css-loader"],
},
{
test: /\.png|svg|jpg|gif$/,
use: ["file-loader"],
},
],
},
};
