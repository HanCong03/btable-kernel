/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    var BORDER_LOCATION = require('../../definition/location');

    return {
        removeBorder: function (location, startIndex, endIndex) {
            switch (location) {
                case BORDER_LOCATION.TOP:
                    this.__removeTopBorder(startIndex, endIndex);
                    break;

                case BORDER_LOCATION.BOTTOM:
                    this.__removeBottomBorder(startIndex, endIndex);
                    break;

                case BORDER_LOCATION.RIGHT:
                    this.__removeRightBorder(startIndex, endIndex);
                    break;

                case BORDER_LOCATION.LEFT:
                    this.__removeLeftBorder(startIndex, endIndex);
                    break;

                case BORDER_LOCATION.OUTER:
                    this.__removeOuterBorder(startIndex, endIndex);
                    break;

                case BORDER_LOCATION.INNER:
                    this.__removeInnerBorder(startIndex, endIndex);
                    break;
            }
        },

        __removeTopBorder: function (startIndex, endIndex) {
            this.restrictRemoveBorder(BORDER_LOCATION.TOP, startIndex, startIndex);
            this.restrictRemoveBorder(BORDER_LOCATION.BOTTOM, startIndex - 1, startIndex - 1);
        },

        __removeBottomBorder: function (startIndex, endIndex) {
            this.restrictRemoveBorder(BORDER_LOCATION.BOTTOM, endIndex, endIndex);
            this.restrictRemoveBorder(BORDER_LOCATION.TOP, endIndex + 1, endIndex + 1);
        },

        // 行级操作，忽略对竖直边框的处理
        __removeLeftBorder: function (startIndex, endIndex) {
            /**********************/
            /*     do nothing     */
            /**********************/
        },

        // 行级操作，左右边框设置无效
        __removeRightBorder: function (startIndex, endIndex) {
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
        __removeOuterBorder: function (startIndex, endIndex) {
            this.__removeTopBorder(startIndex, endIndex);
            this.__removeBottomBorder(startIndex, endIndex);
            this.__removeLeftBorder(startIndex, endIndex);
            this.__removeRightBorder(startIndex, endIndex);
        },

        __removeInnerBorder: function (startIndex, endIndex) {
            var hasCenterArea = endIndex - 1 >= startIndex + 1;

            /* ---- 对外层区域进行擦除 start ---- */
            /*
             * 条件1：不存在中央区域
             * 条件2：当前区域不是单行
             */
            if (!hasCenterArea && startIndex !== endIndex) {
                // 删除起始行的下边框
                this.restrictRemoveBorder(BORDER_LOCATION.BOTTOM, startIndex, startIndex);
                // 删除结束行的上边框
                this.restrictRemoveBorder(BORDER_LOCATION.TOP, endIndex, endIndex);
            }

            // 删除起始行包含的所有的竖直边框
            this.__removeVerticalBorder(startIndex);

            // 起始行和结束行不是同一行，则需要擦除结束行的竖直边框
            if (startIndex !== endIndex) {
                // 删除结束行包含的所有的竖直边框
                this.__removeVerticalBorder(endIndex);
            }
            /* ---- 对外层区域进行擦除 end ---- */

            /* ---- 清除中间区域的所有边框 start ---- */
            if (hasCenterArea) {
                this.getModule('Border').unsetBorder({
                //this.rs('unset.border', {
                    row: startIndex + 1,
                    col: 0
                }, {
                    row: endIndex - 1,
                    col: this.getConfig('MAX_COLUMN') - 1
                });
            }
            /* ---- 清除中间区域的所有边框 start ---- */
        },

        /**
         * 删除指定行的竖直边框，包括行本身的竖直边框和内部各单元格的竖直边框 ---- 左边框和右边框
         * @param row
         * @private
         */
        __removeVerticalBorder: function (row) {
            // 擦除独立单元格上的竖直边框
            this.__restrictRemoveCellBorder(BORDER_LOCATION.LEFT, row);
            this.__restrictRemoveCellBorder(BORDER_LOCATION.RIGHT, row);

            // 擦除交叉列上的单元格的竖直边框
            this.__overflowColumn(BORDER_LOCATION.LEFT, row);
            this.__overflowColumn(BORDER_LOCATION.RIGHT, row);

            // 擦除行自身的竖直边框
            this.__restrictRemoveRowBorder(BORDER_LOCATION.LEFT, row);
            this.__restrictRemoveRowBorder(BORDER_LOCATION.RIGHT, row);
        }
    };
});