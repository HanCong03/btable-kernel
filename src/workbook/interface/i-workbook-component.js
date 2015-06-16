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

        getWorkbook: function () {
            return this.__$workbook.getWorkbook();
        },

        /**
         * 注：kernel组件所使用的heap是kernel heap
         * @returns {*}
         */
        getActiveHeap: function (name) {
            return this.__$workbook.getActiveKernelHeap(name);
        },

        registerService: function () {
            return this.__$workbook.registerService(this, arguments);
        },

        rs: function () {
            return this.__$workbook.rs.apply(this.__$workbook, arguments);
        },

        registerAPI: function () {
            return this.__$workbook.registerAPI(this, arguments);
        },

        onMessage: function () {
            return this.__$workbook.onMessage(this, arguments);
        },

        postMessage: function () {
            return this.__$workbook.postMessage.apply(this.__$workbook, arguments);
        }
    });
});