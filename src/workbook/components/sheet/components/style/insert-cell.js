/**
 * @file 获取原始样式数据
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');

    var WORKBOOK_CONFIG = require('../../../../config');

    var MAX_COLUMN_INDEX = WORKBOOK_CONFIG.MAX_COLUMN - 1;
    var MAX_ROW_INDEX = WORKBOOK_CONFIG.MAX_ROW - 1;

    return {
        __insertCell: function (position, row, col) {
            if (position === 'top') {
                this.__insertTopCell(row, col);
            } else {
                this.__insertLeftCell(row, col);
            }
        },

        __insertTopCell: function (row, col) {
            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;
            var dimension = this.getModule('Dimension').getDimension();
            var max = dimension.max;

            var currentRow;
            var preveSid;

            for (var i = max.row + 1; i >= row; i--) {
                preveSid = this.getCellSid(i - 1, col);

                if (!rowsData[i]) {
                    rowsData[i] = {};
                }

                currentRow = rowsData[i];

                if ($$.isNdef(currentRow.cells)) {
                    currentRow.cells = [];
                }

                currentRow.cells[col] = {};

                if (preveSid) {
                    currentRow.cells[col].si = preveSid;
                }
            }

            if (!rowsData[row]) {
                rowsData[row] = {};
            }

            if (!rowsData[row].cells) {
                rowsData[row].cells = [];
            }

            rowsData[row].cells[col] = {};

            this.postMessage('style.dimension.change');
            this.postMessage('stylechange', {
                row: 0,
                col: col
            }, {
                row: MAX_ROW_INDEX,
                col: col
            });
        },

        __insertLeftCell: function () {}
    };
});