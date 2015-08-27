/**
 * @file 复制移动组件。
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var WorkbookUtil = require('../../../utils');

    return $$.createClass('Copy', {
        base: require('sheet-component'),

        init: function () {
            this.registerAPI({
                copy: this.__copy
            });
        },

        copy: function (fromRange, toRange) {
            var rangeType = WorkbookUtil.getRangeClassify(fromRange);

            switch (rangeType) {
                case 'cell':
                    return this.__cellMoveToRange({
                        row: fromRange.start.row,
                        col: fromRange.start.col
                    }, toRange);

                case 'row':
                    return this.__rowMoveToRange(fromRange.start.row, toRange);

                case 'column':
                    return this.__columnMoveToRange(fromRange.start.col, toRange);

                case 'range':
                    return this.__rangeMoveToRange(fromRange, toRange);
            }
        }
    });
});