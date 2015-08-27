/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = {
        import: function (data) {
            if (typeof data === 'string') {
                data = JSON.parse(data);
            } else {
                data = $$.clone(data);
            }

            data.heap = {};
            data.sheets = this.__importSheets(data.sheets);

            this.data = data;
        },

        __importSheets: function (data) {
            var current;

            for (var i = 0, len = data.length; i < len; i++) {
                current = data[i];
                current.cell = mapToArray(current.cell);
                current.style = mapToArray(current.style);
                current.heap = {
                    kernel: {},
                    other: {},
                };
            }

            return data;
        }
    };

    function mapToArray(data) {
        var rows = data.rows;
        var cols = data.cols;

        var targetRows = [];
        var targetCols = [];

        var keys = Object.keys(cols);
        var key;

        for (var i = 0, len = keys.length; i < len; i++) {
            key = +keys[i];
            targetCols[key] = cols[key];
        }

        keys = Object.keys(rows);

        for (var i = 0, len = keys.length; i < len; i++) {
            key = +keys[i];
            targetRows[key] = parseRow(rows[key]);
        }

        data.rows = targetRows;
        data.cols = targetCols;

        return data;
    }

    function parseRow(rowData) {
        var cells = rowData.cells;

        if (!cells) {
            return rowData;
        }

        var result = [];

        var keys = Object.keys(cells);
        var key;

        for (var i = 0, len = keys.length; i < len; i++) {
            key = +keys[i];
            result[key] = cells[key];
        }

        rowData.cells = result;

        return rowData;
    }
});