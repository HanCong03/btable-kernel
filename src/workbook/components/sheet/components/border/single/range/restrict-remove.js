/**
 * @file 受限擦除边框
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var NONE = require('NONE');
    var BORDER_LOCATION = require('../../definition/location');

    return {
        restrictRemoveBorder: function (location, start, end) {
            if (!this.__checkBoundary(start, end)) {
                return;
            }

            switch (location) {
                case BORDER_LOCATION.TOP:
                    this.__restrictRemoveTopBorder(start, end);
                    break;

                case BORDER_LOCATION.BOTTOM:
                    this.__restrictRemoveBottomBorder(start, end);
                    break;

                case BORDER_LOCATION.RIGHT:
                    this.__restrictRemoveRightBorder(start, end);
                    break;

                case BORDER_LOCATION.LEFT:
                    this.__restrictRemoveLeftBorder(start, end);
                    break;

                case BORDER_LOCATION.OUTER:
                    this.__restrictRemoveOuterBorder(start, end);
                    break;
            }
        },

        __restrictRemoveTopBorder: function (start, end) {
            this.__restrictRemoveRowSingleBorder(BORDER_LOCATION.TOP, start.row, start.col, end.col);
        },

        __restrictRemoveBottomBorder: function (start, end) {
            this.__restrictRemoveRowSingleBorder(BORDER_LOCATION.BOTTOM, end.row, start.col, end.col);
        },

        __restrictRemoveRightBorder: function (start, end) {
            this.__restrictRemoveColumnSingleBorder(BORDER_LOCATION.RIGHT, end.col, start.row, end.row);
        },

        __restrictRemoveLeftBorder: function (start, end) {
            this.__restrictRemoveColumnSingleBorder(BORDER_LOCATION.LEFT, start.col, start.row, end.row);
        },

        /**
         * 映射为对四条边的操作
         * @param start
         * @param end
         * @private
         */
        __restrictRemoveOuterBorder: function (start, end) {
            this.__restrictRemoveTopBorder(start, end);
            this.__restrictRemoveBottomBorder(start, end);
            this.__restrictRemoveLeftBorder(start, end);
            this.__restrictRemoveRightBorder(start, end);
        },

        __restrictRemoveRowSingleBorder: function (location, row, startCol, endCol) {
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

                /* --- 空检查 start --- */
                if ($$.isNdef(details)) {
                    continue;
                }

                details = details.border;

                if ($$.isNdef(details) || details[location] === NONE) {
                    continue;
                }
                /* --- 空检查 end --- */

                // 生成新的样式
                details = $$.clone(details);
                details[location] = NONE;

                cells[j] = {
                    si: this.getModule('StylePool').generateBorder(details, this.getCellSid(row, j))
                    //si: this.rs('generate.border', details, this.getCellSid(row, j))
                };
            }
        },

        __restrictRemoveColumnSingleBorder: function (location, col, startRow, endRow) {
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

                /* --- 空检查 start --- */
                if ($$.isNdef(details)) {
                    continue;
                }

                details = details.border;

                if ($$.isNdef(details) || details[location] === NONE) {
                    continue;
                }
                /* --- 空检查 end --- */

                // 生成新的样式
                details = $$.clone(details);
                details[location] = NONE;

                cells[col] = {
                    si: this.getModule('StylePool').generateBorder(details, this.getCellSid(i, col))
                    //si: this.rs('generate.border', details, this.getCellSid(i, col))
                };
            }
        }
    };
});