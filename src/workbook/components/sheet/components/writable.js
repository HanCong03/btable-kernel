/**
 * @file 提供查询接口，查看给定的区域是否可以写入内容
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');

    return $$.createClass('Writable', {
        base: require('sheet-component'),

        init: function () {
            this.registerAPI({
                isWritable: this.isWritable
            });
        },

        isWritable: function (start, end) {
            var sheetData = this.getActiveSheet();
            var dimension = sheetData.dimension;
            var startRow = start.row;
            var endRow = end.row;
            var startCol = start.col;
            var endCol = end.col;

            if (startRow <= dimension.row && startCol <= dimension.col
                && endRow >= dimension.row && endCol >= dimension.col) {
                return true;
            }

            var arrays = sheetData.arrays;
            var keys = Object.keys(arrays);

            for (var i = 0, len = keys.length; i < len; i++) {
                if (!checkRange(arrays[keys[i]], start, end)) {
                    return false;
                }
            }

            return true;
        }
    });

    function checkRange(arrayRange, start, end) {
        var startRow = start.row;
        var endRow = end.row;
        var startCol = start.col;
        var endCol = end.col;

        var arrayStartRow = arrayRange.start.row;
        var arrayStartCol = arrayRange.start.col;
        var arrayEndRow = arrayRange.end.row;
        var arrayEndCol = arrayRange.end.col;

        if (startRow <= arrayStartRow && startCol <= arrayStartCol
            && endRow >= arrayEndRow && endCol >= arrayEndCol) {
            return true;
        }

        if (startRow > arrayEndRow || startCol > arrayEndCol
            || endRow < arrayStartRow || endCol < arrayEndCol) {
            return true;
        }

        return false;
    }
});