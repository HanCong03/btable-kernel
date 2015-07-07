/**
 * @file 样式组件，维护工作表内的单元格样式
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');

    return require('utils').createClass('RangeStyle', {
        base: require('sheet-component'),

        mixin: require('../common/style'),

        setStyle: function (styleName, styleValue, start, end) {
            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;
            var currentRow;
            var cells;

            for (var i = start.row, limit = end.row; i <= limit; i++) {
                if ($$.isNdef(rowsData[i])) {
                    rowsData[i] = {};
                }

                currentRow = rowsData[i];

                if ($$.isNdef(currentRow.cells)) {
                    currentRow.cells = [];
                }

                cells = currentRow.cells;

                for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                    if ($$.isNdef(cells[j])) {
                        cells[j] = {
                            //si: this.rs('generate.style', styleName, styleValue, this.getCellSid(i, j))
                            si: this.getModule('StylePool').generateStyle(styleName, styleValue, this.getCellSid(i, j))
                        };
                    } else {
                        cells[j].si = this.getModule('StylePool').generateStyle(styleName, styleValue, cells[j].si);
                        //cells[j].si = this.rs('generate.style', styleName, styleValue, cells[j].si);
                    }
                }
            }
        },

        applyCellStyle: function (csid, start, end) {
            var recordMap = {};
            var StylePool = this.getModule('StylePool');
            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;
            var currentRow;
            var cells;

            for (var i = start.row, limit = end.row; i <= limit; i++) {
                if ($$.isNdef(rowsData[i])) {
                    rowsData[i] = {};
                }

                currentRow = rowsData[i];

                if ($$.isNdef(currentRow.cells)) {
                    currentRow.cells = [];
                }

                cells = currentRow.cells;

                for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                    if ($$.isNdef(cells[j])) {
                        cells[j] = {
                            si: getNewSid(StylePool, recordMap, csid, this.getCellSid(i, j))
                        };
                    } else {
                        cells[j].si = getNewSid(StylePool, recordMap, csid, cells[j].si)
                    }
                }
            }
        },

        setSid: function (sid, start, end) {
            if ($$.isNdef(sid)) {
                return this.clearStyle(start, end);
            }

            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;

            $$.iterator(start, end, function (row, col) {
                if ($$.isNdef(rowsData[row])) {
                    rowsData[row] = {};
                }

                if ($$.isNdef(rowsData[row].cells)) {
                    rowsData[row].cells = [];
                }

                rowsData[row].cells[col] = {
                    si: sid
                };
            }, this)
        },

        clearStyle: function (start, end) {
            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;

            $$.iterator(start, end, function (row, col) {
                // 当前单元格无样式，则跳过
                if ($$.isNdef(this.getCellSid(row, col))) {
                    return;
                }

                if ($$.isNdef(rowsData[row])) {
                    rowsData[row] = {};
                }

                if ($$.isNdef(rowsData[row].cells)) {
                    rowsData[row].cells = [];
                }

                var cells = rowsData[row].cells;

                cells[col] = {};

                this.cleanCellStyle(row, col);
            }, this)
        }
    });

    function getNewSid(StylePool, recordMap, csid, sid) {
        if (recordMap[sid] === undefined) {
            recordMap[sid] = StylePool.generateCellStyle(csid, sid);
        }

        return recordMap[sid];
    }
});