/**
 * @file 提供获取渲染数据的特殊组件。
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');

    return $$.createClass('RenderInfo', {
        base: require('sheet-component'),

        init: function () {
            this.registerAPI({
                getRenderInfo: this.getRenderInfo
            });
        },

        getRenderInfo: function (rows, cols) {
            return this.getModule('StyleCache').getRenderStyle(rows, cols);
        }
    });
});