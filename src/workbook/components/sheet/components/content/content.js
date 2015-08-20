/**
 * @file 内容组件，维护单元格内容
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var WorkbookUtils = require('../../../../utils');

    return $$.createClass('Content', {
        base: require('sheet-component'),

        mixin: [
            require('./insert-cell'),
            require('./insert-row'),
            require('./insert-column')
        ],

        init: function () {
            this.__initAPI();
            this.__initService();
            this.__initMessage();
        },

        __initAPI: function () {
            this.registerAPI({
                setContent: this.setContent,
                resetContent: this.resetContent,
                getContent: this.getContent,
                clearContent: this.clearContent,
                getContentType: this.getContentType,
                getContentInfo: this.getContentInfo,
                getFormula: this.getFormula,
                getFormulaType: this.getFormulaType,
                getFormulaInfo: this.getFormulaInfo,
                setFormula: this.setFormula,
                getContentInfoByRange: this.getContentInfoByRange,
                setArrayFormula: this.setArrayFormula,
                setContentForRange: this.setContentForRange
            });
        },

        __initService: function () {
            this.registerService([
                'getContentType',
                'clearContent'
            ]);
        },

        __initMessage: function () {
            this.onMessage({
                'insert.cell': this.__insertCell,
                'insert.row': this.__insertRow,
                'insert.column': this.__insertColumn
            });
        },

        /**
         * 向指定单元格写入内容，并且指定该内容的类型。
         * @param content 写入的内容
         * @param contentType 内容类型
         * @param row
         * @param col
         */
        setContent: function (content, contentType, row, col) {
            var sheetData = this.getActiveSheet();
            var rowsData = sheetData.cell.rows;

            if (!content) {
                this.clearContent({
                    row: row,
                    col: col
                }, {
                    row: row,
                    col: col
                });
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
            this.__removeFormula(currentCell);

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

        /**
         * 设置值和类型，但是不清除单元格的附加数据
         * @param content
         * @param contentType
         * @param row
         * @param col
         */
        resetContent: function (content, contentType, row, col) {
            var sheetData = this.getActiveSheet();
            var rowsData = sheetData.cell.rows;

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

        setContentForRange: function (contents, range) {
            var start = range.start;
            var end = range.end;
            var current;
            var sheetData = this.getActiveSheet();
            var rowsData = sheetData.cell.rows;

            for (var i = 0, row = start.row, limit = end.row; row <= limit; i++, row++) {
                for (var j = 0, col = start.col, jlimit = end.col; col <= jlimit; j++, col++) {
                    current = contents[i][j];

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

                    currentCell.value = current.value;
                    currentCell.type = current.type;
                    this.__removeFormula(currentCell);
                }
            }

            // 维度变更通知
            this.postMessage('cell.dimension.change');
            this.postMessage('contentchange', start, end);
        },

        setFormula: function (formulaText, row, col) {
            var sheetData = this.getActiveSheet();
            var rowsData = sheetData.cell.rows;

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
            var index = this.__getArrayIndex();

            this.__removeFormula(currentCell);

            currentCell.formula = formulaText;

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

        setArrayFormula: function (formulaText, row, col, start, end) {
            var sheetData = this.getActiveSheet();
            var rowsData = sheetData.cell.rows;
            var arrays = sheetData.arrays;

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
            var index = this.__getArrayIndex();

            this.__removeFormula(currentCell);

            currentCell.array = index;

            arrays[index] = {
                start: {
                    row: start.row,
                    col: start.col
                },
                end: {
                    row: end.row,
                    col: end.col
                },
                formula: formulaText
            };

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

        getFormula: function (row, col) {
            var sheetData = this.getActiveSheet();
            var rowsData = sheetData.cell.rows;

            if ($$.isNdef(rowsData[row])
                || $$.isNdef(rowsData[row].cells)
                || $$.isNdef(rowsData[row].cells[col])) {
                return null;
            }

            var currentCell = rowsData[row].cells[col];

            if ($$.isDefined(currentCell.formula)) {
                return currentCell.formula;
            }

            if ($$.isDefined(currentCell.array)) {
                return sheetData.arrays[currentCell.array].formula;
            }

            var refIndex = this.__getArrayRefIndex(row, col);

            if (refIndex === -1) {
                return null;
            }

            return sheetData.arrays[refIndex].formula;
        },

        getFormulaType: function (row, col) {
            var rowsData = this.getActiveSheet().cell.rows;

            if ($$.isNdef(rowsData[row])
                || $$.isNdef(rowsData[row].cells)
                || $$.isNdef(rowsData[row].cells[col])) {
                return null;
            }

            var currentCell = rowsData[row].cells[col];

            if ($$.isDefined(currentCell.array)) {
                return 'array';
            }

            if ($$.isDefined(currentCell.formula)) {
                return 'formula';
            }

            var refIndex = this.__getArrayRefIndex(row, col);

            if (refIndex === -1) {
                return null;
            }

            return 'array';
        },

        getFormulaInfo: function (row, col) {
            var sheetData = this.getActiveSheet();
            var rowsData = sheetData.cell.rows;

            if ($$.isNdef(rowsData[row])
                || $$.isNdef(rowsData[row].cells)
                || $$.isNdef(rowsData[row].cells[col])) {
                return null;
            }

            var currentCell = rowsData[row].cells[col];

            if ($$.isDefined(currentCell.formula)) {
                return {
                    type: 'formula',
                    value: currentCell.formula
                };
            }

            if ($$.isDefined(currentCell.array)) {
                return {
                    type: 'array',
                    value: sheetData.arrays[currentCell.array].formula
                };
            }

            /* --- 查找单元格对数组的引用索引 --- */
            var refIndex = this.__getArrayRefIndex(row, col);

            if (refIndex === -1) {
                return null;
            }

            return {
                type: 'array',
                value: sheetData.arrays[refIndex].formula
            };
        },

        getContentInfoByRange: function (start, end) {
            var result = {};
            var cellData = this.getActiveSheet().cell;
            var rowsData = cellData.rows;
            var rowKeys = Object.keys(rowsData);
            var colKeys;
            var startRow = start.row;
            var startCol = start.col;
            var endRow = end.row;
            var endCol = end.col;

            var row;
            var col;
            var cells;
            var current;

            for (var i = 0, len = rowKeys.length; i < len; i++) {
                row = +rowKeys[i];

                if (row > endRow) {
                    break;
                }

                if (row < startRow) {
                    continue;
                }

                cells = rowsData[row].cells;

                if (!cells) {
                    continue;
                }

                colKeys = Object.keys(cells);

                for (var j = 0, jlen = colKeys.length; j < jlen; j++) {
                    col = +colKeys[j];

                    if (col > endCol) {
                        break;
                    }

                    if (col < startCol) {
                        continue;
                    }

                    current = cells[col];

                    result[row + ',' + col] = {
                        row: row,
                        col: col,
                        value: current.value,
                        type: current.type
                    };
                }
            }

            return result;
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
                    this.__removeFormula(currentCell);

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
                    this.__removeFormula(currentCell);

                    this.cleanCell(i, col);
                }, this);
            }
        },

        __clearColumnContent: function (startIndex, endIndex) {
            var sheetData = this.getActiveSheet();
            var rowsData = sheetData.cell.rows;
            var currentCell;

            $$.forEach(rowsData, function (currentRow, row) {
                if ($$.isNdef(currentRow.cells)) {
                    return;
                }

                var cells = currentRow.cells;

                for (var i = startIndex; i <= endIndex; i++) {
                    currentCell = cells[i];

                    if ($$.isNdef(currentCell)) {
                        continue;
                    }

                    delete currentCell.value;
                    delete currentCell.type;
                    this.__removeFormula(currentCell);

                    this.cleanCell(row, i);
                }
            }, this);
        },

        __clearRangeContent: function (start, end) {
            var sheetData = this.getActiveSheet();
            var rowsData = sheetData.cell.rows;
            var currentRow;
            var currentCell;
            var cells;

            for (var i = start.row, limit = end.row; i <= limit; i++) {
                currentRow = rowsData[i];

                if ($$.isNdef(currentRow) || $$.isNdef(currentRow.cells)) {
                    continue;
                }

                cells = currentRow.cells;

                for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                    currentCell = cells[j];
                    if ($$.isNdef(cells[j])) {
                        continue;
                    }

                    delete currentCell.value;
                    delete currentCell.type;
                    this.__removeFormula(currentCell);

                    this.cleanCell(i, j);
                }
            }
        },

        __getArrayIndex: function () {
            var sheetData = this.getActiveSheet();
            var arrays = sheetData.arrays;
            var keys = Object.keys(arrays);

            if (keys.length === 0) {
                return 0;
            }

            var lastKey = +keys[keys.length - 1];

            if (lastKey === keys.length - 1) {
                return lastKey + 1;
            }

            for (var i = 0; i <= lastKey; i++) {
                if (keys[i] !== ('' + i)) {
                    return i;
                }
            }

            return lastKey + 1;
        },

        __removeFormula: function (data) {
            var sheetData = this.getActiveSheet();

            delete data.formula;

            if (data.array !== undefined) {
                delete sheetData.arrays[data.array];
                delete data.array;
            }
        },

        __getArrayRefIndex: function (row, col) {
            var sheetData = this.getActiveSheet();
            var arrays = sheetData.arrays;
            var current;

            for (var key in arrays) {
                if (!arrays.hasOwnProperty(key)) {
                    continue;
                }

                current = arrays[key];

                if (row >= current.start.row && row <= current.end.row
                    && col >= current.start.col && col <= current.end.col) {
                    return +key;
                }
            }

            return -1;
        }
    });
});