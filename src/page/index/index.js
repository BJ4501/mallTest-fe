/**
 * Created by BJ
 * Date: 2018/1/6
 * Time: 14:50
 */
'use strict';

var _mt = require('util/mt.js');

var html = '<div>{{data}}</div>';
var data = {
    data: 'dfsfsdf'
};

console.log(_mt.renderHtml(html,data));
