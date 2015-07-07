/**
 * @file 非受限擦除边框
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var BORDER_LOCATION = require('../../definition/location');
    var DEFAULT_BORDER_STYLE = require('../../defaults/border');

    return {
        addBorder: function (location, borderValue, start, end) {
            switch (location) {
                case BORDER_LOCATION.TOP:
                    this.__addTopBorder(borderValue, start, end);
                    break;

                case BORDER_LOCATION.BOTTOM:
                    this.__addBottomBorder(borderValue, start, end);
                    break;

                case BORDER_LOCATION.RIGHT:
                    this.__addRightBorder(borderValue, start, end);
                    break;

                case BORDER_LOCATION.LEFT:
                    this.__addLeftBorder(borderValue, start, end);
                    break;

                case BORDER_LOCATION.OUTER:
                    this.__addOuterBorder(borderValue, start, end);
                    break;

                case BORDER_LOCATION.INNER:
                    this.__addInnerBorder(borderValue, start, end);
                    break;
            }
        },

        __addTopBorder: function (borderValue, start, end) {
            this.restrictAddBorder(BORDER_LOCATION.TOP, borderValue, start, end);

            // 清除上一行的下边框
            this.restrictRemoveBorder(BORDER_LOCATION.BOTTOM, {
                row: start.row - 1,
                col: start.col
            }, {
                row: start.row - 1,
                col: end.col
            });
        },

        __addBottomBorder: function (borderValue, start, end) {
            this.restrictAddBorder(BORDER_LOCATION.BOTTOM, borderValue, start, end);

            // 清除下一行的上边框
            this.restrictRemoveBorder(BORDER_LOCATION.TOP, {
                row: end.row + 1,
                col: start.col
            }, {
                row: end.row + 1,
                col: end.col
            });
        },

        __addRightBorder: function (borderValue, start, end) {
            this.restrictAddBorder(BORDER_LOCATION.RIGHT, borderValue, start, end);

            // 清除下一列的左边框
            this.restrictRemoveBorder(BORDER_LOCATION.LEFT, {
                row: start.row,
                col: end.col + 1
            }, {
                row: end.row,
                col: end.col + 1
            });
        },

        __addLeftBorder: function (borderValue, start, end) {
            this.restrictAddBorder(BORDER_LOCATION.LEFT, borderValue, start, end);

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
        __addOuterBorder: function (borderValue, start, end) {
            this.__addTopBorder(borderValue, start, end);
            this.__addBottomBorder(borderValue, start, end);
            this.__addLeftBorder(borderValue, start, end);
            this.__addRightBorder(borderValue, start, end);
        },

        __addInnerBorder: function (borderValue, start, end) {
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

            /* ---- 重设外层行上的相关边框 start ---- */

            // 重设起始行单元格内部的竖直边框
            this.__addInnerVerticalBorder(borderValue, startRow, startCol, endCol);

            // 如果不是单行，则还需重设结束行单元格内部的竖直边框
            if (startRow !== endRow) {
                this.__addInnerVerticalBorder(borderValue, endRow, startCol, endCol);
            }

            // 如果：
            // 1、不包含中心区域
            // 2、不是单行
            // 则重设外层行相关的水平边框
            if (!hasCenterArea && startRow !== endRow) {
                this.__restrictAddBottomBorder(borderValue, {
                    row: startRow,
                    col: startCol
                }, {
                    row: startRow,
                    col: endCol
                });

                this.__restrictAddTopBorder(borderValue, {
                    row: endRow,
                    col: startCol
                }, {
                    row: endRow,
                    col: endCol
                });
            }

            /* ---- 重设外层行上的相关边框 end ---- */


            /* ---- 重设外层列上的相关边框 start ---- */

            // 重设起始列单元格内部的水平边框
            this.__addInnerHorizontalBorder(borderValue, startCol, startRow, endRow);

            // 如果不是单列，则还需重设结束列单元格内部的水平边框
            if (startCol !== endCol) {
                this.__addInnerHorizontalBorder(borderValue, endCol, startRow, endRow);
            }

            // 如果：
            // 1、不包含中心区域
            // 2、不是单列
            // 则重设外层列相关的竖直边框
            if (!hasCenterArea && startCol !== endCol) {
                this.__restrictAddRightBorder(borderValue, {
                    row: startRow,
                    col: startCol
                }, {
                    row: endRow,
                    col: startCol
                });

                this.__restrictAddLeftBorder(borderValue, {
                    row: startRow,
                    col: endCol
                }, {
                    row: endRow,
                    col: endCol
                });
            }

            /* ---- 重设外层列上的相关边框 end ---- */

            /* ---- 重设中心区域的所有边框 ---- */
            if (hasCenterArea) {
                this.getModule('Border').setBorder(borderValue, {
                //this.rs('set.border', borderValue, {
                    row: startRow + 1,
                    col: startCol + 1
                }, {
                    row: endRow - 1,
                    col: endCol - 1
                });
            }
        },

        /**
         * 重设指定区域**内部**的竖直边框
         * 注意1：该操作只针对单行进行
         * 注意2：该操作只重设内部的竖直边框，不会重设区域边界上的竖直边框
         * @private
         */
        __addInnerVerticalBorder: function (borderValue, row, startCol, endCol) {
            // 单列，不执行任何操作
            if (startCol === endCol) {
                return;
            }

            // 包含一个内部区域，则首先对内部区域的边框进行处理
            if (startCol + 1 <= endCol - 1) {
                this.__addVerticalBorder(borderValue, row, startCol + 1, endCol - 1);
            }

            /* ---- 对首尾单元格进行处理 start ---- */
            this.__restrictAddRightBorder(borderValue, {
                row: row,
                col: startCol
            }, {
                row: row,
                col: startCol
            });

            this.__restrictAddLeftBorder(borderValue, {
                row: row,
                col: endCol
            }, {
                row: row,
                col: endCol
            });
            /* ---- 对首尾单元格进行处理 end ---- */
        },

        /**
         * 重设指定区域的竖直边框 ---- 左边框和右边框
         * 注意1：该操作只针对单行进行
         * 注意2：该操作会重设给定区域**边界**上的边框
         * @param row
         * @private
         */
        __addVerticalBorder: function (borderValue, row, startCol, endCol) {
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

            for (var i = startCol; i <= endCol; i++) {
                details = this.getCellClassifyStyleDetails('borders', row, i);

                if ($$.isNdef(details)) {
                    details = $$.clone(DEFAULT_BORDER_STYLE);
                } else {
                    details = $$.clone(details.border);
                }

                details[BORDER_LOCATION.LEFT] = borderValue;
                details[BORDER_LOCATION.RIGHT] = borderValue;

                details = $$.clone(details);

                cells[i] = {
                    //si: this.rs('generate.border', details, this.getCellSid(row, i))
                    si: this.getModule('StylePool').generateBorder(details, this.getCellSid(row, i))
                };
            }
        },

        /**
         * 重设指定列内部的水平边框 ---- 上边框和下边框
         * 注意1：该操作只针对单列进行
         * 注意2：该操作仅重设给定区域**内部**的边框，不影响边界上的边框
         * @param col
         * @private
         */
        __addInnerHorizontalBorder: function (borderValue, col, startRow, endRow) {
            // 单行，不执行任何操作
            if (startRow === endRow) {
                return;
            }

            // 包含一个内部区域，则先对内部区域进行处理
            if (startRow + 1 <= endRow - 1) {
                this.__addHorizontalBorder(borderValue, col, startRow + 1, endRow - 1);
            }

            /* ---- 对首尾单元格进行处理 start ---- */
            this.__restrictAddBottomBorder(borderValue, {
                row: startRow,
                col: col
            }, {
                row: startRow,
                col: col
            });

            this.__restrictAddTopBorder(borderValue, {
                row: endRow,
                col: col
            }, {
                row: endRow,
                col: col
            });
            /* ---- 对首尾单元格进行处理 end ---- */
        },

        /**
         * 重设指定列的水平边框，包括列本身的水平边框和内部各单元格的水平边框 ---- 上边框和下边框
         * 注意1：该操作只针对单列进行
         * 注意2：该操作会重设给定区域**边界**上的边框
         * @param col
         * @private
         */
        __addHorizontalBorder: function (borderValue, col, startRow, endRow) {
            var rowsData = this.getActiveSheet().style.rows;
            var currentRow;

            var details;

            for (var i = startRow; i <= endRow; i++) {
                if ($$.isNdef(rowsData[i])) {
                    rowsData[i] = {};
                }

                currentRow = rowsData[i];

                if ($$.isNdef(currentRow.cells)) {
                    currentRow.cells = [];
                }

                details = this.getCellClassifyStyleDetails('borders', i, col);

                if ($$.isNdef(details)) {
                    details = $$.clone(DEFAULT_BORDER_STYLE);
                } else {
                    details = $$.clone(details.border);
                }

                details[BORDER_LOCATION.TOP] = borderValue;
                details[BORDER_LOCATION.BOTTOM] = borderValue;

                details = $$.clone(details);

                currentRow.cells[col] = {
                    si: this.getModule('StylePool').generateBorder(details, this.getCellSid(i, col))
                    //si: this.rs('generate.border', details, this.getCellSid(i, col))
                };
            }

        }
    };
});