/**
 * @file 受限擦除边框
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var BORDER_LOCATION = require('../../definition/location');
    var DEFAULT_BORDER_STYLE = require('../../defaults/border');

    return {
        restrictAddBorder: function (location, borderValue, start, end) {
            if (!this.__checkBoundary(start, end)) {
                return;
            }

            switch (location) {
                case BORDER_LOCATION.TOP:
                    this.__restrictAddTopBorder(borderValue, start, end);
                    break;

                case BORDER_LOCATION.BOTTOM:
                    this.__restrictAddBottomBorder(borderValue, start, end);
                    break;

                case BORDER_LOCATION.RIGHT:
                    this.__restrictAddRightBorder(borderValue, start, end);
                    break;

                case BORDER_LOCATION.LEFT:
                    this.__restrictAddLeftBorder(borderValue, start, end);
                    break;

                case BORDER_LOCATION.OUTER:
                    this.__restrictAddOuterBorder(borderValue, start, end);
                    break;
            }
        },

        __restrictAddTopBorder: function (borderValue, start, end) {
            this.__restrictAddRowSingleBorder(BORDER_LOCATION.TOP, borderValue, start.row, start.col, end.col);
        },

        __restrictAddBottomBorder: function (borderValue, start, end) {
            this.__restrictAddRowSingleBorder(BORDER_LOCATION.BOTTOM, borderValue, end.row, start.col, end.col);
        },

        __restrictAddRightBorder: function (borderValue, start, end) {
            this.__restrictAddColumnSingleBorder(BORDER_LOCATION.RIGHT, borderValue, end.col, start.row, end.row);
        },

        __restrictAddLeftBorder: function (borderValue, start, end) {
            this.__restrictAddColumnSingleBorder(BORDER_LOCATION.LEFT, borderValue, start.col, start.row, end.row);
        },

        /**
         * 映射为对四条边的操作
         * @param start
         * @param end
         * @private
         */
        __restrictAddOuterBorder: function (borderValue, start, end) {
            this.__restrictAddTopBorder(borderValue, start, end);
            this.__restrictAddBottomBorder(borderValue, start, end);
            this.__restrictAddLeftBorder(borderValue, start, end);
            this.__restrictAddRightBorder(borderValue, start, end);
        },

        __restrictAddRowSingleBorder: function (location, borderValue, row, startCol, endCol) {
            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;

            var cells;

            if ($$.isNdef(rowsData[row])) {
                rowsData[row] = {};
            }

            var currentRow = rowsData[row];

            if ($$.isNdef(currentRow.cells)) {
                currentRow.cells = [];
            }

            cells = currentRow.cells;

            for (var j = startCol; j <= endCol; j++) {
                var details = this.getCellClassifyStyleDetails('borders', row, j);

                if ($$.isNdef(details)) {
                    details = $$.clone(DEFAULT_BORDER_STYLE);
                } else {
                    details = $$.clone(details.border);
                }

                // 生成新的样式
                details[location] = borderValue;

                cells[j] = {
                    si: this.rs('generate.border', details, this.getCellSid(row, j))
                };
            }
        },

        __restrictAddColumnSingleBorder: function (location, borderValue, col, startRow, endRow) {
            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;

            var currentRow;
            var cells;

            for (var i = startRow; i <= endRow; i++) {
                if ($$.isNdef(rowsData[i])) {
                    rowsData[i] = {};
                }

                currentRow = rowsData[i];

                if ($$.isNdef($$.isNdef(currentRow.cells))) {
                    currentRow.cells = [];
                }

                cells = currentRow.cells;

                var details = this.getCellClassifyStyleDetails('borders', i, col);

                if ($$.isNdef(details)) {
                    details = $$.clone(DEFAULT_BORDER_STYLE);
                } else {
                    details = $$.clone(details.border);
                }

                // 生成新的样式
                details[location] = borderValue;

                cells[col] = {
                    si: this.rs('generate.border', details, this.getCellSid(i, col))
                };
            }
        }
    };
});