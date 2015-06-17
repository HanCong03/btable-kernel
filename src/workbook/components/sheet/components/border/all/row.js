/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    var BORDER_LOCATION = require('../definition/location');

    return require('utils').createClass('Border', {
        base: require('sheet-component'),

        setBorder: function (borderOptions, startIndex, endIndex) {
            /* ---- 处理上一行的独立单元格 ---- */
            var prevRowIndex = startIndex - 1;
            var maxColumnIndex = this.getConfig('MAX_COLUMN') - 1;

            this.rs('restrict.remove.border', BORDER_LOCATION.BOTTOM, {
                row: prevRowIndex,
                col: 0
            }, {
                row: prevRowIndex,
                col: maxColumnIndex
            });


            /* ---- 处理下一行的独立单元格 ---- */
            var nextRowIndex = endIndex + 1;

            this.rs('restrict.remove.border', BORDER_LOCATION.TOP, {
                row: nextRowIndex,
                col: 0
            }, {
                row: nextRowIndex,
                col: maxColumnIndex
            });
        }
    });
});