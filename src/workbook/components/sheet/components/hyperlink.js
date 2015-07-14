/**
 * @file 超链接组件
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var WorkbookUtils = require('workbook-utils');

    return require('utils').createClass('Hyperlink', {
        base: require('sheet-component'),

        init: function () {
            this.__initService();
            this.__initAPI();
        },

        __initService: function () {
            this.registerService([
                'getHyperlinks'
            ]);
        },

        __initAPI: function () {
            this.registerAPI({
                setHyperlink: this.setHyperlink,
                clearHyperlink: this.clearHyperlink,
                getHyperlink: this.getHyperlink
            });
        },

        /**
         * 向指定单元格设置链接。
         * @param link 链接地址
         * @param row
         * @param col
         */
        setHyperlink: function (link, row, col) {
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
                cid = currentCell.hyperlink;
            } else {
                cid = this.__getHyperlinkId();
            }

            currentCell.hyperlink = cid;
            sheetData.hyperlinks[cid] = link;

            this.postMessage('cell.dimension.change');
        },

        clearHyperlink: function (start, end) {
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

            this.postMessage('cell.dimension.change');
        },

        getHyperlink: function (row, col) {
            var sheetData = this.getActiveSheet();
            var cellRows = sheetData.cell.rows;

            if ($$.isNdef(cellRows[row])
                || $$.isNdef(cellRows[row].cells)
                || $$.isNdef(cellRows[row].cells[col])) {
                return null;
            }

            var currentCell = cellRows[row].cells[col];

            if ($$.isNdef(currentCell.hyperlink)) {
                return null;
            }

            return sheetData.hyperlinks[currentCell.hyperlink];
        },

        /**
         * 通过给定指定的行集合和列集合，获取属于这些行列的单元格的hyperlink信息。
         * @param rows
         * @param cols
         */
        getHyperlinks: function (rows, cols) {
            var hyperlinks = {};
            var row;
            var col;
            var key;

            var sheetData = this.getActiveSheet();
            var rowsData = sheetData.cell.rows;
            var hyperlinksData = sheetData.hyperlinks;

            var current;

            for (var i = 0, len = rows.length; i < len; i++) {
                row = rows[i];
                for (var j = 0, jlen = cols.length; j < jlen; j++) {
                    col = cols[j];

                    if (!rowsData[row] || !rowsData[row].cells || !rowsData[row].cells[col]) {
                        continue;
                    }

                    current = rowsData[row].cells[col];

                    if ($$.isNdef(current.hyperlink)) {
                        continue;
                    }

                    key = row + ',' + col;

                    hyperlinks[key] = hyperlinksData[current.hyperlink];
                }
            }

            return hyperlinks;
        },

        __clearAll: function () {
            var sheetData = this.getActiveSheet();
            var cellRows = sheetData.cell.rows;

            cellRows.forEach(function (currentRow, rowIndex) {
                if ($$.isNdef(currentRow.cells)) {
                    return;
                }

                currentRow.cells.forEach(function (currentCell, colIndex) {
                    delete currentCell.hyperlink;

                    this.cleanCell(rowIndex, colIndex);
                });
            });

            // 清空批注
            sheetData.hyperlinks = {};
        },

        __clearRow: function (startIndex, endIndex) {
            var sheetData = this.getActiveSheet();
            var rowsData = sheetData.cell.rows;

            for (var i = startIndex; i <= endIndex; i++) {
                if ($$.isNdef(rowsData[i]) || $$.isNdef(rowsData[i].cells)) {
                    continue;
                }

                rowsData[i].cells.forEach(function (currentCell, col) {
                    delete currentCell.hyperlink;

                    this.cleanCell(i, col);
                }, this);
            }
        },

        __clearColumn: function (startIndex, endIndex) {
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

                    delete cells[i].hyperlink;

                    this.cleanCell(row, i);
                }
            }, this);
        },

        __clearRange: function (start, end) {
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

                    delete cells[j].hyperlink;

                    this.cleanCell(i, j);
                }
            }
        },

        __getHyperlinkId: function () {
            var sheetData = this.getActiveSheet();
            var keys = Object.keys(sheetData.hyperlinks);

            if (keys.length === 0) {
                return 0;
            }

            return (keys[keys.length] | 0) + 1;
        }
    });
});