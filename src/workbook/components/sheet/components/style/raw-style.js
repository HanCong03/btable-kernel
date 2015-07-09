/**
 * @file 获取原始样式数据
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');

    return {
        /**
         * 获取指定单元格自身的样式。该样式不是计算后的值，而仅仅是其自有值。
         * @param classify
         * @param row
         * @param col
         */
        getRawCellStyle: function (classify, row, col) {
            var StylePool = this.getModule('StylePool');

            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;

            if (!rowsData[row] || !rowsData[row].cells || !rowsData[row].cells[col]) {
                return null;
            }

            var current = rowsData[row].cells[col];

            if ($$.isNdef(current.si)) {
                return null;
            }

            return StylePool.getClassifyStyleDetailBySid(classify, current.si);
        },

        getRawStyle: function (classify, rows, cols) {
            var StylePool = this.getModule('StylePool');

            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;
            var colsData = styleData.cols;

            var globalResult = null;
            var rowResult = [];
            var colResult = [];

            if ($$.isDefined(styleData.globalStyle)) {
                globalResult = StylePool.getClassifyStyleDetailBySid(classify, styleData.globalStyle);
            }

            var current;

            /* ---- 获取行样式 start ---- */
            for (var i = 0, len = rows.length; i < len; i++) {
                current = rowsData[rows[i]];

                if (current && $$.isDefined(current.customFormat)) {
                    rowResult.push(StylePool.getClassifyStyleDetailBySid(classify, current.si));
                } else {
                    rowResult.push(null);
                    continue;
                }
            }
            /* ---- 获取行样式 end ---- */

            /* ---- 获取列样式 start ---- */
            for (var i = 0, len = cols.length; i < len; i++) {
                current = colsData[cols[i]];

                if (current && $$.isDefined(current.customFormat)) {
                    colResult.push(StylePool.getClassifyStyleDetailBySid(classify, current.si));
                } else {
                    colResult.push(null);
                }
            }
            /* ---- 获取列样式 end ---- */

            return {
                global: globalResult,
                rows: rowResult,
                cols: colResult
            };
        }
    };
});