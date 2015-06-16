/**
 * @file 非受限擦除
 * @author hancong03@baiud.com
 */

define(function (require) {
    var BORDER_LOCATION = require('../../definition/location');

    return {
        addBorder: function (location, borderValue, startIndex, endIndex) {
            switch (location) {
                case BORDER_LOCATION.TOP:
                    this.__addTopBorder(borderValue, startIndex, endIndex);
                    break;

                case BORDER_LOCATION.BOTTOM:
                    this.__addBottomBorder(borderValue, startIndex, endIndex);
                    break;

                case BORDER_LOCATION.RIGHT:
                    this.__addRightBorder(borderValue, startIndex, endIndex);
                    break;

                case BORDER_LOCATION.LEFT:
                    this.__addLeftBorder(borderValue, startIndex, endIndex);
                    break;

                case BORDER_LOCATION.OUTER:
                    this.__addOuterBorder(borderValue, startIndex, endIndex);
                    break;

                case BORDER_LOCATION.INNER:
                    this.__addInnerBorder(borderValue, startIndex, endIndex);
                    break;
            }
        },

        // 列级设置，忽略对水平边框的处理
        __addTopBorder: function (borderValue, startIndex, endIndex) {
            /**********************/
            /*     do nothing     */
            /**********************/
        },

        __addBottomBorder: function (borderValue, startIndex, endIndex) {
            /**********************/
            /*     do nothing     */
            /**********************/
        },

        __addRightBorder: function (borderValue, startIndex, endIndex) {
            this.restrictAddBorder(BORDER_LOCATION.RIGHT, borderValue, endIndex, endIndex);
            this.restrictRemoveBorder(BORDER_LOCATION.LEFT, endIndex + 1, endIndex + 1);
        },

        __addLeftBorder: function (borderValue, startIndex, endIndex) {
            this.restrictAddBorder(BORDER_LOCATION.LEFT, borderValue, startIndex, startIndex);
            this.restrictRemoveBorder(BORDER_LOCATION.RIGHT, startIndex - 1, startIndex - 1);
        },

        // 映射为对四条边的设置
        __addOuterBorder: function (borderValue, startIndex, endIndex) {
            this.__addTopBorder(borderValue, startIndex, endIndex);
            this.__addBottomBorder(borderValue, startIndex, endIndex);
            this.__addLeftBorder(borderValue, startIndex, endIndex);
            this.__addRightBorder(borderValue, startIndex, endIndex);
        },

        __addInnerBorder: function (borderValue, startIndex, endIndex) {
            var hasCenterArea = endIndex - 1 >= startIndex + 1;

            /* ---- 设置外层区域相关边框 start ---- */
            /*
             * 条件1：中央区域不存在
             * 条件2：当前区域不是单列
             */
            if (!hasCenterArea && startIndex !== endIndex) {
                // 重设起始列的右边框
                this.restrictAddBorder(BORDER_LOCATION.RIGHT, borderValue, startIndex, startIndex);

                // 重设结束列的左边框
                this.restrictAddBorder(BORDER_LOCATION.LEFT, borderValue, endIndex, endIndex);
            }

            // 新增起始列包含的所有的水平边框
            this.__addHorizontalBorder(startIndex, borderValue);

            // 起始列和结束列不是同一列，则重设结束列包含的所有的水平边框
            if (startIndex !== endIndex) {
                this.__addHorizontalBorder(endIndex, borderValue);
            }
            /* ---- 设置外层区域相关边框 end ---- */

            /* ---- 为中间区域的所有单元格设置边框 start ---- */
            if (hasCenterArea) {
                this.rs('set.border', borderValue, {
                    row: 0,
                    col: startIndex + 1
                }, {
                    row: this.getConfig('MAX_ROW') - 1,
                    col: endIndex - 1
                });
            }
            /* ---- 为中间区域的所有单元格设置边框 end ---- */
        },

        /**
         * 重设指定列的水平边框，包括列本身的水平边框和内部各单元格的水平边框 ---- 上边框和下边框
         * @param col
         * @private
         */
        __addHorizontalBorder: function (col, borderValue) {
            // 重设独立单元格上的水平边框
            this.__restrictAddCellBorder(BORDER_LOCATION.TOP, borderValue, col);
            this.__restrictAddCellBorder(BORDER_LOCATION.BOTTOM, borderValue, col);

            // 重设交叉列上的单元格的水平边框
            this.__overflowAddRow(BORDER_LOCATION.TOP, borderValue, col);
            this.__overflowAddRow(BORDER_LOCATION.BOTTOM, borderValue, col);

            // 重设行自身的水平边框
            this.__restrictAddColumnBorder(BORDER_LOCATION.TOP, borderValue, col);
            this.__restrictAddColumnBorder(BORDER_LOCATION.BOTTOM, borderValue, col);
        }
    };
});