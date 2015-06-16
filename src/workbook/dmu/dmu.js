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

        createNewWorkbook: function () {
            this.data = $$.clone(WORKBOOK_SOURCE);
            this.createNewSheet();
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

        getActiveSheet: function () {
            return this.data.sheets[this.data.active];
        },

        getWorkbookData: function () {
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