/**
 * @file Data Manage Unit
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var SHEET_NAME_PREFIX = 'Sheet';
    var WORKBOOK_SOURCE = require('./source/workbook');
    var SHEET_SOURCE = require('./source/sheet');

    module.exports = $$.createClass('DMU', {
        data: null,

        constructor: function () {
            this.createNewWorkbook();
        },

        checkSheet: function () {
            var indexes = [];

            this.data.sheets.forEach(function (sheet, index) {
                if ($$.isDefined(sheet) && !sheet.inited) {
                    sheet.inited = true;
                    indexes.push(index);
                }
            });

            return indexes;
        },

        createNewWorkbook: function () {
            this.data = $$.clone(WORKBOOK_SOURCE);
            this.createNewSheet();

            window.tt = this.data;
            window.bs = this.data.sheets[0].style;
            window.bc = this.data.sheets[0].cell;
        },

        createNewSheet: function () {
            this.data.sheets.push($$.clone(SHEET_SOURCE));
            this.data.sheetNames.push(this.__getNextSheetName());
        },

        switchSheet: function (index) {
            this.data.active = index;
        },

        getActiveIndex: function () {
            return this.data.active;
        },

        getSheetsCount: function () {
            return this.data.sheets.length;
        },

        getActiveSheet: function () {
            return this.data.sheets[this.data.active];
        },

        getWorkbook: function () {
            return this.data;
        },

        __getNextSheetName: function () {
            var sheetNames = this.data.sheetNames;
            var name;

            for (var i = 1, limit = sheetNames.length; i <= limit; i++) {
                name = SHEET_NAME_PREFIX + 'i';

                if (sheetNames.indexOf(name) === -1) {
                    return name;
                }
            }

            return SHEET_NAME_PREFIX + (sheetNames.length + 1);
        }
    });
});