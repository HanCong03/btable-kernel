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
        __insertCell: function (position, start, end) {
            if (position === 'top') {
                this.__insertTopCell(start, end);
            } else {
                this.__insertLeftCell(start, end);
            }
        },

        __insertTopCell: function (start, end) {
            var cellData = this.getActiveSheet().cell;
            var rowsData = cellData.rows;
            var currentRow;
            var cells;

            var startRow = start.row;
            var endRow = end.row;
            var startCol = start.col;
            var endCol = end.col;
            var count = endRow - startRow + 1;

            var targetIndex;

            for (var i = rowsData.length - 1; i >= startRow; i--) {
                currentRow = rowsData[i];

                if (!currentRow || !currentRow.cells) {
                    continue;
                }

                cells = currentRow.cells;
                targetIndex = i + count;

                for (var j = startCol; j <= endCol; j++) {
                    if (!cells[j]) {
                        continue;
                    }

                    if (!rowsData[targetIndex]) {
                        rowsData[targetIndex] = {};
                    }

                    if (!rowsData[targetIndex].cells) {
                        rowsData[targetIndex].cells = [];
                    }

                    rowsData[targetIndex].cells[j] = cells[j];

                    // 删除原始数据
                    delete cells[j];
                }
            }

            this.__notifyInsertTopCell(start, end);
        },

        __insertLeftCell: function (start, end) {
            var cellData = this.getActiveSheet().cell;
            var rowsData = cellData.rows;
            var cells;

            var startRow = start.row;
            var endRow = end.row;
            var startCol = start.col;
            var endCol = end.col;
            var count = endCol - startCol + 1;

            // 新插入的单元格
            var newCells = [];
            newCells.length = count;

            for (var i = startRow; i <= endRow; i++) {
                if (!rowsData[i] || !rowsData[i].cells) {
                    continue;
                }

                cells = rowsData[i].cells;

                // 在无效区域插入新单元格，直接跳出
                if (startCol >= cells.length) {
                    continue;
                }

                cells.splice.apply(cells, [startCol, 0].concat(newCells) );

                // 清除刚插入的内容
                for (var j = 0; j < count; j++) {
                    delete cells[startCol + j];
                }
            }

            this.__notifyInsertLeftCell(start, end);
        },

        __notifyInsertTopCell: function (start, end) {
            this.postMessage('style.dimension.change');
            this.postMessage('contentchange', {
                row: 0,
                col: start.col
            }, {
                row: MAX_ROW_INDEX,
                col: end.col
            });
        },

        __notifyInsertLeftCell: function (start, end) {
            this.postMessage('style.dimension.change');
            this.postMessage('contentchange', {
                row: start.row,
                col: 0
            }, {
                row: end.row,
                col: MAX_COLUMN_INDEX
            });
        }
    };
});