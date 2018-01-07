/**
 * Created by BJ
 * DateTime: 2018/1/7 12:07
 */
'use strict';
var Hogan = require('hogan.js');
var conf = {
    serverHost: ''
};
var _mt = {
    //网络请求
    request: function (param) {
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function (res) {
                //请求成功
                if (0 === res.status){
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                //没有登录状态，需要强制登录
                else if (10 === res.status){
                    _this.doLogin();
                }
                //请求数据错误
                else if (1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error: function (err) {
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    //获取服务器地址
    getServerUrl: function (path) {
        return conf.serverHost +path;
    },
    //获取Url相关参数
    getUrlParam: function (name) {
        //正则匹配：原URL示例：mall.com/login?name=123&pwd=1
        //匹配规则：1.以name开头，或& 开始匹配 2.关键词
        //3.参数字符串：'^&'标识如果不是&就不结束一直匹配多个'*' 4.以&，或末尾$ 匹配结束
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        //substr(1): 将'?'去掉
        var result = window.location.search.substr(1).match(reg);
        //result[2]: 取出匹配的第二个字符串，则为需要取出的值
        return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染Html模板
    renderHtml: function (htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
        return result;
    },
    //成功提示
    successTips: function (msg) {
        alert(msg||'操作成功');
    },
    //错误提示
    errorTips: function (msg) {
        alert(msg||'操作出现错误');
    },
    //字段的验证，支持非空，手机，邮箱的判断
    validate: function (value, type) {
        var value = $.trim(value);
        //非空验证
        if ('require' === type){
            return !!value; //将value强转为bool类型
        }
        //手机号验证
        if ('phone' === type){
            //1开头后面10位数字，就认为这是一个手机号码
            return /^1\d{10}$/.test(value);
        }
        //邮箱格式验证
        if ('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    //统一登录处理
    doLogin: function () {
        window.location.href = './login.html?redirect='+ encodeURIComponent(window.location.href);
    },
    //
    goHome: function () {
        window.location.href = './index.html';
    }
};

module.exports = _mt;