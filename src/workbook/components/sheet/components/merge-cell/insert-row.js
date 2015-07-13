/**
 * @file 处理插入单元格时所需要做的工作
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var WorkbookConfig = require('../../../../config.js');
    var MAX_ROW_INDEX = WorkbookConfig.MAX_ROW - 1;
    var MAX_COLUMN_INDEX = WorkbookConfig.MAX_COLUMN - 1;

    module.exports = {
        insertRow: function (startIndex, endIndex) {
            var mergecells = this.getMergeCells({
                row: startIndex,
                col: 0
            }, {
                row: endIndex,
                col: MAX_COLUMN_INDEX
            });

            var mergeInfo;

            for (var key in mergecells) {
                if (!mergecells.hasOwnProperty(key)) {
                    continue;
                }

                mergeInfo = mergecells[key];

                if (mergeInfo.start.row >= startIndex) {
                    continue;
                }

                //this.__
            }
        },

        __insertTopCell: function (start, end) {
            var mergecells = this.getMergeCells({
                row: end.row + 1,
                col: start.col
            }, {
                row: MAX_ROW_INDEX,
                col: end.col
            });

            if (!mergecells) {
                return;
            }

            var startCol = start.col;
            var endCol = end.col;
            var mergeInfo;

            var count = end.row - start.row + 1;
            var mergeStart;
            var mergeEnd;

            for (var key in mergecells) {
                if (!mergecells.hasOwnProperty(key)) {
                    continue;
                }

                mergeInfo = mergecells[key];
                mergeStart = mergeInfo.start;
                mergeEnd = mergeInfo.end;

                // 合并单元格溢出， 则撤销该单元格的合并
                if (mergeStart.col < startCol || mergeEnd.col > endCol) {
                    this.unmergeCell(mergeStart.row, mergeStart.col);

                // 否则，更新该合并单元格的起始和结束位置
                } else {
                    this.updateMergeCell(mergeStart.row, mergeStart.col, {
                        row: mergeStart.row + count,
                        col: mergeStart.col
                    }, {
                        row: mergeEnd.row + count,
                        col: mergeEnd.col
                    });
                }
            }
        },

        __insertLeftCell: function (start, end) {
            var mergecells = this.getMergeCells({
                row: start.row,
                col: end.col + 1
            }, {
                row: end.row,
                col: MAX_COLUMN_INDEX
            });

            if (!mergecells) {
                return;
            }

            var startRow = start.row;
            var endRow = end.row;
            var count = end.col - start.col + 1;

            var mergeInfo;
            var mergeStart;
            var mergeEnd;

            for (var key in mergecells) {
                if (!mergecells.hasOwnProperty(key)) {
                    continue;
                }

                mergeInfo = mergecells[key];
                mergeStart = mergeInfo.start;
                mergeEnd = mergeInfo.end;

                // 合并单元格溢出，则撤销合并
                if (mergeStart.row < startRow || mergeEnd.row > endRow) {
                    this.unmergeCell(mergeStart.row, mergeStart.col);

                // 否则，更新该合并单元格的起始和结束位置
                } else {
                    this.updateMergeCell(mergeStart.row, mergeStart.col, {
                        row: mergeStart.row,
                        col: mergeStart.col + count
                    }, {
                        row: mergeEnd.row,
                        col: mergeEnd.col + count
                    });
                }
            }
        }
    };
});