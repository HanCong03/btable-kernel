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

        insertCell: function (position, start, end) {
            var rangeType = WorkbookUtils.getRangeType(start, end);

            switch (rangeType) {
                case 'all':
                    // nothing
                    return;

                case 'col':
                    this.insertColumn(start.col, end.col);
                    break;

                case 'row':
                    this.insertRow(start.row, end.row);
                    break;

                case 'range':
                    // before消息保证MergeCell模块能够优先处理插入单元格。
                    this.postMessage('insert.cell.before', 'position', start, end);
                    this.postMessage('insert.cell', position, start, end);
                    break;
            }
        },

        insertRow: function (position, row) {

        },

        insertColumn: function (position, col) {}
    });
});