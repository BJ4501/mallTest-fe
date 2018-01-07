/**
 * Created by BJ
 * DateTime: 2018/1/7 15:35
 */
'use strict';
require('./index.css');
var _mt = require('util/mt.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
//����
var nav = {
    //��ʼ��
    init: function () {
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    //�󶨳����¼�
    bindEvent: function () {
        //��¼����¼�
        $('.js-login').click(function () {
            _mt.doLogin();
        });
        //ע�����¼�
        $('.js-register').click(function () {
            window.location.href = './register.html';
        });
        //�˳�����¼�
        $('.js-logout').click(function () {
            _user.logout(function (res) {
                window.location.reload();
            },function (errMsg) {
                _mt.errorTips(errMsg);
            });
        });
    },
    //�����û���Ϣ
    loadUserInfo: function () {
        _user.checkLogin(function (res) {
            $('.user.not-login').hide().sibling('.user.login').show()
                .find('username').text(res.username);
        },function (errMsg) {
            //do nothing
        });
    },
    //���ع��ﳵ����
    loadCartCount: function () {
        _cart.getCartCount(function (res) {
            $('.nav .cart-cont').text(res || 0);
        },function (errMsg) {
            $('.nav .cart-cont').text(0);
        });
    }
};
module.exports = nav.init();