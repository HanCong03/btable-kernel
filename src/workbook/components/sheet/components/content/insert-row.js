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
        __insertRow: function (startIndex, endIndex) {
            var cellData = this.getActiveSheet().cell;
            var rowsData = cellData.rows;

            var newRows = [];
            newRows.length = endIndex - startIndex + 1;

            // 插入新行
            rowsData.splice.apply(rowsData, [startIndex, 0].concat(newRows));

            // 清空新行数据
            for (var i = startIndex; i <= endIndex; i++) {
                delete rowsData[i];
            }

            this.postMessage('content.dimension.change');
            this.postMessage('contentchange', {
                row: startIndex,
                col: 0
            }, {
                row: MAX_ROW_INDEX,
                col: MAX_COLUMN_INDEX
            });
        }
    };
});