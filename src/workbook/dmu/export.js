/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = {
        export: function () {
            var workbookData = this.__exportWorkbook();
            workbookData.sheets = this.__exportSheets();

            return JSON.stringify(workbookData);
        },

        __exportWorkbook: function () {
            var data = this.data;
            var result = {};

            for (var key in data) {
                if (!data.hasOwnProperty(key)) {
                    continue;
                }

                if (key === 'heap' || key === 'sheets') {
                    continue;
                }

                result[key] = data[key];
            }

            return result;
        },

        __exportSheets: function () {
            var data = this.data;
            var sheets = data.sheets;
            var result = [];
            var currentResult;
            var currentSheet;

            for (var i = 0, len = sheets.length; i < len; i++) {
                currentSheet = sheets[i];
                currentResult = this.__getSheetData(currentSheet);

                currentResult.cell = arrayToMap(currentResult.cell);
                currentResult.style = arrayToMap(currentResult.style);

                result[i] = $$.clone(currentResult);
                // 删除初始化标记
                delete result[i].inited;
            }

            return result;
        },

        __getSheetData: function (sheetData) {
            var result = {};

            for (var key in sheetData) {
                if (!sheetData.hasOwnProperty(key) || key === 'heap') {
                    continue;
                }

                result[key] = sheetData[key];
            }

            return result;
        }
    };

    function arrayToMap(data) {
        var result = {};

        for (var key in data) {
            if (!data.hasOwnProperty(key)) {
                continue;
            }

            result[key] = data[key];
        }

        var rows = data.rows;
        var cols = data.cols;

        var targetRows = {};
        var targetCols = {};

        var keys = Object.keys(cols);
        var key;

        for (var i = 0, len = keys.length; i < len; i++) {
            key = keys[i];
            targetCols[key] = cols[key];
        }

        keys = Object.keys(rows);

        for (var i = 0, len = keys.length; i < len; i++) {
            key = keys[i];
            targetRows[key] = parseRow(rows[key]);
        }

        result.rows = targetRows;
        result.cols = targetCols;

        return result;
    }

    function parseRow(data) {
        var cells = data.cells;

        if (!cells) {
            return data;
        }

        var keys = Object.keys(cells);
        var result = {};
        var key;

        for (var i = 0, len = keys.length; i < len; i++) {
            key = keys[i];
            result[key] = cells[key];
        }

        var tmp = {};

        for (var key in data) {
            if (!data.hasOwnProperty(key)) {
                continue;
            }

            tmp[key] = data[key];
        }

        tmp.cells = result;
        return tmp;
    }
});