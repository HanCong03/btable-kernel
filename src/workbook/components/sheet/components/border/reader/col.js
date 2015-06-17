/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var BORDER_LOCATION = require('../definition/location');
    var BorderUtils = require('../utils');

    return require('utils').createClass('Border', {
        base: require('sheet-component'),

        mixin: [
            require('../../common/style'),
            require('./common/border')
        ],

        getRangeBorder: function (location, startIndex, endIndex) {
            switch (location) {
                case BORDER_LOCATION.TOP:
                    return this.getRangeTopBorder(startIndex, endIndex);

                case BORDER_LOCATION.BOTTOM:
                    return this.getRangeBottomBorder(startIndex, endIndex);

                case BORDER_LOCATION.RIGHT:
                    return this.getRangeRightBorder(startIndex, endIndex);

                case BORDER_LOCATION.LEFT:
                    return this.getRangeLeftBorder(startIndex, endIndex);

                case BORDER_LOCATION.OUTER:
                    return this.getRangeOuterBorder(startIndex, endIndex);

                case BORDER_LOCATION.INNER:
                    return this.getRangeInnerBorder(startIndex, endIndex);
                    break;
            }

        },

        // 列级，上下为空
        getRangeTopBorder: function (startIndex, endIndex) {
            return null;
        },

        getRangeBottomBorder: function (startIndex, endIndex) {
            return null;
        },

        getRangeRightBorder: function (startIndex, endIndex) {
            return this.__checkVerticalBorder(endIndex, BORDER_LOCATION.RIGHT);
        },

        getRangeLeftBorder: function (startIndex, endIndex) {
            return this.__checkVerticalBorder(startIndex, BORDER_LOCATION.LEFT);
        },

        getRangeOuterBorder: function (startIndex, endIndex) {
            return {
                top: this.getRangeTopBorder(startIndex, endIndex),
                left: this.getRangeLeftBorder(startIndex, endIndex),
                bottom: this.getRangeBottomBorder(startIndex, endIndex),
                right: this.getRangeRightBorder(startIndex, endIndex)
            };
        },

        getRangeInnerBorder: function () {},

        __checkVerticalBorder: function (col, location) {
            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;

            var target = this.__getColumnLocationBorder(location, col);
            var isSame = true;

            if (!target) {
                return null;
            }

            $$.forEach(rowsData, function (currentRow, row) {
                var borderValue;

                // 独立单元格样式检查
                if ($$.isDefined(currentRow.cells) && $$.isDefined(currentRow.cells[col])) {
                    borderValue = this.__getCellLocationBorder(location, row, col);

                    if (!borderValue) {
                        isSame = false;
                        return false;
                    }

                    if (!BorderUtils.isSameBorderValue(target, borderValue)) {
                        isSame = false;
                        return false;
                    }

                    // 行样式检查
                } else if ($$.isDefined(currentRow.customFormat)) {
                    borderValue = this.__getBorderDetails(location, currentRow.si);

                    if (!BorderUtils.isSameBorderValue(target, borderValue)) {
                        isSame = false;
                        return false;
                    }
                }
            }, this);

            if (!isSame) {
                return null;
            }

            return target;
        },

        __getCellLocationBorder: function (location, row, col) {
            if (location === BORDER_LOCATION.LEFT) {
                return this.getCellLeftBorder(row, col);
            } else if (location === BORDER_LOCATION.RIGHT) {
                return this.getCellRightBorder(row, col);
            }
        },

        __getColumnLocationBorder: function (location, col) {
            if (location === BORDER_LOCATION.LEFT) {
                return this.getColumnLeftBorder(col);
            } else if (location === BORDER_LOCATION.RIGHT) {
                return this.getColumnRightBorder(col);
            }
        }
    });
});