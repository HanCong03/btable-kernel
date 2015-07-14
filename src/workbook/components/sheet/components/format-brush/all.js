/**
 * @file 格式刷处理器：从全选到到指定区域
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var WorkbookUtils = require('workbook-utils');
    var WORKBOOK_CONFIG = require('../../../../config');
    var MAX_COLUMN_INDEX = WORKBOOK_CONFIG.MAX_COLUMN - 1;
    var MAX_ROW_INDEX = WORKBOOK_CONFIG.MAX_ROW - 1;

    return {
        __brushFromAll: function (toRange) {
            var start = toRange.start;
            var end = toRange.end;
            var toRangeType = WorkbookUtils.getRangeType(start, end);

            switch (toRangeType) {
                case 'all':
                    return true;

                case 'col':
                    return this.__allToColumn(start.col, end.col);

                case 'row':
                    return this.__brushFromRow(start.row, end.row, toRange);

                case 'range':
                    return this.__brushFromRange(start, end, toRange);
            }

        },

        __allToColumn: function (startIndex, endIndex) {
            // 起始列为0，则不用处理，因为无数据改变
            if (startIndex !== 0) {
                this.__allToColumnStyle(startIndex, endIndex);
                this.__allToColumnCell(startIndex, endIndex);
            }

            this.postMessage('all.dimension.change');
            this.postMessage('stylechange', {
                row: 0,
                col: startIndex
            }, {
                row: MAX_ROW_INDEX,
                col: endIndex
            });

            this.postMessage('contentchange', {
                row: 0,
                col: startIndex
            }, {
                row: MAX_ROW_INDEX,
                col: endIndex
            });

            return true;
        },

        __allToColumnStyle: function (startIndex, endIndex) {
            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;
            var colsData = styleData.cols;

            var index = endIndex - startIndex;

            // 后序覆盖
            for (var i = endIndex, idx = index; i >= startIndex; i--, idx--) {
                // 处理列样式
                if (colsData[idx]) {
                    colsData[i] = $$.clone(colsData[idx]);
                } else {
                    delete colsData[i];
                }


                // 处理独立单元格样式
                $$.forEach(rowsData, function (currentRow) {
                    var cells = currentRow.cells;

                    if (!cells) {
                        return;
                    }

                    if (cells[idx]) {
                        cells[i] = $$.clone(cells[idx]);
                    } else {
                        delete cells[i];
                    }
                });
            }
        },

        __allToColumnCell: function (startIndex, endIndex) {
            var cellData = this.getActiveSheet().cell;
            var colsData = cellData.cols;

            var index = endIndex - startIndex;

            // 后序覆盖
            for (var i = endIndex, idx = index; i >= startIndex; i--, idx--) {
                // 处理单元格列
                if (colsData[idx]) {
                    colsData[i] = $$.clone(colsData[idx]);
                } else {
                    delete colsData[i];
                }
            }
        }
    };
});