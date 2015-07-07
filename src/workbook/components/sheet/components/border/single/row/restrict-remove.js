/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var NONE = require('NONE');
    var BORDER_LOCATION = require('../../definition/location');

    return {
        restrictRemoveBorder: function (location, startIndex, endIndex) {
            if (!this.__checkBoundary(startIndex, endIndex)) {
                return;
            }

            switch (location) {
                case BORDER_LOCATION.TOP:
                    this.__restrictRemoveTopBorder(startIndex, endIndex);
                    break;

                case BORDER_LOCATION.BOTTOM:
                    this.__restrictRemoveBottomBorder(startIndex, endIndex);
                    break;

                case BORDER_LOCATION.RIGHT:
                    this.__restrictRemoveRightBorder(startIndex, endIndex);
                    break;

                case BORDER_LOCATION.LEFT:
                    this.__restrictRemoveLeftBorder(startIndex, endIndex);
                    break;

                case BORDER_LOCATION.OUTER:
                    this.__restrictRemoveOuterBorder(startIndex, endIndex);
                    break;
            }
        },

        __restrictRemoveTopBorder: function (startIndex, endIndex) {
            this.__restrictRemoveCellBorder(BORDER_LOCATION.TOP, startIndex);
            this.__overflowColumn(BORDER_LOCATION.TOP, startIndex);
            this.__restrictRemoveRowBorder(BORDER_LOCATION.TOP, startIndex);
        },

        __restrictRemoveBottomBorder: function (startIndex, endIndex) {
            this.__restrictRemoveCellBorder(BORDER_LOCATION.BOTTOM, endIndex);
            this.__overflowColumn(BORDER_LOCATION.BOTTOM, endIndex);
            this.__restrictRemoveRowBorder(BORDER_LOCATION.BOTTOM, endIndex);
        },

        // 行级操作，忽略对竖直边框的处理
        __restrictRemoveLeftBorder: function (startIndex, endIndex) {
            /**********************/
            /*     do nothing     */
            /**********************/
        },

        // 行级操作，左右边框设置无效
        __restrictRemoveRightBorder: function (startIndex, endIndex) {
            /**********************/
            /*     do nothing     */
            /**********************/
        },

        /**
         * outer操作映射为对四条边的操作
         * @param startIndex
         * @param endIndex
         * @private
         */
        __restrictRemoveOuterBorder: function (startIndex, endIndex) {
            this.__restrictRemoveTopBorder(startIndex, endIndex);
            this.__restrictRemoveBottomBorder(startIndex, endIndex);
            this.__restrictRemoveLeftBorder(startIndex, endIndex);
            this.__restrictRemoveRightBorder(startIndex, endIndex);
        },

        /**
         * 擦除指定行上的独立单元格的指定位置的边框
         * @param location
         * @param row
         * @private
         */
        __restrictRemoveCellBorder: function (location, row) {
            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;
            var currentRow = rowsData[row];

            if ($$.isNdef(currentRow) || $$.isNdef(currentRow.cells)) {
                return;
            }

            $$.forEach(currentRow.cells, function (currentCell, col) {
                var details = this.getCellClassifyStyleDetails('borders', row, col);

                /* --- 空检查 startIndex --- */
                if (!this.__hasBorder(location, details)) {
                    return;
                }
                /* --- 空检查 endIndex --- */

                details = $$.clone(details.border);
                details[location] = NONE;

                //currentCell.si = this.rs('generate.border', details, currentCell.si);
                currentCell.si = this.getModule('StylePool').generateBorder(details, currentCell.si);
            }, this);
        },

        /**
         * 覆盖与指定行交叉的列上的单元格的指定位置的边框
         * @param location
         * @param row
         * @private
         */
        __overflowColumn: function (location, row) {
            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;
            var colsData = styleData.cols;

            var globalStyle = styleData.globalStyle;

            $$.forEach(colsData, function (currentCol, col) {
                var sid = this.getColumnSid(col);

                // 和全局样式一致，则删除该列样式，并退出
                if ($$.isNdef(currentCol.customFormat) || sid === globalStyle) {
                    delete colsData[col];
                    return;
                }

                var currentRow = rowsData[row];

                // 行存在且具有自定义样式，则跳过该行上的覆盖
                if ($$.isDefined(currentRow) && $$.isDefined(currentRow.customFormat)) {
                    return;
                }

                var details = this.getColumnClassifyStyleDetails('borders', col);

                // 在指定位置上包含边框数据，则删除该边框数据
                if (this.__hasBorder(location, details)) {
                    details = $$.clone(details.border);
                    details[location] = NONE;
                    // 生成新边框
                    //sid = this.rs('generate.border', details, sid);
                    sid = this.getModule('StylePool').generateBorder(details, sid);
                }

                if ($$.isNdef(currentRow)) {
                    rowsData[row] = {};
                    currentRow = rowsData[row];
                }

                if ($$.isNdef(currentRow.cells)) {
                    currentRow.cells = [];
                }

                // 当前处理的是独立单元格，则跳过
                if ($$.isDefined(currentRow.cells[col])) {
                    return;
                }

                currentRow.cells[col] = {
                    si: sid
                };

            }, this);
        },

        /**
         * 擦除指定行上的指定位置的行边框
         * 注意：只擦除行边框
         * @param location
         * @param row
         * @private
         */
        __restrictRemoveRowBorder: function (location, row) {
            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;

            var details = this.getRowClassifyStyleDetails('borders', row);

            /* --- 空检查 startIndex --- */
            if (!this.__hasBorder(location, details)) {
                return;
            }
            /* --- 空检查 endIndex --- */

            // 生成新的样式
            details = $$.clone(details.border);
            details[location] = NONE;

            if ($$.isNdef(rowsData[row])) {
                rowsData[row] = {};
            }

            rowsData[row].customFormat = 1;
            //rowsData[row].si = this.rs('generate.border', details, this.getRowSid(row));
            rowsData[row].si = this.getModule('StylePool').generateBorder(details, this.getRowSid(row));
        }
    };
});