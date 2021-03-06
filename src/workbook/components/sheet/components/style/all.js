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
            var globalSid = this.getModule('StylePool').generateStyle(styleName, styleValue, styleData.globalStyle);
            styleData.globalStyle = globalSid;

            // 更新行sid
            $$.forEach(rowsData, function (currentRow) {
                if ($$.isNdef(currentRow.customFormat)) {
                    return;
                }

                currentRow.si = this.getModule('StylePool').generateStyle(styleName, styleValue, currentRow.si);
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

        applyCellStyle: function (csid) {
            var recordMap = {};
            var styleData = this.getActiveSheet().style;
            var StylePool = this.getModule('StylePool');

            if ($$.isDefined(styleData.globalStyle)) {
                styleData.globalStyle = StylePool.generateCellStyle(csid, styleData.globalStyle);
            }

            $$.forEach(styleData.rows, function (rowData) {
                if (rowData.customFormat) {
                    rowData.si = getNewSid(StylePool, recordMap, csid, rowData.si);
                }

                if ($$.isNdef(styleData.cells)) {
                    return;
                }

                $$.forEach(styleData.cells, function (cellData) {
                    if ($$.isDefined(cellData.si)) {
                        cellData.si = getNewSid(StylePool, recordMap, csid, cellData.si);
                    }
                });
            });

            $$.forEach(styleData.cols, function (colData) {
                if (colData.customFormat) {
                    colData.si = getNewSid(StylePool, recordMap, csid, colData.si);
                }
            });
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

    function getNewSid(StylePool, recordMap, csid, sid) {
        if (recordMap[sid] === undefined) {
            recordMap[sid] = StylePool.generateCellStyle(csid, sid);
        }

        return recordMap[sid];
    }
});