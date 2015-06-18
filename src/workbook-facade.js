/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var Workbook = require('./workbook/workbook');
    var Commander = require('./commander/commander');

    return $$.createClass('WorkbookFacade', {
        __$workbook: null,
        __$commander: null,

        constructor: function (config) {
            this.__$workbook = new Workbook(this, config);
            this.__$commander = new Commander(this.__$workbook.getAPI());
        },

        execCommand: function (command) {
            return this.__$commander.exec.apply(this.__$commander, arguments);
        },

        queryCommandValue: function (command) {
            return this.__$commander.queryValue.apply(this.__$commander, arguments);
        },

        queryCommandSupportExec: function (command) {
            return this.__$commander.querySupportExec(command);
        },

        queryCommandSupportQuery: function (command) {
            return this.__$commander.querySupportQuery(command);
        },

        getActiveHeap: function (name) {
            return this.__$workbook.getActiveHeap(name);
        },

        on: function (provider, args) {
            return this.__$workbook.onMessage(provider, args);
        }
    });
});