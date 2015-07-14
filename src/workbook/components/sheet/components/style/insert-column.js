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
        __insertColumn: function (startIndex, endIndex) {
            var dimension = this.getModule('Dimension').getDimension();

            if (dimension.min.col === -1) {
                return;
            }

            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;
            var colsData = styleData.cols;
            var count = endIndex - startIndex + 1;

            var sourceInfo;
            var newCols = [];
            newCols.length = count;

            // 处理每一行
            $$.forEach(rowsData, function (currentRow) {
                if (!currentRow.cells) {
                    return;
                }

                var cells = currentRow.cells;
                sourceInfo = cells[startIndex - 1];

                // 插入占位列
                cells.splice.apply(cells, [startIndex, 0].concat(newCols));

                // 更新占位列
                for (var j = startIndex; j <= endIndex; j++) {
                    if (sourceInfo) {
                        cells[j] = {
                            si: sourceInfo.si
                        };
                    } else {
                        delete cells[j];
                    }
                }
            });

            // 插入列样式占位
            colsData.splice.apply(colsData, [startIndex, 0].concat(newCols));
            sourceInfo = colsData[startIndex - 1];

            // 更新列样式占位
            for (var i = startIndex; i <= endIndex; i++) {
                if (sourceInfo) {
                    colsData[i] = $$.clone(sourceInfo);
                } else {
                    delete colsData[i];
                }
            }

            this.postMessage('style.dimension.change');

            // 获取更新之后的维度信息
            var dimension = this.getModule('Dimension').getDimension();

            this.postMessage('stylechange', {
                row: 0,
                col: startIndex
            }, {
                row: MAX_ROW_INDEX,
                col: MAX_COLUMN_INDEX
            });
        }
    };
});