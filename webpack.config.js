// TypeScript: https://webpack.js.org/guides/typescript/


//import webpack from "webpack";

// in case you run into any TypeScript error when configuring `devServer`
//import "webpack-dev-server";



const config = {

  entry: "./src/index.js",

  //module: {
  //  rules: [

      //{
        //test: /(\.m?js)/,
        //exclude: /node_modules/,
        //use: {
          //loader: "babel-loader",
          //options: {
            //presets: [
                //'@babel/preset-react',
                //'@babel/preset-typescript'
            //],
            //allExtensions: true,
            //isTSX: true
          //}
        //}
      //},

      // TypeScript

      //{
      //  test: /\.tsx?$/,
      //  use: "ts-loader",
      //  exclude: /node_modules/,
      //},

    //]
  //},

  //externals: {
  //  "react": "React",
  //  "react-dom": "ReactDOM"
  //},

  //resolve: {
  //  extensions: [".tsx", ".ts", ".js"],
  //},

}


export default config;