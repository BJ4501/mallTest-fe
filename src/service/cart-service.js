/**
 * Created by BJ
 * DateTime: 2018/1/7 16:04
 */
'use strict';

var _mt = require('util/mt.js');

var _cart = {
    //��ȡ���ﳵ����
    getCartCount: function (resolve, reject) {
        _mt.request({
            url: _mt.getServerUrl('/cart/get_cart_product_count.do'),
            success: resolve,
            error: reject
        });
    }
};

module.exports = _cart;