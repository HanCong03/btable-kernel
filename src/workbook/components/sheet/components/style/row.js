/**
 * @file 样式组件，维护工作表内的样式
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');

    return require('utils').createClass('RowStyle', {
        base: require('sheet-component'),

        mixin: require('../common/style'),

        setStyle: function (styleName, styleValue, startIndex, endIndex) {
            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;
            var colsData = styleData.cols;
            var currentRow;

            // 行上独立单元格样式处理
            for (var i = startIndex; i <= endIndex; i++) {
                currentRow = rowsData[i];

                if ($$.isNdef(currentRow) || $$.isNdef(currentRow.cells)) {
                    continue;
                }

                $$.forEach(currentRow.cells, function (currentCell) {
                    //currentCell.si = this.rs('generate.style', styleName, styleValue, currentCell.si);
                    currentCell.si = this.getModule('StylePool').generateStyle(styleName, styleValue, currentCell.si);
                }, this);
            }

            // 列样式叠加处理
            $$.forEach(colsData, function (currentCol, col) {
                // 该列无自定义样式，跳过
                if ($$.isNdef(currentCol.customFormat)) {
                    return;
                }

                var currentRow;

                for (var i = startIndex; i <= endIndex; i++) {
                    if ($$.isNdef(rowsData[i])) {
                        rowsData[i] = {};
                    }

                    currentRow = rowsData[i];

                    // 当前行有自定义格式，则不用与列叠加
                    if ($$.isDefined(currentRow.customFormat)) {
                        continue;
                    }

                    if ($$.isNdef(currentRow.cells)) {
                        currentRow.cells = [];
                    }

                    var cells = currentRow.cells;

                    // 独立单元格，跳过
                    if ($$.isDefined(cells[col])) {
                        continue;
                    }

                    // 在当前列的基础上生成该单元格的样式
                    cells[col] = {
                        si: this.getModule('StylePool').generateStyle(styleName, styleValue, currentCol.si)
                        //si: this.rs('generate.style', styleName, styleValue, currentCol.si)
                    };
                }
            }, this);

            // 生成行样式
            for (var i = startIndex; i <= endIndex; i++) {
                if ($$.isNdef(rowsData[i])) {
                    rowsData[i] = {
                        customFormat: 1,
                        //si: this.rs('generate.style', styleName, styleValue, this.getRowSid(i))
                        si: this.getModule('StylePool').generateStyle(styleName, styleValue, this.getRowSid(i))
                    };
                } else {
                    rowsData[i].customFormat = 1;
                    //rowsData[i].si = this.rs('generate.style', styleName, styleValue, rowsData.si);
                    rowsData[i].si = this.getModule('StylePool').generateStyle(styleName, styleValue, rowsData.si);
                }
            }
        },

        applyCellStyle: function (csid, startIndex, endIndex) {
            var recordMap = {};
            var StylePool = this.getModule('StylePool');

            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;
            var colsData = styleData.cols;
            var currentRow;

            // 行上独立单元格样式处理
            for (var i = startIndex; i <= endIndex; i++) {
                currentRow = rowsData[i];

                if ($$.isNdef(currentRow) || $$.isNdef(currentRow.cells)) {
                    continue;
                }

                $$.forEach(currentRow.cells, function (currentCell) {
                    currentCell.si = getNewSid(StylePool, recordMap, csid, currentCell.si);
                }, this);
            }

            // 列样式叠加处理
            $$.forEach(colsData, function (currentCol, col) {
                // 该列无自定义样式，跳过
                if ($$.isNdef(currentCol.customFormat)) {
                    return;
                }

                var currentRow;

                for (var i = startIndex; i <= endIndex; i++) {
                    if ($$.isNdef(rowsData[i])) {
                        rowsData[i] = {};
                    }

                    currentRow = rowsData[i];

                    // 当前行有自定义格式，则不用与列叠加
                    if ($$.isDefined(currentRow.customFormat)) {
                        continue;
                    }

                    if ($$.isNdef(currentRow.cells)) {
                        currentRow.cells = [];
                    }

                    var cells = currentRow.cells;

                    // 独立单元格，跳过
                    if ($$.isDefined(cells[col])) {
                        continue;
                    }

                    // 在当前列的基础上生成该单元格的样式
                    cells[col] = {
                        si: getNewSid(StylePool, recordMap, csid, currentCol.si)
                    };
                }
            }, this);

            // 生成行样式
            for (var i = startIndex; i <= endIndex; i++) {
                if ($$.isNdef(rowsData[i])) {
                    rowsData[i] = {
                        customFormat: 1,
                        si: getNewSid(StylePool, recordMap, csid, this.getRowSid(i))
                    };
                } else {
                    rowsData[i].customFormat = 1;
                    rowsData[i].si = getNewSid(StylePool, recordMap, csid, rowsData.si);
                }
            }
        },

        setSid: function (sid, startIndex, endIndex) {
            if ($$.isNdef(sid)) {
                return this.clearStyle(startIndex, endIndex);
            }

            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;
            var currentRow;

            // 清除行上所有的独立单元格
            for (var i = startIndex; i <= endIndex; i++) {
                currentRow = rowsData[i];

                if ($$.isNdef(currentRow) || $$.isNdef(currentRow.cells)) {
                    continue;
                }

                $$.forEach(currentRow.cells, function (currentCell, col) {
                    delete currentRow.cells[col];
                }, this);
            }

            // 重置行样式
            for (var i = startIndex; i <= endIndex; i++) {
                if ($$.isNdef(rowsData[i])) {
                    rowsData[i] = {};
                }

                rowsData[i] = {
                    si: sid,
                    customFormat: 1
                };
            }
        },

        clearStyle: function (startIndex, endIndex) {
            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;
            var currentRow;

            // 清除行上独立单元格
            for (var i = startIndex; i <= endIndex; i++) {
                currentRow = rowsData[i];

                if ($$.isNdef(currentRow) || $$.isNdef(currentRow.cells)) {
                    continue;
                }

                $$.forEach(currentRow.cells, function (currentCell, col) {
                    delete currentRow.cells[col];
                });
            }

            // 清除行样式
            for (var i = startIndex; i <= endIndex; i++) {
                if ($$.isNdef(rowsData[i])) {
                    rowsData[i] = {};
                }

                currentRow = rowsData[i];

                delete currentRow.si;
                currentRow.customFormat = 1;

                this.cleanRowStyle(i);
            }
        }
    });

    function getNewSid(StylePool, recordMap, csid, sid) {
        if (recordMap[sid] === undefined) {
            recordMap[sid] = StylePool.generateCellStyle(csid, sid);
        }

        return recordMap[sid];
    }
});