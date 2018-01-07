/**
 * Created by BJ
 * Date: 2018/1/6
 * Time: 14:50
 */
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
//环境变量配置,dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function (name) {
    return{
        template: './src/view/'+ name +'.html',
        filename: 'view/'+ name +'.html',
        inject: true,
        hash: true,
        chunks: ['common', name]
    };
};
//webpack-config
var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js']
    },
    output: {
        //输出位置及信息
        path: './dist', //最终生成的文件的目录
        publicPath: '/dist',
        filename: 'js/[name].js'
    },
    externals:{
        //引入组件
        'jquery' : 'window.jQuery'
    },
    module: {
        loaders: [
            //使用！ 连接两个loader，从右至左
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            //url-loader 加载图片 需要file-loader model
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=../resource/[name].[ext]' }
        ]
    },
    //配置一些其他的引用
    resolve: {
        alias: {
            node_modules: __dirname + '/node_modules',
            util: __dirname + '/src/util',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            image: __dirname + '/src/image'
        }
    },
    plugins:[
        //引入全局模块--独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        //把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        //HTML模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))
    ]
};

if ('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;