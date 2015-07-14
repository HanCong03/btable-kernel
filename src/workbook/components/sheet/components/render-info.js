/**
 * @file 提供获取渲染数据的特殊组件。
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');

    return $$.createClass('RenderInfo', {
        base: require('sheet-component'),

        init: function () {
            this.registerAPI({
                getRenderInfo: this.getRenderInfo
            });
        },

        getRenderInfo: function (rows, cols) {
            var otherInfo = this.__getOtherInfo(rows, cols);
            return {
                styles: this.getModule('StyleCache').getRenderStyle(rows, cols),
                comments: otherInfo.comments,
                hyperlinks: otherInfo.hyperlinks
            };
        },

        __getOtherInfo: function (rows, cols) {
            var result = {
                comments: {},
                hyperlinks: {}
            };
            var row;
            var col;
            var key;

            var sheetData = this.getActiveSheet();
            var rowsData = sheetData.cell.rows;
            var comments = sheetData.comments;
            var hyperlinks = sheetData.hyperlinks;

            var current;

            for (var i = 0, len = rows.length; i < len; i++) {
                row = rows[i];
                for (var j = 0, jlen = cols.length; j < jlen; j++) {
                    col = cols[j];

                    if (!rowsData[row] || !rowsData[row].cells || !rowsData[row].cells[col]) {
                        continue;
                    }

                    current = rowsData[row].cells[col];
                    key = row + ',' + col;

                    if ($$.isDefined(current.comment)) {
                        result.comments[key] = comments[current.comment];
                    }

                    if ($$.isDefined(current.hyperlink)) {
                        result.hyperlinks[key] = hyperlinks[current.hyperlink];
                    }
                }
            }

            return result;
        }
    });
});