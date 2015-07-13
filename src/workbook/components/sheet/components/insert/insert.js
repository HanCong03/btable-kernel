/**
 * @file 插入单元格、行列组件
 * @author hancong03@baiud.com
 */

define(function (require) {
    var WorkbookUtils = require('workbook-utils');

    return require('utils').createClass('Comment', {
        base: require('sheet-component'),

        init: function () {
            this.__initAPI();
        },

        __initAPI: function () {
            this.registerAPI({
                insertCell: this.insertCell,
                insertRow: this.insertRow,
                insertColumn: this.insertColumn
            });
        },

        insertCell: function (position, start, end) {
            var rangeType = WorkbookUtils.getRangeType(start, end);

            switch (rangeType) {
                case 'all':
                    // nothing
                    return;

                case 'col':
                    this.insertColumn(start, end);
                    break;

                case 'row':
                    this.insertRow(start, end);
                    break;

                case 'range':
                    // before消息保证MergeCell模块能够优先处理插入单元格。
                    this.postMessage('insert.cell.before', 'position', start, end);
                    this.postMessage('insert.cell', position, start, end);
                    break;
            }
        },

        insertRow: function (start, end) {
            var startIndex = start.row;
            var endIndex = end.row;

            this.postMessage('insert.row', startIndex, endIndex);
            // 行列插入触发的是after操作，方便MergeCell模块处理合并单元格。
            this.postMessage('insert.row.after', startIndex, endIndex);
        },

        insertColumn: function (start, end) {
            var startIndex = start.col;
            var endIndex = end.col;

            this.postMessage('insert.column', startIndex, endIndex);
            // 行列插入触发的是after操作，方便MergeCell模块处理合并单元格。
            this.postMessage('insert.column.after', startIndex, endIndex);
        }
    });
});