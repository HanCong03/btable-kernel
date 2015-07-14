/**
 * @file 对插入行操作的样式处理
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');

    var WORKBOOK_CONFIG = require('../../../../config');
    var MAX_ROW_INDEX = WORKBOOK_CONFIG.MAX_ROW - 1;
    var MAX_COLUMN_INDEX = WORKBOOK_CONFIG.MAX_COLUMN - 1;

    return {
        __insertRow: function (startIndex, endIndex) {
            var dimension = this.getModule('Dimension').getDimension();

            if (dimension.min.row === -1) {
                return;
            }

            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;
            var count = endIndex - startIndex + 1;

            var sourceInfo = rowsData[startIndex - 1];

            var newRows = [];
            newRows.length = count;

            // 插入占位行
            rowsData.splice.apply(rowsData, [startIndex, 0].concat(newRows));

            // 更新占位行
            for (var i = startIndex; i <= endIndex; i++) {
                if (sourceInfo) {
                    rowsData[i] = $$.clone(sourceInfo);
                } else {
                    delete rowsData[i];
                }
            }

            this.postMessage('style.dimension.change');

            this.postMessage('stylechange', {
                row: startIndex,
                col: 0
            }, {
                row: MAX_ROW_INDEX,
                col: MAX_COLUMN_INDEX
            });
        }
    };
});