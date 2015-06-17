/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var BORDER_LOCATION = require('../definition/location');
    var BorderUtils = require('../utils');
    var NONE = require('NONE');

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

        getRangeTopBorder: function (startIndex, endIndex) {
            return this.__checkHorizontalBorder(startIndex, BORDER_LOCATION.TOP);
        },

        getRangeBottomBorder: function (startIndex, endIndex) {
            return this.__checkHorizontalBorder(endIndex, BORDER_LOCATION.BOTTOM);
        },

        // 行级，左右边框为空
        getRangeRightBorder: function (startIndex, endIndex) {
            return null;
        },

        // 行级，左右边框为空
        getRangeLeftBorder: function (startIndex, endIndex) {
            return null;
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

        /**
         * 检查指定行的所有单元格在指定位置上的border是否一致
         * @param row
         * @param location
         * @returns {null}
         * @private
         */
        __checkHorizontalBorder: function (row, location) {
            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;
            var colsData = styleData.cols;

            var currentRow = rowsData[row];
            var isSame = true;
            var borderValue;
            var target;

            if ($$.isDefined(currentRow)) {
                if ($$.isDefined(currentRow.cells)) {
                    $$.forEach(currentRow.cells, function (currentCell, col) {
                        borderValue = this.__getCellLocationBorder(location, row, col);

                        if (!borderValue) {
                            isSame = false;
                            return false;
                        }

                        if (!target) {
                            target = borderValue;
                        } else {
                            if (!BorderUtils.isSameBorderValue(target, borderValue)) {
                                isSame = false;
                                return false;
                            }
                        }
                    }, this);

                    if (!isSame) {
                        return null;
                    }
                }

                /* ----- 检查行级样式 ----- */
                if ($$.isDefined(currentRow.customFormat)) {
                    borderValue = this.__getRowLocationBorder(location, row);

                    if (!borderValue) {
                        return null;
                    }

                    if (!target || BorderUtils.isSameBorderValue(target, borderValue)) {
                        return borderValue;

                        // 行级检查失败
                    } else {
                        return null;
                    }
                }
            }

            /* ---- 检查列级样式 ---- */
            $$.forEach(colsData, function (currentCol, col) {
                if ($$.isNdef(currentCol.customFormat)) {
                    return;
                }

                borderValue = this.__getColumnLocationBorder(location, col);

                if (!borderValue) {
                    isSame = false;
                    return false;
                }

                if (!target) {
                    target = borderValue;
                } else if (!BorderUtils.isSameBorderValue(target, borderValue)) {
                    isSame = false;
                    return false;
                }
            }, this);

            // 列级检查失败
            if (!isSame) {
                return null;
            }

            /* ----- 全局border检查 ---- */
            if ($$.isDefined(styleData.globalStyle)) {
                borderValue = this.__getBorderValue(location, styleData.globalStyle);

                if (!target || BorderUtils.isSameBorderValue(target, borderValue)) {

                    // 由于默认值可以视为null， 所以返回null
                    if (BorderUtils.isSameBorderValue(borderValue, NONE)) {
                        return null;
                    }

                    return borderValue;

                    // 行级检查失败
                } else {
                    return null;
                }
            }

            if (target) {
                return null;
            }

            // 最终返回默认值，由于默认值可以视为null， 所以返回null
            //return $$.clone(NONE);
            return null;
        },

        __getCellLocationBorder: function (location, row, col) {
            if (location === BORDER_LOCATION.TOP) {
                return this.getCellTopBorder(row, col);
            } else if (location === BORDER_LOCATION.BOTTOM) {
                return this.getCellBottomBorder(row, col);
            }
        },

        __getRowLocationBorder: function (location, row) {
            if (location === BORDER_LOCATION.TOP) {
                return this.getRowTopBorder(row);
            } else if (location === BORDER_LOCATION.BOTTOM) {
                return this.getRowBottomBorder(row);
            }
        },

        __getColumnLocationBorder: function (location, col) {
            if (location === BORDER_LOCATION.TOP) {
                return this.getColumnTopBorder(col);
            } else if (location === BORDER_LOCATION.BOTTOM) {
                return this.getColumnBottomBorder(col);
            }
        }
    });
});