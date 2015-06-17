/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    var BORDER_LOCATION = require('../definition/location');
    var BorderUtils = require('../utils');
    var NONE = require('NONE');

    return require('utils').createClass('Border', {
        base: require('sheet-component'),

        mixin: [
            require('../../common/style'),
            require('./common/border')
        ],

        getRangeBorder: function (location, start, end) {
            switch (location) {
                case BORDER_LOCATION.TOP:
                    return this.getRangeTopBorder(start, end);

                case BORDER_LOCATION.BOTTOM:
                    return this.getRangeBottomBorder(start, end);

                case BORDER_LOCATION.RIGHT:
                    return this.getRangeRightBorder(start, end);

                case BORDER_LOCATION.LEFT:
                    return this.getRangeLeftBorder(start, end);

                case BORDER_LOCATION.OUTER:
                    return this.getRangeOuterBorder(start, end);

                case BORDER_LOCATION.INNER:
                    return this.getRangeInnerBorder(start, end);
                    break;
            }
        },

        // 全选情况下，外边框为null
        getRangeTopBorder: function (start, end) {
            return this.__checkTopBorder(start, end);
        },

        getRangeBottomBorder: function (start, end) {
            return this.__checkBottomBorder(start, end);
        },

        getRangeRightBorder: function (start, end) {
            return this.__checkRightBorder(start, end);
        },

        getRangeLeftBorder: function (start, end) {
            return this.__checkLeftBorder(start, end);
        },

        getRangeOuterBorder: function (start, end) {
            return {
                top: this.getRangeTopBorder(start, end),
                left: this.getRangeLeftBorder(start, end),
                bottom: this.getRangeBottomBorder(start, end),
                right: this.getRangeRightBorder(start, end)
            };
        },

        getRangeInnerBorder: function (start, end) {
        },

        __checkTopBorder: function (start, end) {
            var row = start.row;
            var target = this.getCellTopBorder(row, start.col);
            var borderValue;

            for (var i = start.col + 1, limit = end.col; i <= limit; i++) {
                borderValue = this.getCellTopBorder(row, i);

                if (!borderValue) {
                    return null;
                }

                if (!BorderUtils.isSameBorderValue(target, borderValue)) {
                    return null;
                }
            }

            if (BorderUtils.isSameBorderValue(target, NONE)) {
                return null;
            }

            return target;
        },

        __checkBottomBorder: function (start, end) {
            var row = end.row;
            var target = this.getCellTopBorder(row, start.col);
            var borderValue;

            for (var i = start.col + 1, limit = end.col; i <= limit; i++) {
                borderValue = this.getCellBottomBorder(row, i);

                if (!borderValue) {
                    return null;
                }

                if (!BorderUtils.isSameBorderValue(target, borderValue)) {
                    return null;
                }
            }

            if (BorderUtils.isSameBorderValue(target, NONE)) {
                return null;
            }

            return target;
        },

        __checkLeftBorder: function (start, end) {
            var col = start.col;
            var target = this.getCellLeftBorder(start.row, col);
            var borderValue;

            for (var i = start.row + 1, limit = end.row; i <= limit; i++) {
                borderValue = this.getCellLeftBorder(i, col);

                if (!borderValue) {
                    return null;
                }

                if (!BorderUtils.isSameBorderValue(target, borderValue)) {
                    return null;
                }
            }

            if (BorderUtils.isSameBorderValue(target, NONE)) {
                return null;
            }

            return target;
        },

        __checkRightBorder: function (start, end) {
            var col = end.col;
            var target = this.getCellRightBorder(start.row, col);
            var borderValue;

            for (var i = start.row + 1, limit = end.row; i <= limit; i++) {
                borderValue = this.getCellRightBorder(i, col);

                if (!borderValue) {
                    return null;
                }

                if (!BorderUtils.isSameBorderValue(target, borderValue)) {
                    return null;
                }
            }

            if (BorderUtils.isSameBorderValue(target, NONE)) {
                return null;
            }

            return target;
        }
    });
});