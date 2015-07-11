/**
 * @file 插入单元格、行列组件
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var WorkbookUtils = require('workbook-utils');

    return require('utils').createClass('Comment', {
        base: require('sheet-component'),

        init: function () {
            this.__initAPI();
        },

        __initAPI: function () {
            this.registerAPI({
                insertCell: this.insertCell
            });
        },

        insertCell: function (position, row, col) {
            this.postMessage('insert.cell', position, row, col);
        },

        insertRow: function (position, row) {

        },

        insertColumn: function (position, col) {}
    });
});