/**
 * @file 格式刷组件
 * @author hancong03@baiud.com
 */

// TODO 格式刷功能受数据影响较大。留待未来处理。

define(function (require) {
    var $$ = require('utils');
    var WorkbookUtils = require('workbook-utils');

    return require('utils').createClass('FormatBrush', {
        base: require('sheet-component'),

        mixin: [
            require('../common/style'),
            require('./all')
        ],

        init: function () {
            this.__initAPI();
        },

        __initAPI: function () {
            this.registerAPI({
                brush: this.brush
            });
        },

        brush: function (fromRange, toRange) {
            var start = fromRange.start;
            var end = fromRange.end;
            var fromRangeType = WorkbookUtils.getRangeType(start, end);

            switch (fromRangeType) {
                case 'all':
                    this.__brushFromAll(toRange);
                    break;

                case 'col':
                    this.__brushFromColumn(start.col, end.col, toRange);
                    break;

                case 'row':
                    this.__brushFromRow(start.row, end.row, toRange);
                    break;

                case 'range':
                    this.__brushFromRange(start, end, toRange);
                    break;
            }
        },

        __checkOverlap: function (range1, range2) {
            var startRow1 = range1.start.row;
            var startCol1 = range1.start.col;
            var startRow2 = range2.start.row;
            var startCol2 = range2.start.col;
            var endRow1 = range1.end.row;
            var endCol1 = range1.end.col;
            var endRow2 = range2.end.row;
            var endCol2 = range2.end.col;
        }
    });
});