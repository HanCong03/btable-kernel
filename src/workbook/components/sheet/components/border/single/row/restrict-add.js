/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var BORDER_LOCATION = require('../../definition/location');
    var DEFAULT_BORDER_STYLE = require('../../defaults/border');

    return {
        restrictAddBorder: function (location, borderValue, startIndex, endIndex) {
            if (!this.__checkBoundary(startIndex, endIndex)) {
                return;
            }

            switch (location) {
                case BORDER_LOCATION.TOP:
                    this.__restrictAddTopBorder(borderValue, startIndex, endIndex);
                    break;

                case BORDER_LOCATION.BOTTOM:
                    this.__restrictAddBottomBorder(borderValue, startIndex, endIndex);
                    break;

                case BORDER_LOCATION.RIGHT:
                    this.__restrictAddRightBorder(borderValue, startIndex, endIndex);
                    break;

                case BORDER_LOCATION.LEFT:
                    this.__restrictAddLeftBorder(borderValue, startIndex, endIndex);
                    break;

                case BORDER_LOCATION.OUTER:
                    this.__restrictAddOuterBorder(borderValue, startIndex, endIndex);
                    break;
            }
        },

        __restrictAddTopBorder: function (borderValue, startIndex, endIndex) {
            this.__restrictAddCellBorder(BORDER_LOCATION.TOP, borderValue, startIndex);
            this.__overflowAddColumn(BORDER_LOCATION.TOP, borderValue, startIndex);
            this.__restrictAddRowBorder(BORDER_LOCATION.TOP, borderValue, startIndex);
        },

        __restrictAddBottomBorder: function (borderValue, startIndex, endIndex) {
        },

        // 行级操作，忽略对竖直边框的处理
        __restrictAddLeftBorder: function (borderValue, startIndex, endIndex) {
            /**********************/
            /*     do nothing     */
            /**********************/
        },

        // 行级操作，左右边框设置无效
        __restrictAddRightBorder: function (borderValue, startIndex, endIndex) {
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
        __restrictAddOuterBorder: function (borderValue, startIndex, endIndex) {
            this.__restrictAddTopBorder(borderValue, startIndex, endIndex);
            this.__restrictAddBottomBorder(borderValue, startIndex, endIndex);
            this.__restrictAddLeftBorder(borderValue, startIndex, endIndex);
            this.__restrictAddRightBorder(borderValue, startIndex, endIndex);
        },

        /**
         * 在指定行上的独立单元格的指定位置添加边框
         * @param location
         * @param row
         * @private
         */
        __restrictAddCellBorder: function (location, borderValue, row) {
            var styleData = this.getActiveSheet().style;
            var currentRow = styleData.rows[row];

            if ($$.isNdef(currentRow) || $$.isNdef(currentRow.cells)) {
                return;
            }

            $$.forEach(currentRow.cells, function (currentCell, col) {
                var details = this.getCellClassifyStyleDetails('borders', row, col);

                if ($$.isNdef(details)) {
                    details = $$.clone(DEFAULT_BORDER_STYLE);
                } else {
                    details = $$.clone(details.border);
                }

                details[location] = borderValue;

                currentCell.si = this.generateBorder(details, currentCell.si);
            }, this);
        },

        /**
         * 覆盖与指定行交叉的列上的单元格的指定位置的边框
         * @param location
         * @param row
         * @private
         */
        __overflowAddColumn: function (location, borderValue, row) {
            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;
            var colsData = styleData.cols;

            var globalStyle = styleData.globalStyle;

            $$.forEach(colsData, function (currentCol, col) {
                var sid = this.getColumnSid(col);

                // 和全局样式一致，则删除该列样式，并退出
                if ($$.isNdef(currentCol.customFormat) || sid === globalStyle) {
                    delete colsData[col];
                    return;
                }

                var currentRow = rowsData[row];

                // 行存在且具有自定义样式，则跳过该行上的覆盖
                if ($$.isDefined(currentRow) && $$.isDefined(currentRow.customFormat)) {
                    return;
                }

                var details = this.getColumnClassifyStyleDetails('borders', col);

                if ($$.isNdef(details)) {
                    details = $$.clone(DEFAULT_BORDER_STYLE);
                } else {
                    details = $$.clone(details.border);
                }

                details[location] = borderValue;
                sid = this.generateBorder(details, sid);

                if ($$.isNdef(currentRow)) {
                    rowsData[row] = {};
                    currentRow = rowsData[row];
                }

                if ($$.isNdef(currentRow.cells)) {
                    currentRow.cells = [];
                }

                // 当前处理的是独立单元格，则跳过
                if ($$.isDefined(currentRow.cells[col])) {
                    return;
                }

                currentRow.cells[col] = {
                    si: sid
                };

            }, this);
        },

        /**
         * 受限地在指定行上的指定位置添加边框
         * 注意：该操作只影响行边框
         * @param location
         * @param row
         * @private
         */
        __restrictAddRowBorder: function (location, borderValue, row) {
            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;

            var details = this.getRowClassifyStyleDetails('borders', row);

            if ($$.isNdef(details)) {
                details = $$.clone(DEFAULT_BORDER_STYLE);
            } else {
                details = $$.clone(details.border);
            }

            details[location] = borderValue;

            if ($$.isNdef(rowsData[row])) {
                rowsData[row] = {};
            }

            rowsData[row].customFormat = 1;
            rowsData[row].si = this.generateBorder(details, this.getRowSid(row));
        }
    };
});