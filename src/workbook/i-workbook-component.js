/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('IWorkbookComponent', {
        __$workbook: null,

        constructor: function (workbook) {
            this.__$workbook = workbook;
            this.init();
        },

        init: function () {},

        getActiveSheetIndex: function () {
            return this.__$workbook.getActiveSheetIndex();
        },

        getActiveSheet: function () {
            return this.__$workbook.getActiveSheet();
        },

        getWorkbookData: function () {
            return this.__$workbook.getWorkbookData();
        },

        registerService: function () {
            return this.__$workbook.registerService.apply(this.__$workbook, arguments);
        },

        rs: function () {
            return this.__$workbook.rs.apply(this.__$workbook, arguments);
        },

        onMessage: function () {
            return this.__$workbook.onMessage.apply(this.__$workbook, arguments);
        },

        postMessage: function () {
            return this.__$workbook.postMessage.apply(this.__$workbook, arguments);
        }
    });
});