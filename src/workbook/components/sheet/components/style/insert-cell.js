/**
 * @file 获取原始样式数据
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');

    var WORKBOOK_CONFIG = require('../../../../config');

    var MAX_COLUMN_INDEX = WORKBOOK_CONFIG.MAX_COLUMN - 1;
    var MAX_ROW_INDEX = WORKBOOK_CONFIG.MAX_ROW - 1;

    return {
        __insertCell: function (position, row, col) {
            if (position === 'top') {
                this.__insertTopCell(row, col);
            } else {
                this.__insertLeftCell(row, col);
            }
        },

        __insertTopCell: function (row, col) {
            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;
            var currentRow;
            var prevSid;

            for (var i = rowsData.length; i >= row; i--) {
                prevSid = this.getCellSid(i - 1, col);

                if (!rowsData[i]) {
                    rowsData[i] = {};
                }

                currentRow = rowsData[i];

                if ($$.isNdef(currentRow.cells)) {
                    currentRow.cells = [];
                }

                currentRow.cells[col] = {};

                if (prevSid) {
                    currentRow.cells[col].si = prevSid;
                }
            }

            if (rowsData[row - 1] && rowsData[row - 1].cells && rowsData[row - 1].cells[col]) {
                if (!rowsData[row]) {
                    rowsData[row] = {};
                }

                if (!rowsData[row].cells) {
                    rowsData[row].cells = [];
                }

                rowsData[row].cells[col] = $$.clone(rowsData[row - 1].cells[col]);
            }

            this.postMessage('style.dimension.change');
            this.postMessage('stylechange', {
                row: 0,
                col: col
            }, {
                row: MAX_ROW_INDEX,
                col: col
            });
        },

        __insertLeftCell: function (row, col) {
            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;
            var currentRow = rowsData[row];

            if (!currentRow || !currentRow.cells) {
                return;
            }

            if (currentRow.cells.length < col) {
                return;
            }

            var target = currentRow.cells[col - 1];

            if (target) {
                currentRow.cells.splice(col, 0, $$.clone(target));
            } else {
                currentRow.cells.splice(col, 0, null);
                delete currentRow.cells[col];
            }

            this.postMessage('style.dimension.change');
            this.postMessage('stylechange', {
                row: row,
                col: 0
            }, {
                row: row,
                col: MAX_COLUMN_INDEX
            });
        }
    };
});