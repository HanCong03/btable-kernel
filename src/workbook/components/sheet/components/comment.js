/**
 * @file 批注组件
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var WorkbookUtils = require('workbook-utils');

    return require('utils').createClass('Comment', {
        base: require('sheet-component'),

        init: function () {
            this.__initService();
            this.__initAPI();
        },

        __initService: function () {
            this.registerService([
                'getComments'
            ]);
        },

        __initAPI: function () {
            this.registerAPI({
                setComment: this.setComment,
                clearComment: this.clearComment,
                getComment: this.getComment
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
            sheetData.comments[cid] = content;

            this.postMessage('inc.range', row, col);
        },

        clearComment: function (start, end) {
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

        getComment: function (row, col) {
            var sheetData = this.getActiveSheet();
            var cellRows = sheetData.cell.rows;

            if ($$.isNdef(cellRows[row])
                || $$.isNdef(cellRows[row].cells)
                || $$.isNdef(cellRows[row].cells[col])) {
                return null;
            }

            var currentCell = cellRows[row].cells[col];

            if ($$.isNdef(currentCell.comment)) {
                return null;
            }

            return sheetData.comments[currentCell.comment];
        },

        /**
         * 通过给定指定的行集合和列集合，获取属于这些行列的单元格的comment信息。
         * @param rows
         * @param cols
         */
        getComments: function (rows, cols) {
            var comments = {};
            var row;
            var col;
            var key;

            var sheetData = this.getActiveSheet();
            var rowsData = sheetData.cell.rows;
            var commentsData = sheetData.comments;

            var current;

            for (var i = 0, len = rows.length; i < len; i++) {
                row = rows[i];
                for (var j = 0, jlen = cols.length; j < jlen; j++) {
                    col = cols[j];

                    if (!rowsData[row] || !rowsData[row].cells || !rowsData[row].cells[col]) {
                        continue;
                    }

                    current = rowsData[row].cells[col];

                    if ($$.isNdef(current.comment)) {
                        continue;
                    }

                    key = row + ',' + col;

                    comments[key] = commentsData[current.comment];
                }
            }

            return comments;
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
            delete sheetData.comments[cid];

            CellClean.checkCell(sheetData, row, col);
        },

        __getCommentId: function () {
            var sheetData = this.getActiveSheet();
            var keys = Object.keys(sheetData.comments);

            if (keys.length === 0) {
                return 0;
            }

            return (keys[keys.length] | 0) + 1;
        }
    });
});