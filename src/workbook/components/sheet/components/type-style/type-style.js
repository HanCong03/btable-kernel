/**
 * @file 样式组件，维护工作表内的样式
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var TEXT_ALIGN = require('./definition/text-align');

    return $$.createClass('TypeStyle', {
        base: require('sheet-component'),

        init: function () {
            this.__initAPI();
            this.__initService();
        },

        __initAPI: function () {
            this.registerAPI({
                getHorizontalForType: this.getHorizontalForType
            });
        },

        __initService: function () {
            //this.registerService({
            //    'get.hoizontal.for.type': this.getHorizontalForType
            //});

            this.registerService([
                'getHorizontalForType'
            ]);
        },

        /**
         * 获取指定单元格的类型style
         * @param styleName
         * @param row
         * @param col
         */
        getHorizontalForType: function (row, col) {
            var type = this.getModule('Content').getContentType(row, col);

            if ($$.isNdef(type)) {
                return type;
            }

            var dir = this.getModule('Direction').getDirection();

            return TEXT_ALIGN[dir][type];
        }
    });
});