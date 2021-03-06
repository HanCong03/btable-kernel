/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var WORKBOOK_CONFIG = require('./config');

    var MAX_COLUMN = WORKBOOK_CONFIG.MAX_COLUMN;
    var MAX_ROW = WORKBOOK_CONFIG.MAX_ROW;
    var MAX_COLUMN_INDEX = WORKBOOK_CONFIG.MAX_COLUMN - 1;
    var MAX_ROW_INDEX = WORKBOOK_CONFIG.MAX_ROW - 1;

    module.exports = {
        /**
         * 判断给定的区域的类型。
         * @param start
         * @param end
         * @returns {string} 返回值解释如下： 'all' => 全选，'col' => 列选中， 'row' => 行选中， 'range' => 区域选中
         */
        getRangeType: function (start, end) {
            if (start.row === 0 && end.row >= MAX_ROW_INDEX && start.col === 0 && end.col >= MAX_COLUMN_INDEX) {
                return 'all';
            }

            if (start.row === 0 && end.row >= MAX_ROW_INDEX) {
                return 'col';
            }

            if (start.col === 0 && end.col >= MAX_COLUMN_INDEX) {
                return 'row';
            }

            return 'range';
        },

        getRangeClassify: function (range) {
            var rowCount = range.end.row - range.start.row + 1;
            var colCount = range.end.col - range.start.col + 1;

            if (rowCount === 1 && colCount === 1) {
                return 'cell';
            }

            if (rowCount === 1) {
                return 'row';
            }

            if (colCount === 1) {
                return 'column';
            }

            return 'range';
        },

        /**
         * 把指定的行列坐标换算成数字索引
         */
        rowColToIndex: function (row, col) {
            return row * MAX_COLUMN + col;
        },

        rangeToIndexes: function (start, end) {
            var indexes = [];
            var currentRows;
            var startIndex;

            for (var i = start.row, limit = end.row; i <= limit; i++) {
                currentRows = [];
                indexes.push(currentRows);
                startIndex = i * MAX_COLUMN + start.col;

                for (var j = 0, jlimit = end.col - start.col; j <= jlimit; j++) {
                    currentRows.push(startIndex + j);
                }
            }

            return indexes;
        },

        isIntersection: function (range1, range2) {
            var y1 = range1.start.row;
            var y2 = range1.end.row;
            var y3 = range2.start.row;
            var y4 = range2.end.row;

            var x1 = range1.start.col;
            var x2 = range1.end.col;
            var x3 = range2.start.col;
            var x4 = range2.end.col;

            if (Math.abs(x4 + x3 - x2 - x1) > x4 - x3 + x2 - x1) {
                return false;
            }

            if (Math.abs(y4 + y3 - y2 - y1) > y4 - y3 + y2 - y1) {
                return false;
            }

            return true;
        }
    };
});