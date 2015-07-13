/**
 * @file 对插入单元格操作的样式处理
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');

    var WORKBOOK_CONFIG = require('../../../../config');

    var MAX_COLUMN_INDEX = WORKBOOK_CONFIG.MAX_COLUMN - 1;
    var MAX_ROW_INDEX = WORKBOOK_CONFIG.MAX_ROW - 1;

    return {
        __insertCell: function (position, start, end) {
            if (position === 'top') {
                this.__insertTopCell(start, end);
            } else {
                this.__insertLeftCell(start, end);
            }
        },

        __insertTopCell: function (start, end) {
            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;

            var startRow = start.row;
            var startCol = start.col;
            var endRow = end.row;
            var endCol = end.col;

            var targetIndex;
            var currentRow;

            var count = endRow - startRow + 1;
            var sid;

            /* ---- 移动行 ---- */
            for (var i = rowsData.length - 1; i >= startRow; i--) {
                targetIndex = i + count;

                if (!rowsData[i]) {
                    rowsData[i] = {};
                }

                currentRow = rowsData[i];

                if (!currentRow.cells) {
                    currentRow.cells = [];
                }

                for (var j = startCol; j <= endCol; j++) {
                    sid = this.getCellSid(i, j);

                    // 清空源样式
                    currentRow.cells[j] = {};

                    if (!rowsData[targetIndex]) {
                        rowsData[targetIndex] = {};
                    }

                    if (!rowsData[targetIndex].cells) {
                        rowsData[targetIndex].cells = [];
                    }

                    if (!sid) {
                        rowsData[targetIndex].cells[j] = {};
                    } else {
                        rowsData[targetIndex].cells[j] = {
                            si: sid
                        };
                    }
                }
            }

            /* --- 插入新行 --- */
            // 新插入行的数据源行索引
            var sourceIndex = startRow - 1;

            if (!rowsData[sourceIndex] || !rowsData[sourceIndex].cells) {
                return this.__notifyInsertTopCell(start, end);
            }

            for (var i = startCol; i <= endCol; i++) {
                sid = this.getCellSid(sourceIndex, i);

                if (!sid) {
                    continue;
                }

                for (var j = 0; j < count; j++) {
                    targetIndex = startRow + j;

                    if (!rowsData[targetIndex]) {
                        rowsData[targetIndex] = {};
                    }

                    if (!rowsData[targetIndex].cells) {
                        rowsData[targetIndex].cells = [];
                    }

                    rowsData[targetIndex].cells[i] = {
                        si: sid
                    };
                }
            }

            this.__notifyInsertTopCell(start, end);
        },

        __insertLeftCell: function (start, end) {
            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;

            var startRow = start.row;
            var startCol = start.col;
            var endRow = end.row;
            var endCol = end.col;

            var currentRow;

            var count = endCol - startCol + 1;
            var cells;
            var sid;

            /* ---- 移动列 ---- */
            for (var i = startRow; i <= endRow; i++) {
                currentRow = rowsData[i];

                // 当前行数据无效
                if (!currentRow || !currentRow.cells) {
                    continue;
                }

                cells = currentRow.cells;

                for (var j = cells.length - 1; j >= startCol; j--) {
                    sid = this.getCellSid(i, j);

                    // 清空源style数据
                    cells[j] = {};

                    // 更新目标单元格style
                    if (sid) {
                        cells[j + count] = {
                            si: sid
                        }
                    } else {
                        cells[j + count] = {};
                    }
                }
            }

            /* --- 插入新列 --- */
            // 新插入行的数据源行索引
            var sourceIndex = startCol - 1;

            for (var i = startRow; i <= endRow; i++) {
                if (!rowsData[i] || !rowsData[i].cells) {
                    continue;
                }

                sid = this.getCellSid(i, sourceIndex);

                if (!sid) {
                    continue;
                }

                for (var j = 0; j < count; j++) {
                    rowsData[i].cells[startCol + j] = {
                        si: sid
                    };
                }
            }

            this.__notifyInsertLeftCell(start, end);
        },

        __notifyInsertTopCell: function (start, end) {
            this.postMessage('style.dimension.change');

            this.postMessage('stylechange', {
                row: 0,
                col: start.col
            }, {
                row: MAX_ROW_INDEX,
                col: end.col
            });
        },

        __notifyInsertLeftCell: function (start, end) {
            this.postMessage('style.dimension.change');

            this.postMessage('stylechange', {
                row: start.row,
                col: 0
            }, {
                row: end.row,
                col: MAX_COLUMN_INDEX
            });
        }
    };
});