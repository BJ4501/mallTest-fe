/**
 * Created by BJ
 * DateTime: 2018/1/7 15:53
 */
'use strict';

var _mt = require('util/mt.js');

var _user = {
    //��¼���
    checkLogin: function (resolve, reject) {
        _mt.request({
            url: _mt.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //�ǳ�
    logout: function (resolve, reject) {
        _mt.request({
            url: _mt.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    }
};

module.exports = _user;