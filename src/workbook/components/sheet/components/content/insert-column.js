/**
 * @file 内容组件，维护单元格内容
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var WORKBOOK_CONFIG = require('../../../../config');
    var MAX_ROW_INDEX = WORKBOOK_CONFIG.MAX_ROW - 1;
    var MAX_COLUMN_INDEX = WORKBOOK_CONFIG.MAX_COLUMN - 1;

    module.exports = {
        __insertColumn: function (startIndex, endIndex) {
            var cellData = this.getActiveSheet().cell;
            var rowsData = cellData.rows;

            var newCols = [];
            newCols.length = endIndex - startIndex + 1;

            // 为每一行插入新列
            $$.forEach(rowsData, function (currentRow) {
                if (!currentRow.cells) {
                    return;
                }

                var cells = currentRow.cells;

                // 插入新列
                cells.splice.apply(cells, [startIndex, 0].concat(newCols));

                // 删除新列
                for (var j = startIndex; j <= endIndex; j++) {
                    delete cells[j];
                }
            });

            this.postMessage('content.dimension.change');

            var dimension = this.getModule('Dimension').getDimension();

            this.postMessage('contentchange', {
                row: 0,
                col: startIndex
            }, {
                row: MAX_ROW_INDEX,
                col: MAX_COLUMN_INDEX
            });
        }
    };
});