/**
 * @file 批注组件
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var WorkbookUtils = require('workbook-utils');

    return require('base/clazz').create('Comment', {
        base: require('sheet-component'),

        init: function () {
            this.registerAPI({
                setComment: this.setComment,
                removeComment: this.removeComment
            });
        },

        /**
         * 向指定单元格写入内容，并且指定该内容的类型。
         * @param content 写入的内容
         * @param contentType 内容类型
         * @param row
         * @param col
         */
        setComment: function (content, row, col) {
            var sheetData = this.getActiveSheet();
            var cellRows = sheetData.cell.rows;

            if ($$.isNdef(cellRows[row])) {
                cellRows[row] = {
                    cells: []
                };
            }

            if ($$.isNdef(cellRows[row].cells)) {
                cellRows[row].cells = [];
            }

            if ($$.isNdef(cellRows[row].cells[col])) {
                cellRows[row].cells[col] = {};
            }

            var currentCell = cellRows[row].cells[col];
            var cid;

            if ($$.isDefined(currentCell.comment)) {
                cid = currentCell.comment;
            } else {
                cid = this.__getCommentId();
            }

            currentCell.comment = cid;
            sheetData.comment[cid] = content;

            this.postMessage('inc.range', row, col);
        },

        removeComment: function (start, end) {
            var rangeType = WorkbookUtils.getRangeType(start, end);

            switch (rangeType) {
                case 'all':
                    this.__clearAll();
                    break;

                case 'col':
                    this.__clearColumn(start.col, end.col);
                    break;

                case 'row':
                    this.__clearRow(start.row, end.row);
                    break;

                case 'range':
                    this.__clearRange(start, end);
                    break;
            }
        },

        __clearAll: function () {
            var sheetData = this.getActiveSheet();
            var cellRows = sheetData.cell.rows;

            cellRows.forEach(function (currentRow, rowIndex) {
                if ($$.isNdef(currentRow.cells)) {
                    return;
                }

                currentRow.cells.forEach(function (currentCell, colIndex) {
                    delete currentCell.comment;
                    CellClean.checkCell(sheetData, rowIndex, colIndex);
                });
            });

            // 清空批注
            sheetData.comment = {};

            this.postMessage('dec.all');
        },

        __clearRow: function (startIndex, endIndex) {
            var sheetData = this.getActiveSheet();
            var dimension = sheetData.dimension;

            for (var i = startIndex; i <= endIndex; i++) {
                for (var j = dimension.min.col, jlimit = dimension.max.col; j <= jlimit; j++) {
                    this.__clear(i, j);
                }
            }

            this.postMessage('dec.row', startIndex, endIndex);
        },

        __clearColumn: function (startIndex, endIndex) {
            var sheetData = this.getActiveSheet();
            var dimension = sheetData.dimension;

            for (var i = startIndex; i <= endIndex; i++) {
                for (var j = dimension.min.row, jlimit = dimension.max.row; j <= jlimit; j++) {
                    this.__clear(j, i);
                }
            }

            this.postMessage('dec.column', startIndex, endIndex);
        },

        __clearRange: function (start, end) {
            for (var i = start.row, limit = end.row; i <= limit; i++) {
                for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                    this.__clear(i, j);
                }
            }

            this.postMessage('dec.range', start, end);
        },

        __clear: function (row, col) {
            var sheetData = this.getActiveSheet();
            var cellRows = sheetData.cell.rows;

            if ($$.isNdef(cellRows[row])
                || $$.isNdef(cellRows[row].cells)
                || $$.isNdef(cellRows[row].cells[col])) {
                return;
            }

            var currentCell = cellRows[row].cells[col];

            if ($$.isNdef(currentCell.comment)) {
                return;
            }

            var cid = currentCell.comment;

            delete currentCell.comment;
            delete sheetData.comment[cid];

            CellClean.checkCell(sheetData, row, col);
        },

        __getCommentId: function () {
            var sheetData = this.getActiveSheet();
            var keys = Object.keys(sheetData.comment);

            if (keys.length === 0) {
                return 0;
            }

            return (keys[keys.length] | 0) + 1;
        }
    });
});