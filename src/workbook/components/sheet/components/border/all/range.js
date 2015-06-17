/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    var BORDER_LOCATION = require('../definition/location');

    return require('utils').createClass('Border', {
        base: require('sheet-component'),

        setBorder: function (borderOptions, start, end) {
            /* ---- 处理上一行的独立单元格 ---- */
            var prevRowIndex = start.row - 1;

            this.rs('restrict.remove.border', BORDER_LOCATION.BOTTOM, {
                row: prevRowIndex,
                col: start.col
            }, {
                row: prevRowIndex,
                col: end.col
            });


            /* ---- 处理下一行的独立单元格 ---- */
            var nextRowIndex = end.row + 1;

            this.rs('restrict.remove.border', BORDER_LOCATION.TOP, {
                row: nextRowIndex,
                col: start.col
            }, {
                row: nextRowIndex,
                col: end.col
            });

            /* ---- 处理前一列上的独立单元格 ---- */
            var prevColIndex = start.col - 1;

            this.rs('restrict.remove.border', BORDER_LOCATION.RIGHT, {
                row: start.row,
                col: prevColIndex
            }, {
                row: end.row,
                col: prevColIndex
            });

            /* ---- 处理后一列上的独立单元格 ---- */
            var nextColIndex = end.col + 1;

            this.rs('restrict.remove.border', BORDER_LOCATION.LEFT, {
                row: start.row,
                col: nextColIndex
            }, {
                row: end.row,
                col: nextColIndex
            });
        }
    });
});