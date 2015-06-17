/**
 * @file 单元格数据清理工具，负责清除单元格中的空数据项
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = {
        cleanRowStyle: function (row) {
            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;
            var colsData = styleData.cols;

            var currentRow = rowsData[row];

            // 对cells进行安全检查
            if ($$.isDefined(currentRow.cells) && !$$.isEmpty(currentRow.cells)) {
                return;
            }

            delete currentRow.cells;

            // 对当前行进行安全检查
            if (!$$.isEmpty(currentRow)) {
                if ($$.isDefined(currentRow.customFormat)) {
                    if (!$$.isEmpty(colsData)) {
                        return;
                    }

                    if ($$.isNdef(currentRow.si)) {
                        if ($$.isDefined(styleData.globalStyle)) {
                            return;
                        }
                    } else if (currentRow.si !== styleData.globalStyle) {
                        return;
                    }
                }
            }

            delete rowsData[row];

            // 对所有行进行检查
            if (!$$.isEmpty(rowsData)) {
                return;
            }

            rowsData.length = 0;
        },

        cleanColumnStyle: function (col) {
            var styleData = this.getActiveSheet().style;
            var colsData = styleData.cols;

            if (!$$.isEmpty(colsData[col])) {
                return;
            }

            delete colsData[col];

            if (!$$.isEmpty(colsData)) {
                return;
            }

            colsData.length = 0;
        },

        cleanCellStyle: function (row, col) {
            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;
            var colsData = styleData.cols;

            var currentRow = rowsData[row];
            var currentCol = colsData[col];
            var currentCell = currentRow.cells[col];

            // 安全检查
            if ($$.isEmpty(currentCell)) {
                if ($$.isDefined(currentRow.customFormat)) {
                    if ($$.isDefined(currentRow.si)) {
                        return;
                    }
                } else if ($$.isDefined(styleData.globalStyle)) {
                    return;
                } else if (!$$.isEmpty(colsData)) {
                    return;
                }
            } else {
                if ($$.isDefined(currentRow.customFormat)) {
                    if (currentRow.si !== currentCell.si) {
                        return;
                    }
                } else if ($$.isDefined(currentCol) && $$.isDefined(currentCol.customFormat)) {
                    if (currentCol.si !== currentCell.si) {
                        return;
                    }
                } else if (styleData.globalStyle !== currentCell.si) {
                    return;
                }
            }

            // 安全检查通过
            delete currentRow.cells[col];

            // 检查行
            this.cleanRowStyle(row);
        },

        cleanRow: function (row) {
            var cellData = this.getActiveSheet().cell;
            var rowsData = cellData.rows;
            var currentRow = rowsData[row];

            if ($$.isDefined(currentRow.cells) && !$$.isEmpty(currentRow.cells)) {
                return;
            }

            delete currentRow.cells;

            if (!$$.isEmpty(currentRow)) {
                return;
            }

            delete rowsData[row];

            if (!$$.isEmpty(rowsData)) {
                return;
            }

            rowsData.length = 0;
        },

        cleanColumn: function (col) {
            var cellData = this.getActiveSheet().cell;
            var colsData = cellData.cols;

            if (!$$.isEmpty(colsData[col])) {
                return;
            }

            delete colsData[col];

            if (!$$.isEmpty(colsData)) {
                return;
            }

            colsData.length = 0;
        },

        cleanCell: function (row, col) {
            var cellData = this.getActiveSheet().cell;
            var rowsData = cellData.rows;
            var currentRow = rowsData[row];
            var currentCell = currentRow.cells[col];

            if (!$$.isEmpty(currentCell)) {
                return;
            }

            delete currentRow.cells[col];

            this.cleanRow(row);
        }
    };
});