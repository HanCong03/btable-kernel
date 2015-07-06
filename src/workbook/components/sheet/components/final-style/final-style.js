/**
 * @file 样式组件，维护工作表内的样式
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var NONE = require('NONE');

    return $$.createClass('FinalStyle', {
        base: require('sheet-component'),

        mixin: [
            require('../common/style')
        ],

        init: function () {
            this.__initAPI();
        },

        __initAPI: function () {
            this.registerAPI({
                getFinalStyle: this.getFinalStyle,
                getFinalClassifyStyle: this.getFinalClassifyStyle
            });
        },

        getFinalClassifyStyle: function (classify, row, col) {
            var sid = this.getCellSid(row, col);
            var userStyles = this.rs('get.effective.classify.style.detail', classify, sid);
            var defaultStyles = this.rs('get.default.classify', classify);

            userStyles = $$.clone(userStyles || {});

            if (classify === 'alignments') {
                if ($$.isNdef(userStyles.horizontal)) {
                    userStyles.horizontal = this.rs('get.hoizontal.for.type', row, col);
                }
            }

            userStyles = $.extend(userStyles, defaultStyles);

            for (var key in userStyles) {
                if (!userStyles.hasOwnProperty(key)) {
                    continue;
                }

                if (userStyles[key] === NONE) {
                    userStyles[key] = null;
                }
            }

            return userStyles;
        },

        /**
         * 获取指定单元格最终的style
         * @param styleName
         * @param row
         * @param col
         */
        getFinalStyle: function (styleName, row, col) {
            var sid = this.getCellSid(row, col);
            var userStyle = this.rs('get.effective.style.detail', styleName, sid);

            if ($$.isNdef(userStyle)) {
                if (styleName === 'horizontal') {
                    userStyle = this.rs('get.hoizontal.for.type', row, col);
                }

                if (!userStyle) {
                    userStyle = this.rs('get.default.style', styleName);
                }
            }

            if (userStyle === NONE) {
                return null;
            }

            return userStyle;
        }
    });
});