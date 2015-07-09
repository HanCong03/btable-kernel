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
            var StyleModule = this.getModule('Style');
            // 一般性的样式，该样式是
            var generalityStyle = this.getModule('StyleCache').getRenderStyle(rows, cols);

            return {
                styles: generalityStyle,
                borders: StyleModule.getRawStyle('borders', rows, cols),
                fills: StyleModule.getRawStyle('fills', rows, cols)
            }
        }
    });
});