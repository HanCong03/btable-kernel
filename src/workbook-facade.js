/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var Workbook = require('./workbook/workbook');

    return $$.createClass('WorkbookFacade', {
        __$workbook: null,

        constructor: function (config) {
            this.__$workbook = new Workbook(this, config);
        },

        getAPI: function () {
            return this.__$workbook.__$apis;
        },

        getActiveHeap: function (name) {
            return this.__$workbook.getActiveHeap(name);
        },

        getWorkbookHeap: function (name) {
            return this.__$workbook.getWorkbookHeap(name);
        },

        on: function (provider, args) {
            return this.__$workbook.onMessage(provider, args);
        },

        ready: function () {
            this.__$workbook.__ready();
        }
    });
});