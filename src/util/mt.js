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
    //��������
    request: function (param) {
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function (res) {
                //����ɹ�
                if (0 === res.status){
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                //û�е�¼״̬����Ҫǿ�Ƶ�¼
                else if (10 === res.status){
                    _this.doLogin();
                }
                //�������ݴ���
                else if (1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error: function (err) {
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    //��ȡ��������ַ
    getServerUrl: function (path) {
        return conf.serverHost +path;
    },
    //��ȡUrl��ز���
    getUrlParam: function (name) {
        //����ƥ�䣺ԭURLʾ����mall.com/login?name=123&pwd=1
        //ƥ�����1.��name��ͷ����& ��ʼƥ�� 2.�ؼ���
        //3.�����ַ�����'^&'��ʶ�������&�Ͳ�����һֱƥ����'*' 4.��&����ĩβ$ ƥ�����
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        //substr(1): ��'?'ȥ��
        var result = window.location.search.substr(1).match(reg);
        //result[2]: ȡ��ƥ��ĵڶ����ַ�������Ϊ��Ҫȡ����ֵ
        return result ? decodeURIComponent(result[2]) : null;
    },
    //��ȾHtmlģ��
    renderHtml: function (htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
        return result;
    },
    //�ɹ���ʾ
    successTips: function (msg) {
        alert(msg||'�����ɹ�');
    },
    //������ʾ
    errorTips: function (msg) {
        alert(msg||'�������ִ���');
    },
    //�ֶε���֤��֧�ַǿգ��ֻ���������ж�
    validate: function (value, type) {
        var value = $.trim(value);
        //�ǿ���֤
        if ('require' === type){
            return !!value; //��valueǿתΪbool����
        }
        //�ֻ�����֤
        if ('phone' === type){
            //1��ͷ����10λ���֣�����Ϊ����һ���ֻ�����
            return /^1\d{10}$/.test(value);
        }
        //�����ʽ��֤
        if ('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    //ͳһ��¼����
    doLogin: function () {
        window.location.href = './login.html?redirect='+ encodeURIComponent(window.location.href);
    },
    //
    goHome: function () {
        window.location.href = './index.html';
    }
};

module.exports = _mt;