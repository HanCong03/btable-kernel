/**
 * @file 获取原始样式数据
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');

    return {
        getRawStyle: function (classify, rows, cols) {
            var StylePool = this.getModule('StylePool');

            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;
            var colsData = styleData.cols;

            var globalResult = null;
            var rowResult = [];
            var colResult = [];
            var cellResult = [];

            if ($$.isDefined(styleData.globalStyle)) {
                globalResult = StylePool.getClassifyStyleDetailBySid(classify, styleData.globalStyle);
            }

            var current;
            var col;
            var sid;

            /* ---- 获取行样式 start ---- */
            for (var i = 0, len = rows.length; i < len; i++) {
                current = rowsData[rows[i]];

                if (current && $$.isDefined(current.customFormat)) {
                    rowResult.push(StylePool.getClassifyStyleDetailBySid(classify, current.si));
                } else {
                    rowResult.push(null);
                    continue;
                }

                /* ---- 获取独立单元格样式 start ---- */
                current = current.cells;

                if (!current) {
                    cellResult.push(null);
                }

                current = current.cells;

                for (var j = 0, jlen = cols.length; j < jlen; j++) {
                    col = cols[j];

                    sid = current[col].si;

                    if ($$.isDefined(sid)) {
                        cellResult.push({
                            row: i,
                            col: col,
                            value: StylePool.getClassifyStyleDetailBySid(classify, sid)
                        });
                    }
                }
                /* ---- 获取独立单元格样式 end ---- */
            }
            /* ---- 获取行样式 end ---- */

            /* ---- 获取列样式 start ---- */
            for (var i = 0, len = cols.length; i < len; i++) {
                current = colsData[i];

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
                cols: colResult,
                cells: cellResult
            };
        }
    };
});