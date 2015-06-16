/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('base/clazz').create('ISheetComponent', {

        __$cleaner: null,

        base: require('../../../interface/i-workbook-component'),

        constructor: function (workbook, cleaner) {
            this.__$cleaner = cleaner;
        },

        cleanCell: function (row, col) {
            this.__$cleaner.cleanCell(row, col);
        },

        cleanRow: function (row) {
            this.__$cleaner.cleanRow(row);
        },

        cleanColumn: function (col) {
            this.__$cleaner.cleanColumn(col);
        },

        cleanCellStyle: function (row, col) {
            this.__$cleaner.cleanCellStyle(row, col);
        },

        cleanRowStyle: function (row) {
            this.__$cleaner.cleanRowStyle(row);
        },

        cleanColumnStyle: function (col) {
            this.__$cleaner.cleanColumnStyle(col);
        },

        createComponent: function (clazz) {
            return new clazz(this.__$workbook, this.__$cleaner);
        }
    });
});