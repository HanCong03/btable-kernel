/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var BORDER_ORDER = require('./definition/border-order');

    return {
        /**
         * 标准化边框值
         * 这里的边框值是指单条边框的值。
         */
        standardizingBorderValue: function (borderValue) {
            if ($$.isNdef(borderValue)) {
                return null;
            }

            if ($$.isNdef(borderValue.style) || $$.isNdef(borderValue.color)) {
                return null;
            }

            return $.extend({}, $$.clone(BORDER_ORDER), borderValue);
        },

        isSameBorderValue: function (borderValue1, borderValue2) {
            if (borderValue1 === borderValue2) {
                return true;
            }

            return borderValue1.style === borderValue2.style && borderValue1.color === borderValue2.color;
        }
    };

});