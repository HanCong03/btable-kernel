/**
 * @file 受限擦除
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

        // 列级设置，忽略对水平边框的处理
        __restrictRemoveTopBorder: function (startIndex, endIndex) {
            /**********************/
            /*     do nothing     */
            /**********************/
        },

        __restrictRemoveBottomBorder: function (startIndex, endIndex) {
            /**********************/
            /*     do nothing     */
            /**********************/
        },

        __restrictRemoveRightBorder: function (startIndex, endIndex) {
            this.__restrictRemoveCellBorder(BORDER_LOCATION.RIGHT, endIndex);
            this.__overflowRow(BORDER_LOCATION.RIGHT, endIndex);
            this.__restrictRemoveColumnBorder(BORDER_LOCATION.RIGHT, endIndex);
        },

        __restrictRemoveLeftBorder: function (startIndex, endIndex) {
            this.__restrictRemoveCellBorder(BORDER_LOCATION.LEFT, startIndex);
            this.__overflowRow(BORDER_LOCATION.LEFT, startIndex);
            this.__restrictRemoveColumnBorder(BORDER_LOCATION.LEFT, startIndex);
        },

        // 映射为对四条边的设置
        __restrictRemoveOuterBorder: function (startIndex, endIndex) {
            this.__restrictRemoveTopBorder(startIndex, endIndex);
            this.__restrictRemoveBottomBorder(startIndex, endIndex);
            this.__restrictRemoveLeftBorder(startIndex, endIndex);
            this.__restrictRemoveRightBorder(startIndex, endIndex);
        },

        /**
         * 擦除指定列上的独立单元格的指定位置的边框
         * @param location
         * @param col
         * @private
         */
        __restrictRemoveCellBorder: function (location, col) {
            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;
            var details;

            $$.forEach(rowsData, function (currentRow, row) {
                if ($$.isNdef(currentRow.cells) || $$.isNdef(currentRow.cells[col])) {
                    return;
                }

                var currentCell = currentRow.cells[col];

                details = this.getCellClassifyStyleDetails('borders', row, col);

                /* --- 空检查 startIndex --- */
                if (!this.__hasBorder(location, details)) {
                    return;
                }
                /* --- 空检查 endIndex --- */

                details = $$.clone(details.border);
                details[location] = NONE;

                currentCell.si = this.getModule('StylePool').generateBorder(details, currentCell.si);
                //currentCell.si = this.rs('generate.border', details, currentCell.si);
            }, this);
        },

        /**
         * 覆盖与指定列交叉的行上的单元格的指定位置的边框
         * @param location
         * @param col
         * @private
         */
        __overflowRow: function (location, col) {
            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;

            $$.forEach(rowsData, function (currentRow, row) {
                // 该行不存在独立样式
                if ($$.isNdef(currentRow.customFormat)) {
                    return;
                }

                var sid = currentRow.si;
                var details = this.getRowClassifyStyleDetails('borders', row);

                // 在指定位置上包含边框数据，则删除该边框数据
                if (this.__hasBorder(location, details)) {
                    details = $$.clone(details.border);
                    details[location] = NONE;
                    // 生成新边框
                    //sid = this.rs('generate.border', details, sid);
                    sid = this.getModule('StylePool').generateBorder(details, sid);
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
         * 擦除指定列上的指定位置的列边框
         * 注意：只擦除行边框
         * @param location
         * @param col
         * @private
         */
        __restrictRemoveColumnBorder: function (location, col) {
            var styleData = this.getActiveSheet().style;
            var colsData = styleData.cols;

            var details = this.getColumnClassifyStyleDetails('borders', col);

            /* --- 空检查 startIndex --- */
            if (!this.__hasBorder(location, details)) {
                return;
            }
            /* --- 空检查 endIndex --- */

            // 生成新的样式
            details = $$.clone(details.border);
            details[location] = NONE;

            colsData[col] = {
                customFormat: 1,
                si: this.getModule('StylePool').generateBorder(details, this.getColumnSid(col))
                //si: this.rs('generate.border', details, this.getColumnSid(col))
            };
        }
    };
});