/**
 * @file 非受限擦除
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

        // 列级设置，忽略对水平边框的处理
        __removeTopBorder: function (startIndex, endIndex) {
            /**********************/
            /*     do nothing     */
            /**********************/
        },

        __removeBottomBorder: function (startIndex, endIndex) {
            /**********************/
            /*     do nothing     */
            /**********************/
        },

        __removeRightBorder: function (startIndex, endIndex) {
            this.restrictRemoveBorder(BORDER_LOCATION.RIGHT, endIndex, endIndex);
            this.restrictRemoveBorder(BORDER_LOCATION.LEFT, endIndex + 1, endIndex + 1);
        },

        __removeLeftBorder: function (startIndex, endIndex) {
            this.restrictRemoveBorder(BORDER_LOCATION.LEFT, startIndex, startIndex);
            this.restrictRemoveBorder(BORDER_LOCATION.RIGHT, startIndex - 1, startIndex - 1);
        },

        // 映射为对四条边的设置
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
             * 条件1：中央区域不存在
             * 条件2：当前区域不是单列
             */
            if (!hasCenterArea && startIndex !== endIndex) {
                // 删除起始列的右边框
                this.restrictRemoveBorder(BORDER_LOCATION.RIGHT, startIndex, startIndex);

                // 删除结束列的左边框
                this.restrictRemoveBorder(BORDER_LOCATION.LEFT, endIndex, endIndex);
            }

            // 删除起始列包含的所有的水平边框
            this.__removeHorizontalBorder(startIndex);

            // 起始列和结束列不是同一列，则擦除结束列包含的所有的水平边框
            if (startIndex !== endIndex) {
                this.__removeHorizontalBorder(endIndex);
            }
            /* ---- 对外层区域进行擦除 end ---- */

            /* ---- 清除中间区域的所有边框 start ---- */
            if (hasCenterArea) {
                this.rs('unset.border', {
                    row: 0,
                    col: startIndex + 1
                }, {
                    row: this.getConfig('MAX_ROW') - 1,
                    col: endIndex - 1
                });
            }
            /* ---- 清除中间区域的所有边框 end ---- */
        },

        /**
         * 删除指定列的水平边框，包括列本身的水平边框和内部各单元格的水平边框 ---- 上边框和下边框
         * @param col
         * @private
         */
        __removeHorizontalBorder: function (col) {
            // 擦除独立单元格上的水平边框
            this.__restrictRemoveCellBorder(BORDER_LOCATION.TOP, col);
            this.__restrictRemoveCellBorder(BORDER_LOCATION.BOTTOM, col);

            // 擦除交叉列上的单元格的水平边框
            this.__overflowRow(BORDER_LOCATION.TOP, col);
            this.__overflowRow(BORDER_LOCATION.BOTTOM, col);

            // 擦除行自身的水平边框
            this.__restrictRemoveColumnBorder(BORDER_LOCATION.TOP, col);
            this.__restrictRemoveColumnBorder(BORDER_LOCATION.BOTTOM, col);
        }
    };
});