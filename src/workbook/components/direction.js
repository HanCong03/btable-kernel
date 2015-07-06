/**
 * @file 提供文本方向的维护服务
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');

    return $$.createClass('Direction', {
        base: require('../interface/i-workbook-component'),

        init: function () {
            this.__initAPI();
            this.__initService();
        },

        __initAPI: function () {
            this.registerAPI({
                getDirection: this.getDirection
            });
        },

        __initService: function () {
            this.registerService({
                'get.direction': this.getDirection
            });
        },

        getDirection: function () {
            return this.getWorkbook().dir;
        }
    });
});