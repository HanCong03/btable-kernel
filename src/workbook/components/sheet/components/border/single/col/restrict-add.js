/**
 * @file 受限擦除
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var DEFAULT_BORDER_STYLE = require('../../defaults/border');
    var BORDER_LOCATION = require('../../definition/location');

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

        // 列级设置，忽略对水平边框的处理
        __restrictAddTopBorder: function (borderValue, startIndex, endIndex) {
            /**********************/
            /*     do nothing     */
            /**********************/
        },

        __restrictAddBottomBorder: function (borderValue, startIndex, endIndex) {
            /**********************/
            /*     do nothing     */
            /**********************/
        },

        __restrictAddRightBorder: function (borderValue, startIndex, endIndex) {
            this.__restrictAddCellBorder(BORDER_LOCATION.RIGHT, borderValue, endIndex);
            this.__overflowAddRow(BORDER_LOCATION.RIGHT, borderValue, endIndex);
            this.__restrictAddColumnBorder(BORDER_LOCATION.RIGHT, borderValue, endIndex);
        },

        __restrictAddLeftBorder: function (borderValue, startIndex, endIndex) {
            this.__restrictAddCellBorder(BORDER_LOCATION.LEFT, borderValue, startIndex);
            this.__overflowAddRow(BORDER_LOCATION.LEFT, borderValue, startIndex);
            this.__restrictAddColumnBorder(BORDER_LOCATION.LEFT, borderValue, startIndex);
        },

        // 映射为对四条边的设置
        __restrictAddOuterBorder: function (borderValue, startIndex, endIndex) {
            this.__restrictAddTopBorder(borderValue, startIndex, endIndex);
            this.__restrictAddBottomBorder(borderValue, startIndex, endIndex);
            this.__restrictAddLeftBorder(borderValue, startIndex, endIndex);
            this.__restrictAddRightBorder(borderValue, startIndex, endIndex);
        },

        /**
         * 重设指定列上的独立单元格的指定位置的边框
         * @param location
         * @param col
         * @private
         */
        __restrictAddCellBorder: function (location, borderValue, col) {
            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;

            $$.forEach(rowsData, function (currentRow, row) {
                if ($$.isNdef(currentRow.cells) || $$.isNdef(currentRow.cells[col])) {
                    return;
                }

                var currentCell = currentRow.cells[col];

                var details = this.getCellClassifyStyleDetails('borders', row, col);

                if ($$.isNdef(details)) {
                    details = $$.clone(DEFAULT_BORDER_STYLE);
                } else {
                    details = $$.clone(details.border);
                }

                details[location] = borderValue;

                currentCell.si = this.getModule('StylePool').generateBorder(details, currentCell.si);
                //currentCell.si = this.rs('generate.border', details, currentCell.si);
            }, this);
        },

        /**
         * 覆盖与指定列交叉的行上的单元格的指定位置的边框
         * @param location
         * @param col
         * @private
         */
        __overflowAddRow: function (location, borderValue, col) {
            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;

            $$.forEach(rowsData, function (currentRow, row) {
                // 该行不存在独立样式
                if ($$.isNdef(currentRow.customFormat)) {
                    return;
                }

                var sid = currentRow.si;
                var details = this.getRowClassifyStyleDetails('borders', row);

                if ($$.isNdef(details)) {
                    details = $$.clone(DEFAULT_BORDER_STYLE);
                } else {
                    details = $$.clone(details.border);
                }

                details[location] = borderValue;
                // 生成新边框
                //sid = this.rs('generate.border', details, sid);
                sid = this.getModule('StylePool').generateBorder(details, sid);

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
         * 重设指定列上的指定位置的列边框
         * 注意：只擦除行边框
         * @param location
         * @param col
         * @private
         */
        __restrictAddColumnBorder: function (location, borderValue, col) {
            var styleData = this.getActiveSheet().style;
            var colsData = styleData.cols;

            var details = this.getColumnClassifyStyleDetails('borders', col);

            if ($$.isNdef(details)) {
                details = $$.clone(DEFAULT_BORDER_STYLE);
            } else {
                details = $$.clone(details.border);
            }

            details[location] = borderValue;

            colsData[col] = {
                customFormat: 1,
                //si: this.rs('generate.border', details, this.getColumnSid(col))
                si: this.getModule('StylePool').generateBorder(details, this.getColumnSid(col))
            };
        }
    };
});