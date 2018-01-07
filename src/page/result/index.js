/**
 * Created by BJ
 * DateTime: 2018/1/7 22:08
 */
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mt = require('util/mt.js');

$(function () {
    var type = _mt.getUrlParam('type') || 'default',
        $element = $('.'+type+'-success');
    //显示对应的提示元素
    $element.show();
});