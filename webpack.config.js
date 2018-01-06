/**
 * Created by BJ
 * Date: 2018/1/6
 * Time: 14:50
 */
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
//������������,dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

//��ȡhtml-webpack-plugin�����ķ���
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
        //���λ�ü���Ϣ
        path: './dist', //�������ɵ��ļ���Ŀ¼
        publicPath: '/dist',
        filename: 'js/[name].js'
    },
    externals:{
        //�������
        'jquery' : 'window.jQuery'
    },
    module: {
        loaders: [
            //ʹ�ã� ��������loader����������
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            //url-loader ����ͼƬ ��Ҫfile-loader model
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=../resource/[name].[ext]' }
        ]
    },
    plugins:[
        //����ȫ��ģ��--����ͨ��ģ�鵽js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        //��css����������ļ���
        new ExtractTextPlugin("css/[name].css"),
        //HTMLģ��Ĵ���
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))
    ]
};

if ('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;