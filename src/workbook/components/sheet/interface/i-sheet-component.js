/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    // createClass 的继承有bug
    return require('utils').createClass('ISheetComponent', {
        __$workbook: null,
        __$sheet: null,

        constructor: function (workbook, sheet) {
            this.__$workbook = workbook;
            this.__$sheet = sheet;
            this.init();
        },

        init: function () {},

        getActiveSheetIndex: function () {
            return this.__$workbook.getActiveSheetIndex();
        },

        getActiveSheet: function () {
            return this.__$workbook.getActiveSheet();
        },

        getWorkbook: function () {
            return this.__$workbook.getWorkbook();
        },

        getConfig: function (key) {
            return this.__$workbook.getConfig(key);
        },

        /**
         * 注：kernel组件所使用的heap是kernel heap
         * @returns {*}
         */
        getActiveHeap: function (name) {
            return this.__$workbook.getActiveKernelHeap(name);
        },

        registerService: function () {
            var args = [].slice.call(arguments, 0);
            args.unshift(this);

            return this.__$workbook.registerService.apply(this.__$workbook, args);
        },

        getModule: function (name) {
            return this.__$workbook.getModule(name);
        },

        registerAPI: function () {
            var args = [].slice.call(arguments, 0);
            args.unshift(this);

            return this.__$workbook.registerAPI.apply(this.__$workbook, args);
        },

        onMessage: function () {
            var args = [].slice.call(arguments, 0);
            args.unshift(this);

            return this.__$workbook.onMessage.apply(this.__$workbook, args);
        },

        postMessage: function () {
            return this.__$workbook.postMessage.apply(this.__$workbook, arguments);
        },

        cleanCell: function (row, col) {
            this.__$sheet.cleanCell(row, col);
        },

        cleanRow: function (row) {
            this.__$sheet.cleanRow(row);
        },

        cleanColumn: function (col) {
            this.__$sheet.cleanColumn(col);
        },

        cleanCellStyle: function (row, col) {
            this.__$sheet.cleanCellStyle(row, col);
        },

        cleanRowStyle: function (row) {
            this.__$sheet.cleanRowStyle(row);
        },

        cleanColumnStyle: function (col) {
            this.__$sheet.cleanColumnStyle(col);
        },

        createComponent: function (clazz) {
            return new clazz(this.__$workbook, this.__$sheet);
        }
    });
});