/**
 * @file 处理插入单元格时所需要做的工作
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var WorkbookConfig = require('../../../../config');
    var MAX_ROW_INDEX = WorkbookConfig.MAX_ROW - 1;
    var MAX_COLUMN_INDEX = WorkbookConfig.MAX_COLUMN - 1;

    module.exports = {
        insertRow: function (startIndex, endIndex) {
            // 由于映射关系还未修改，所以此时的查询，仍然基于原有数据进行查询即可
            var mergecells = this.getMergeCells({
                row: startIndex,
                col: 0
            }, {
                row: endIndex,
                col: MAX_COLUMN_INDEX
            });

            var count = endIndex - startIndex + 1;

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

                // 处于移动线以下的合并单元格，直接移动即可
                if (mergeInfo.start.row >= startIndex) {
                    this.updateMergeCell(mergeStart.row, mergeStart.col, {
                        row: mergeStart.row + count,
                        col: mergeStart.col
                    }, {
                        row: mergeEnd.row + count,
                        col: mergeEnd.col
                    });

                // 否则，不移动，但是在相应位置添加行
                } else {
                    this.__addRow(mergeStart, mergeEnd, startIndex, count);
                }
            }
        },

        /**
         * 添加行
         * @param start 合并单元格原始起点
         * @param end 合并单元格原始结束点
         * @param startIndex 新添加行的位置（行索引）
         * @param count 添加的行的条数
         * @private
         */
        __addRow: function (start, end, startIndex, count) {
            this.updateMergeCell(start.row, start.col, start, {
                row: end.row + count,
                col: end.col
            });
        }
    };
});