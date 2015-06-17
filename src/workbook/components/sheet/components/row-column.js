/**
 * @file 行列组件：维护行列的宽高以及隐藏
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var WORKBOOK_CONFIG = require('../../../config');

    var MAX_COLUMN_INDEX = WORKBOOK_CONFIG.MAX_COLUMN - 1;
    var MAX_ROW_INDEX = WORKBOOK_CONFIG.MAX_ROW - 1;

    return require('utils').createClass('RowColumn', {
        base: require('sheet-component'),

        init: function () {
            this.registerAPI({
                setRowHeight: this.setRowHeight,
                setColWidth: this.setColWidth,
                getRowHeight: this.getRowHeight,
                getColWidth: this.getColWidth,
                hasRowHeight: this.hasRowHeight,
                hasColWidth: this.hasColWidth,
                hideRow: this.hideRow,
                hideCol: this.hideCol,
                showRow: this.showRow,
                showCol: this.showCol
            });
        },

        /**
         * 为指定行设置行高，需要指定一个行的范围。
         * @param height
         * @param startIndex 行起始索引
         * @param endIndex 行结束索引
         * @returns {*}
         */
        setRowHeight: function (height, startIndex, endIndex) {
            // 如果即将设置的高度为0，则设置该行隐藏，不改变其高度，以便取消隐藏时可以恢复到之前的高度
            if (height === 0) {
                return this.hideRow(startIndex, endIndex);
            }

            /* ---- 全局设置 ---- */
            if (startIndex === 0 && endIndex >= MAX_ROW_INDEX) {
                return this.__setAllRowHeight(height);
            }

            /* ---- 设置指定行的行高 ---- */
            var cellData = this.getActiveSheet().cell;
            var rowsData = cellData.rows;

            for (var i = startIndex; i <= endIndex; i++) {
                if ($$.isNdef(rowsData[i])) {
                    rowsData[i] = {};
                }

                rowsData[i].height = height;
            }

            // 维度变更通知
            this.postMessage('cell.dimension.change');
        },

        /**
         * 为指定列设置列宽，需要指定的是一个列的范围。
         * @param width
         * @param startIndex 列起始索引
         * @param endIndex 列结束索引
         * @returns {*}
         */
        setColWidth: function (width, startIndex, endIndex) {
            // 如果即将设置的宽度为0，则设置该列隐藏，不改变其宽度，以便取消隐藏时可以恢复到之前的宽度。
            if (width === 0) {
                return this.hideColumn(startIndex, endIndex);
            }

            /* ---- 全局设置 ---- */
            if (startIndex === 0 && endIndex >= MAX_COLUMN_INDEX) {
                return this.__setAllColWidth(width);
            }

            /* ---- 设置指定列的列宽 ---- */
            var cellData = this.getActiveSheet().cell;
            var colsData = cellData.cols;

            for (var i = startIndex; i <= endIndex; i++) {
                if ($$.isNdef(colsData[i])) {
                    colsData[i] = {};
                }

                colsData[i].width = width;
            }

            // 维度变更通知
            this.postMessage('cell.dimension.change');
        },

        /**
         * 获取指定行的行高
         * @param row
         */
        getRowHeight: function (row) {
            var currentRow = this.getActiveSheet().cell.rows[row];

            if ($$.isDefined(currentRow) && $$.isDefined(currentRow.height)) {
                return currentRow.height;
            }

            return this.rs('get.default.rowheight');
        },

        /**
         * 获取指定列的列宽
         * @param col
         */
        getColWidth: function (col) {
            var currentCol = this.getActiveSheet().cell.cols[col];

            if ($$.isDefined(currentCol) && $$.isDefined(currentCol.width)) {
                return currentCol.width;
            }

            return this.rs('get.default.colwidth');
        },

        /**
         * 判断指定行是否设置了行高
         * @param row
         */
        hasRowHeight: function (row) {
            var currentRow = this.getActiveSheet().cell.rows[row];
            return $$.isDefined(currentRow) && $$.isDefined(currentRow.height);
        },

        /**
         * 判断指定列是否设置了列宽
         * @param row
         */
        hasColWidth: function (col) {
            var currentCol = this.getActiveSheet().cell.cols[col];
            return $$.isDefined(currentCol) && $$.isDefined(currentCol.width);
        },

        hideRow: function (startIndex, endIndex) {
            /* ---- 全局隐藏 ---- */
            if (startIndex === 0 && endIndex >= MAX_ROW_INDEX) {
                return this.__hideAllRow(startIndex, endIndex);
            }

            /* ---- 隐藏指定的行 ---- */

            // 如果全局行隐藏已被设置，则直接退出
            if (this.rs('is.hideallrow')) {
                return;
            }

            var cellData = this.getActiveSheet().cell;
            var rowsData = cellData.rows;

            for (var i = startIndex; i <= endIndex; i++) {
                if ($$.isNdef(rowsData[i])) {
                    rowsData[i] = {};
                }

                rowsData[i].hidden = true;
            }

            // 维度变更通知
            this.postMessage('cell.dimension.change');
        },

        hideColumn: function (startIndex, endIndex) {
            /* ---- 全局隐藏 ---- */
            if (startIndex === 0 && endIndex >= MAX_COLUMN_INDEX) {
                return this.__hideAllCol(startIndex, endIndex);
            }

            /* ---- 隐藏指定的行 ---- */

            // 如果全局列隐藏已被设置，则直接退出
            if (this.rs('is.hideallcol')) {
                return;
            }

            var cellData = this.getActiveSheet().cell;
            var colsData = cellData.cols;

            for (var i = startIndex; i <= endIndex; i++) {
                if ($$.isNdef(colsData[i])) {
                    colsData[i] = {};
                }

                colsData[i].hidden = true;
            }

            // 维度变更通知
            this.postMessage('cell.dimension.change');
        },

        /**
         * 取消对指定范围的行设置的隐藏状态
         * 注意： 如果全局行隐藏已被设置，则对任一行取消隐藏，将导致全局行隐藏失效。
         *       这意味着所有行都将取消隐藏。
         * @param startIndex
         * @param endIndex
         */
        showRow: function (startIndex, endIndex) {
            if (this.rs('is.hideallrow')) {
                this.rs('cancel.hide.all.row');
                return;
            }

            var cellData = this.getActiveSheet().cell;
            var rowsData = cellData.rows;

            for (var i = startIndex; i <= endIndex; i++) {
                if ($$.isNdef(rowsData[i]) || $$.isNdef(rowsData[i].hidden)) {
                    continue;
                }

                delete rowsData[i].hidden;
                this.cleanRow(i);
            }

            // 维度变更通知
            this.postMessage('cell.dimension.change');
        },

        /**
         * 取消对指定范围的列设置的隐藏状态
         * 注意事项请参考 showRow()
         * @param startIndex
         * @param endIndex
         */
        showCol: function (startIndex, endIndex) {
            if (this.rs('is.hideallcol')) {
                this.rs('cancel.hide.all.col');
                return;
            }

            var cellData = this.getActiveSheet().cell;
            var colsData = cellData.cols;

            for (var i = startIndex; i <= endIndex; i++) {
                if ($$.isNdef(colsData[i]) || $$.isNdef(colsData[i].hidden)) {
                    continue;
                }

                delete colsData[i].hidden;
                this.cleanColumn(i);
            }

            // 维度变更通知
            this.postMessage('cell.dimension.change');
        },

        __setAllRowHeight: function (height) {
            var sheetData = this.getActiveSheet();
            var cellData = sheetData.cell;
            var rowsData = cellData.rows;

            // 删除所有独立行高
            $$.forEach(rowsData, function (currentRow, row) {
                delete currentRow.height;

                this.cleanRow(row);
            }, this);

            // 设置默认行高
            this.rs('set.default.rowheight', height);

            // 维度变更通知
            this.postMessage('cell.dimension.change');
        },

        __setAllColWidth: function (width) {
            var sheetData = this.getActiveSheet();
            var cellData = sheetData.cell;
            var colsData = cellData.cols;

            // 删除所有独立列宽
            $$.forEach(colsData, function (currentCol, col) {
                delete currentCol.width;

                this.cleanColumn(col);
            }, this);

            // 设置默认行高
            this.rs('set.default.colwidth', width);

            // 维度变更通知
            this.postMessage('cell.dimension.change');
        },

        __hideAllRow: function () {
            var sheetData = this.getActiveSheet();
            var cellData = sheetData.cell;
            var rowsData = cellData.rows;

            // 删除所有独立行的隐藏属性
            $$.forEach(rowsData, function (currentRow, row) {
                delete currentRow.hidden;

                this.cleanRow(row);
            }, this);

            this.rs('hide.all.row');

            // 维度变更通知
            this.postMessage('cell.dimension.change');
        },

        __hideAllCol: function () {
            var sheetData = this.getActiveSheet();
            var cellData = sheetData.cell;
            var colsData = cellData.cols;

            // 删除所有独立列的隐藏属性
            $$.forEach(colsData, function (currentCol, col) {
                delete currentCol.hidden;

                this.cleanColumn(col);
            }, this);

            this.rs('hide.all.col');

            // 维度变更通知
            this.postMessage('cell.dimension.change');
        }
    });
});