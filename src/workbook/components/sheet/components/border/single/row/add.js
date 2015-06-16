/**
 * @file
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

        __addTopBorder: function (borderValue, startIndex, endIndex) {
            this.restrictAddBorder(BORDER_LOCATION.TOP, borderValue, startIndex, endIndex);
            this.restrictRemoveBorder(BORDER_LOCATION.BOTTOM, startIndex - 1, startIndex - 1);
        },

        __addBottomBorder: function (borderValue, startIndex, endIndex) {
            this.restrictAddBorder(BORDER_LOCATION.BOTTOM, endIndex, endIndex);
            this.restrictRemoveBorder(BORDER_LOCATION.TOP, endIndex + 1, endIndex + 1);
        },

        // 行级操作，忽略对竖直边框的处理
        __addLeftBorder: function (borderValue, startIndex, endIndex) {
            /**********************/
            /*     do nothing     */
            /**********************/
        },

        // 行级操作，左右边框设置无效
        __addRightBorder: function (borderValue, startIndex, endIndex) {
            /**********************/
            /*     do nothing     */
            /**********************/
        },

        /**
         * outer操作映射为对四条边的操作
         * @param startIndex
         * @param endIndex
         * @private
         */
        __addOuterBorder: function (borderValue, startIndex, endIndex) {
            this.__addTopBorder(borderValue, startIndex, endIndex);
            this.__addBottomBorder(borderValue, startIndex, endIndex);
            this.__addLeftBorder(borderValue, startIndex, endIndex);
            this.__addRightBorder(borderValue, startIndex, endIndex);
        },

        /**
         * 在指定行级区域内部添加边框
         * @param borderValue
         * @param startIndex
         * @param endIndex
         * @private
         */
        __addInnerBorder: function (borderValue, startIndex, endIndex) {
            var hasCenterArea = endIndex - 1 >= startIndex + 1;

            /* ---- 设置外层区域相关边框 start ---- */
            /*
             * 条件1：不存在中央区域
             * 条件2：当前区域不是单行
             */
            if (!hasCenterArea && startIndex !== endIndex) {
                // 为起始行添加下边框
                this.restrictAddBorder(BORDER_LOCATION.BOTTOM, borderValue, startIndex, startIndex);
                // 为结束行添加上边框
                this.restrictAddBorder(BORDER_LOCATION.TOP, borderValue, endIndex, endIndex);
            }

            // 覆盖起始行包含的所有的竖直边框
            this.__addVerticalBorder(startIndex, borderValue);

            // 起始行和结束行不是同一行，则需要重设结束行的竖直边框
            if (startIndex !== endIndex) {
                // 新增结束行包含的所有的竖直边框
                this.__addVerticalBorder(endIndex, borderValue);
            }
            /* ---- 设置外层区域相关边框 end ---- */

            /* ---- 重设中间区域的所有边框 start ---- */
            if (hasCenterArea) {
                this.rs('set.border', borderValue, {
                    row: startIndex + 1,
                    col: 0
                }, {
                    row: endIndex - 1,
                    col: this.getConfig('MAX_COLUMN') - 1
                });
            }
            /* ---- 重设中间区域的所有边框 end ---- */
        },

        /**
         * 为指定行添加竖直边框，包括行本身的竖直边框和内部各单元格的竖直边框 ---- 左边框和右边框
         * @param row
         * @private
         */
        __addVerticalBorder: function (row, borderValue) {
            // 添加独立单元格上的竖直边框
            this.__restrictAddCellBorder(BORDER_LOCATION.LEFT, borderValue, row);
            this.__restrictAddCellBorder(BORDER_LOCATION.RIGHT, borderValue, row);

            // 设置交叉列上的单元格的竖直边框
            this.__overflowAddColumn(BORDER_LOCATION.LEFT, borderValue, row);
            this.__overflowAddColumn(BORDER_LOCATION.RIGHT, borderValue, row);

            // 添加行自身的竖直边框
            this.__restrictAddRowBorder(BORDER_LOCATION.LEFT, borderValue, row);
            this.__restrictAddRowBorder(BORDER_LOCATION.RIGHT, borderValue, row);
        }
    };
});