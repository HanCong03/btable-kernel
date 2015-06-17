/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    var BORDER_LOCATION = require('../definition/location');

    return require('utils').createClass('Border', {
        base: require('sheet-component'),

        setBorder: function (borderOptions, startIndex, endIndex) {
            /* ---- 处理前一列上的独立单元格 ---- */
            var prevColIndex = startIndex - 1;
            var maxRowIndex = this.getConfig('MAX_ROW') - 1;

            this.rs('restrict.remove.border', BORDER_LOCATION.RIGHT, {
                row: 0,
                col: prevColIndex
            }, {
                row: maxRowIndex,
                col: prevColIndex
            });

            /* ---- 处理后一列上的独立单元格 ---- */
            var nextColIndex = endIndex + 1;

            this.rs('restrict.remove.border', BORDER_LOCATION.LEFT, {
                row: 0,
                col: nextColIndex
            }, {
                row: maxRowIndex,
                col: nextColIndex
            });
        }
    });
});