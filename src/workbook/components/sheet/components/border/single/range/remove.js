/**
 * @file 非受限擦除边框
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var NONE = require('NONE');
    var BORDER_LOCATION = require('../../definition/location');

    return {
        removeBorder: function (location, start, end) {
            switch (location) {
                case BORDER_LOCATION.TOP:
                    this.__removeTopBorder(start, end);
                    break;

                case BORDER_LOCATION.BOTTOM:
                    this.__removeBottomBorder(start, end);
                    break;

                case BORDER_LOCATION.RIGHT:
                    this.__removeRightBorder(start, end);
                    break;

                case BORDER_LOCATION.LEFT:
                    this.__removeLeftBorder(start, end);
                    break;

                case BORDER_LOCATION.OUTER:
                    this.__removeOuterBorder(start, end);
                    break;

                case BORDER_LOCATION.INNER:
                    this.__removeInnerBorder(start, end);
                    break;
            }
        },

        __removeTopBorder: function (start, end) {
            this.restrictRemoveBorder(BORDER_LOCATION.TOP, start, end);

            // 清除上一行的下边框
            this.restrictRemoveBorder(BORDER_LOCATION.BOTTOM, {
                row: start.row - 1,
                col: start.col
            }, {
                row: start.row - 1,
                col: end.col
            });
        },

        __removeBottomBorder: function (start, end) {
            this.restrictRemoveBorder(BORDER_LOCATION.BOTTOM, start, end);

            // 清除下一行的上边框
            this.restrictRemoveBorder(BORDER_LOCATION.TOP, {
                row: end.row + 1,
                col: start.col
            }, {
                row: end.row + 1,
                col: end.col
            });
        },

        __removeRightBorder: function (start, end) {
            this.restrictRemoveBorder(BORDER_LOCATION.RIGHT, start, end);

            // 清除下一列的左边框
            this.restrictRemoveBorder(BORDER_LOCATION.LEFT, {
                row: start.row,
                col: end.col + 1
            }, {
                row: end.row,
                col: end.col + 1
            });
        },

        __removeLeftBorder: function (start, end) {
            this.restrictRemoveBorder(BORDER_LOCATION.LEFT, start, end);

            // 清除前一列的右边框
            this.restrictRemoveBorder(BORDER_LOCATION.RIGHT, {
                row: start.row,
                col: start.col - 1
            }, {
                row: end.row,
                col: start.col - 1
            });
        },

        /**
         * 映射为对四条边的操作
         * @param start
         * @param end
         * @private
         */
        __removeOuterBorder: function (start, end) {
            this.__removeTopBorder(start, end);
            this.__removeBottomBorder(start, end);
            this.__removeLeftBorder(start, end);
            this.__removeRightBorder(start, end);
        },

        __removeInnerBorder: function (start, end) {
            var startRow = start.row;
            var endRow = end.row;
            var startCol = start.col;
            var endCol = end.col;

            // 单个单元格则不进行任何操作
            if (startRow === endRow && startCol === endCol) {
                return;
            }

            // 当前选区是否有中心区域
            var hasCenterArea = endRow - 1 >= startRow + 1 && endCol - 1 >= startCol + 1;

            /* ---- 清除外层行上的相关边框 start ---- */

            // 删除起始行单元格内部的竖直边框
            this.__removeInnerVerticalBorder(startRow, startCol, endCol);

            // 如果不是单行，则还需清理结束行单元格内部的竖直边框
            if (startRow !== endRow) {
                this.__removeInnerVerticalBorder(endRow, startCol, endCol);
            }

            // 如果：
            // 1、不包含中心区域
            // 2、不是单行
            // 则清除外层行相关的水平边框
            if (!hasCenterArea && startRow !== endRow) {
                this.__restrictRemoveBottomBorder({
                    row: startRow,
                    col: startCol
                }, {
                    row: startRow,
                    col: endCol
                });

                this.__restrictRemoveTopBorder({
                    row: endRow,
                    col: startCol
                }, {
                    row: endRow,
                    col: endCol
                });
            }

            /* ---- 清除外层行上的相关边框 end ---- */


            /* ---- 清除外层列上的相关边框 start ---- */

            // 删除起始列单元格内部的水平边框
            this.__removeInnerHorizontalBorder(startCol, startRow, endRow);

            // 如果不是单列，则还需清理结束列单元格内部的水平边框
            if (startCol !== endCol) {
                this.__removeInnerHorizontalBorder(endCol, startRow, endRow);
            }

            // 如果：
            // 1、不包含中心区域
            // 2、不是单列
            // 则清除外层列相关的竖直边框
            if (!hasCenterArea && startCol !== endCol) {
                this.__restrictRemoveRightBorder({
                    row: startRow,
                    col: startCol
                }, {
                    row: endRow,
                    col: startCol
                });

                this.__restrictRemoveLeftBorder({
                    row: startRow,
                    col: endCol
                }, {
                    row: endRow,
                    col: endCol
                });
            }

            /* ---- 清除外层列上的相关边框 end ---- */

            /* ---- 清除中心区域的所有边框 ---- */
            if (hasCenterArea) {
                this.rs('unset.border', {
                    row: startRow + 1,
                    col: startCol + 1
                }, {
                    row: endRow - 1,
                    col: endCol - 1
                });
            }
        },

        /**
         * 删除指定区域**内部**的竖直边框
         * 注意1：该操作只针对单行进行
         * 注意2：该操作只删除内部的竖直边框，不会清除区域边界上的竖直边框
         * @private
         */
        __removeInnerVerticalBorder: function (row, startCol, endCol) {
            // 单列，不执行任何操作
            if (startCol === endCol) {
                return;
            }

            // 包含一个内部区域，则首先对内部区域的边框进行处理
            if (startCol + 1 <= endCol - 1) {
                this.__removeVerticalBorder(row, startCol + 1, endCol - 1);
            }

            /* ---- 对首尾单元格进行处理 start ---- */
            this.__restrictRemoveRightBorder({
                row: row,
                col: startCol
            }, {
                row: row,
                col: startCol
            });

            this.__restrictRemoveLeftBorder({
                row: row,
                col: endCol
            }, {
                row: row,
                col: endCol
            });
            /* ---- 对首尾单元格进行处理 end ---- */
        },

        /**
         * 删除指定区域的竖直边框 ---- 左边框和右边框
         * 注意1：该操作只针对单行进行
         * 注意2：该操作会清除给定区域**边界**上的边框
         * @param row
         * @private
         */
        __removeVerticalBorder: function (row, startCol, endCol) {
            var rowsData = this.getActiveSheet().style.rows;

            if ($$.isNdef(rowsData[row])) {
                rowsData[row] = {};
            }

            var currentRow = rowsData[row];

            if ($$.isNdef(currentRow.cells)) {
                currentRow.cells = [];
            }

            var cells = currentRow.cells;
            var details;
            var hasLeftBorder;
            var hasRightBorder;

            for (var i = startCol; i <= endCol; i++) {
                details = this.getCellClassifyStyleDetails('borders', row, i);

                hasLeftBorder = this.__hasBorder(BORDER_LOCATION.LEFT, details);
                hasRightBorder = this.__hasBorder(BORDER_LOCATION.RIGHT, details);


                if (!hasLeftBorder && !hasRightBorder) {
                    continue;
                }

                details = $$.clone(details.border);

                if (hasLeftBorder) {
                    details[BORDER_LOCATION.LEFT] = NONE;
                }

                if (hasRightBorder) {
                    details[BORDER_LOCATION.RIGHT] = NONE;
                }

                cells[i] = {
                    si: this.rs('generate.border', details, this.getCellSid(row, i))
                };
            }
        },

        /**
         * 删除指定列内部的水平边框 ---- 上边框和下边框
         * 注意1：该操作只针对单列进行
         * 注意2：该操作仅清除给定区域**内部**的边框，不影响边界上的边框
         * @param col
         * @private
         */
        __removeInnerHorizontalBorder: function (col, startRow, endRow) {
            // 单行，不执行任何操作
            if (startRow === endRow) {
                return;
            }

            // 包含一个内部区域，则先对内部区域进行处理
            if (startRow + 1 <= endRow - 1) {
                this.__removeHorizontalBorder(col, startRow + 1, endRow - 1);
            }

            /* ---- 对首尾单元格进行处理 start ---- */
            this.__restrictRemoveBottomBorder({
                row: startRow,
                col: col
            }, {
                row: startRow,
                col: col
            });

            this.__restrictRemoveTopBorder({
                row: endRow,
                col: col
            }, {
                row: endRow,
                col: col
            });
            /* ---- 对首尾单元格进行处理 end ---- */
        },

        /**
         * 删除指定列的水平边框，包括列本身的水平边框和内部各单元格的水平边框 ---- 上边框和下边框
         * 注意1：该操作只针对单列进行
         * 注意2：该操作会清除给定区域**边界**上的边框
         * @param col
         * @private
         */
        __removeHorizontalBorder: function (col, startRow, endRow) {
            var rowsData = this.getActiveSheet().style.rows;
            var currentRow;

            var details;
            var hasTopBorder;
            var hasBottomBorder;

            for (var i = startRow; i <= endRow; i++) {
                if ($$.isNdef(rowsData[i])) {
                    rowsData[i] = {};
                }

                currentRow = rowsData[i];

                if ($$.isNdef(currentRow.cells)) {
                    currentRow.cells = [];
                }

                details = this.getCellClassifyStyleDetails('borders', i, col);

                hasTopBorder = this.__hasBorder(BORDER_LOCATION.TOP, details);
                hasBottomBorder = this.__hasBorder(BORDER_LOCATION.BOTTOM, details);

                if (!hasTopBorder && !hasBottomBorder) {
                    continue;
                }

                details = $$.clone(details.border);

                if (hasTopBorder) {
                    details[BORDER_LOCATION.TOP] = NONE;
                }

                if (hasBottomBorder) {
                    details[BORDER_LOCATION.BOTTOM] = NONE;
                }

                currentRow.cells[col] = {
                    si: this.rs('generate.border', details, this.getCellSid(i, col))
                };
            }

        }
    };
});