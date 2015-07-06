/**
 * @file 样式过滤器
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = {
        __filterClassifyStyle: function (styles) {
            var map = this.__defaultStyleMap;
            var result = {};
            var isEmpty = true;

            for (var key in styles) {
                if (!styles.hasOwnProperty(key)) {
                    continue;
                }

                if (map[key] !== JSON.stringify(styles[key])) {
                    isEmpty = false;
                    result[key] = styles[key];
                }
            }

            if (typeof result.color === 'object') {
                result.color = result.color.value;
            }

            if (typeof result.name === 'object') {
                result.name = result.name.value;
            }

            return result;
        },

        __filterStyle: function (styleName, styleValue) {
            if ($$.isNdef(styleValue)) {
                return null;
            }

            var map = this.__defaultStyleMap;

            if (map[styleName] === JSON.stringify(styleValue)) {
                return null;
            }

            if ((styleName === 'color' || styleName === 'name') && typeof styleValue === 'object') {
                return styleValue.value;
            }

            return styleValue;
        }
    };
});