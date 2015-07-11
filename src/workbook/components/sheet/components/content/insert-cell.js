/**
 * @file 内容组件，维护单元格内容
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    var WORKBOOK_CONFIG = require('../../../../config');

    var MAX_COLUMN_INDEX = WORKBOOK_CONFIG.MAX_COLUMN - 1;
    var MAX_ROW_INDEX = WORKBOOK_CONFIG.MAX_ROW - 1;

    module.exports = {
        __insertCell: function (position, row, col) {
            if (position === 'top') {
                this.__insertTopCell(row, col);
            } else {
                this.__insertLeftCell(row, col);
            }
        },

        __insertTopCell: function (row, col) {
            var cellData = this.getActiveSheet().cell;
            var rowsData = cellData.rows;
            var currentRow;
            var prevIndex;

            for (var i = rowsData.length; i >= row; i--) {
                prevIndex = i - 1;

                if (!rowsData[prevIndex] || !rowsData[prevIndex].cells
                    || !rowsData[prevIndex].cells[col]) {
                    continue;
                }

                if (!rowsData[i]) {
                    rowsData[i] = {};
                }

                currentRow = rowsData[i];

                if ($$.isNdef(currentRow.cells)) {
                    currentRow.cells = [];
                }

                currentRow.cells[col] = rowsData[prevIndex].cells[col];
            }

            if (!rowsData[row]) {
                rowsData[row] = {};
            }

            if (!rowsData[row].cells) {
                rowsData[row].cells = [];
            }

            rowsData[row].cells[col] = {};

            this.postMessage('style.dimension.change');
            this.postMessage('contentchange', {
                row: 0,
                col: col
            }, {
                row: MAX_ROW_INDEX,
                col: col
            });
        },

        __insertLeftCell: function () {}
    };
});