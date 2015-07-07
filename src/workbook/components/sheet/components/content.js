/**
 * @file 内容组件，维护单元格内容
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var WorkbookUtils = require('workbook-utils');

    return $$.createClass('Content', {
        base: require('sheet-component'),

        init: function () {
            this.__initAPI();
            this.__initService();
        },

        __initAPI: function () {
            this.registerAPI({
                setContent: this.setContent,
                getContent: this.getContent,
                clearContent: this.clearContent,
                getContentType: this.getContentType,
                getContentInfo: this.getContentInfo
            });
        },

        __initService: function () {
            this.registerService([
                'getContentType',
                'clearContent'
            ]);
        },

        /**
         * 向指定单元格写入内容，并且指定该内容的类型。
         * @param content 写入的内容
         * @param contentType 内容类型
         * @param row
         * @param col
         */
        setContent: function (content, contentType, row, col) {
            var rowsData = this.getActiveSheet().cell.rows;

            if (!content) {
                this.clearContent(row, col);
                return;
            }

            if ($$.isNdef(rowsData[row])) {
                rowsData[row] = {
                    cells: []
                };
            }

            if ($$.isNdef(rowsData[row].cells)) {
                rowsData[row].cells = [];
            }

            if ($$.isNdef(rowsData[row].cells[col])) {
                rowsData[row].cells[col] = {};
            }

            var currentCell = rowsData[row].cells[col];

            currentCell.value = content;
            currentCell.type = contentType;

            // 维度变更通知
            this.postMessage('cell.dimension.change');

            this.postMessage('contentchange', {
                row: row,
                col: col
            }, {
                row: row,
                col: col
            });
        },

        getContent: function (row, col) {
            var rowsData = this.getActiveSheet().cell.rows;

            if ($$.isNdef(rowsData[row])
                || $$.isNdef(rowsData[row].cells)
                || $$.isNdef(rowsData[row].cells[col])) {
                return null;
            }

            return rowsData[row].cells[col].value || null;
        },

        getContentType: function (row, col) {
            var rowsData = this.getActiveSheet().cell.rows;

            if ($$.isNdef(rowsData[row])
                || $$.isNdef(rowsData[row].cells)
                || $$.isNdef(rowsData[row].cells[col])) {
                return null;
            }

            return rowsData[row].cells[col].type || null;
        },

        getContentInfo: function (row, col) {
            var rowsData = this.getActiveSheet().cell.rows;

            if ($$.isNdef(rowsData[row])
                || $$.isNdef(rowsData[row].cells)
                || $$.isNdef(rowsData[row].cells[col])) {
                return null;
            }

            if ($$.isNdef(rowsData[row].cells[col].value)) {
                return null;
            }

            return {
                type: rowsData[row].cells[col].type,
                value: rowsData[row].cells[col].value
            };
        },

        /**
         * 清除指定行列的内容，该操作会同时清空指定行列的类型。
         * @param row
         * @param col
         */
        clearContent: function (start, end) {
            var rangeType = WorkbookUtils.getRangeType(start, end);

            switch (rangeType) {
                case 'all':
                    this.__clearAllContent();
                    break;

                case 'col':
                    this.__clearColumnContent(start.col, end.col);
                    break;

                case 'row':
                    this.__clearRowContent(start.row, end.row);
                    break;

                case 'range':
                    this.__clearRangeContent(start, end);
                    break;
            }

            // 维度变更通知
            this.postMessage('cell.dimension.change');

            this.postMessage('contentchange', start, end);
        },

        __clearAllContent: function () {
            var sheetData = this.getActiveSheet();
            var rowsData = sheetData.cell.rows;

            rowsData.forEach(function (currentRow, row) {
                if ($$.isNdef(currentRow.cells)) {
                    this.cleanRow(row);
                    return;
                }

                currentRow.cells.forEach(function (currentCell, col) {
                    delete currentCell.value;
                    delete currentCell.type;

                    this.cleanCell(row, col);
                }, this);
            }, this);
        },

        __clearRowContent: function (startIndex, endIndex) {
            var sheetData = this.getActiveSheet();
            var rowsData = sheetData.cell.rows;

            for (var i = startIndex; i <= endIndex; i++) {
                if ($$.isNdef(rowsData[i]) || $$.isNdef(rowsData[i].cells)) {
                    continue;
                }

                rowsData[i].cells.forEach(function (currentCell, col) {
                    delete currentCell.value;
                    delete currentCell.type;

                    this.cleanCell(i, col);
                }, this);
            }
        },

        __clearColumnContent: function (startIndex, endIndex) {
            var sheetData = this.getActiveSheet();
            var rowsData = sheetData.cell.rows;

            $$.forEach(rowsData, function (currentRow, row) {
                if ($$.isNdef(currentRow.cells)) {
                    return;
                }

                var cells = currentRow.cells;

                for (var i = startIndex; i <= endIndex; i++) {
                    if ($$.isNdef(cells[i])) {
                        continue;
                    }

                    delete cells[i].value;
                    delete cells[i].type;

                    this.cleanCell(row, i);
                }
            }, this);
        },

        __clearRangeContent: function (start, end) {
            var sheetData = this.getActiveSheet();
            var rowsData = sheetData.cell.rows;
            var currentRow;
            var cells;

            for (var i = start.row, limit = end.row; i <= limit; i++) {
                currentRow = rowsData[i];

                if ($$.isNdef(currentRow) || $$.isNdef(currentRow.cells)) {
                    continue;
                }

                cells = currentRow.cells;

                for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                    if ($$.isNdef(cells[j])) {
                        continue;
                    }

                    delete cells[j].value;
                    delete cells[j].type;

                    this.cleanCell(i, j);
                }
            }
        }
    });
});