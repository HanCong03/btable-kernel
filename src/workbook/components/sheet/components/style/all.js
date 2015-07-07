/**
 * @file 样式组件，维护工作表内的样式
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');

    return require('utils').createClass('AllStyle', {
        base: require('sheet-component'),

        mixin: require('../common/style'),

        setStyle: function (styleName, styleValue) {
            var sheetData = this.getActiveSheet();
            var styleData = sheetData.style;
            var rowsData = styleData.rows;
            var colsData = styleData.cols;


            // 更新全局sid
            this.getModule('StylePool').generateStyle(styleName, styleValue, styleData.globalStyle);
            //var globalSid = this.rs('generate.style', styleName, styleValue, styleData.globalStyle);
            var globalSid = this.getModule('StylePool').generateStyle(styleName, styleValue, styleData.globalStyle);
            styleData.globalStyle = globalSid;

            // 更新行sid
            $$.forEach(rowsData, function (currentRow) {
                if ($$.isNdef(currentRow.customFormat)) {
                    return;
                }

                currentRow.si = this.getModule('StylePool').generateStyle(styleName, styleValue, currentRow.si);
                //currentRow.si = this.rs('generate.style', styleName, styleValue, currentRow.si);
            }, this);

            // 更新列sid
            $$.forEach(colsData, function (currentCol, col) {
                //var sid = this.rs('generate.style', styleName, styleValue, this.getColumnSid(col));
                var sid = this.getModule('StylePool').generateStyle(styleName, styleValue, this.getColumnSid(col));

                // 列id和全局id一致，则删除该列的id
                if (sid === globalSid) {
                    delete colsData[col];
                } else {
                    colsData.si = sid;
                    colsData.customFormat = 1;
                }
            }, this);

            // 更新独立单元格sid
            $$.forEach(rowsData, function (currentRow) {
                // 该行无单元格
                if ($$.isNdef(currentRow.cells)) {
                    return;
                }

                $$.forEach(currentRow.cells, function (currentCell) {
                    currentCell.si = this.getModule('StylePool').generateStyle(styleName, styleValue, currentCell.si);
                    //currentCell.si = this.rs('generate.style', styleName, styleValue, currentCell.si);
                }, this);
            }, this);
        },

        setSid: function (sid) {
            var styleData = this.getActiveSheet().style;

            this.clearStyle();

            if ($$.isDefined(sid)) {
                styleData.globalStyle = sid;
            }
        },

        clearStyle: function () {
            var styleData = this.getActiveSheet().style;

            // 清除全局样式
            styleData.globalStyle = null;

            // 清除列样式
            styleData.cols.length = 0;

            // 清除行、独立单元格样式
            styleData.rows.length = 0;
        }
    });
});