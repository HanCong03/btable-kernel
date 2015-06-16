/**
 * @file 视图组件，控制一下行为：1、网格线；2、行列头；3、窗格；4、默认行高和列宽；5、全局行列隐藏；
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var VIEW_DEFAULT = require('../../../defaults/view');

    return require('base/clazz').create('View', {
        base: require('sheet-component'),

        init: function () {
            this.registerAPI({
                setGridLine: this.setGridLine,
                getGridLine: this.getGridLine,

                setRowColHeader: this.setRowColHeader,
                getRowColHeader: this.getRowColHeader,

                setPane: this.setPane,
                getPane: this.getPane,
                clearPane: this.clearPane,

                getDefaultRowHeight: this.getRowHeight,
                getDefaultColWidth: this.getColWidth
            });

            this.__initService();
        },

        __initService: function () {
            this.registerService({
                'set.default.rowheight': this.setRowHeight,
                'set.default.colwidth': this.setColWidth,
                'get.default.rowheight': this.getRowHeight,
                'get.default.colwidth': this.getColWidth,

                'hide.all.row': this.hideAllRow,
                'hide.all.col': this.hideAllCol,
                'cancel.hide.all.row': this.cancelHideAllRow,
                'cancel.hide.all.col': this.cancelHideAllCol,

                'is.hideallrow': this.isHideAllRow,
                'is.hideallcol': this.isHideAllCol
            });
        },

        setGridLine: function (status) {
            var sheetData = this.getActiveSheet();
            sheetData.view.showGridLine = !!status;
        },

        getGridLine: function () {
            var sheetData = this.getActiveSheet();

            if ($$.isDefined(sheetData.view.showGridLine)) {
                return sheetData.view.showGridLine;
            }

            return VIEW_DEFAULT.showGridLine;
        },

        setRowColHeader: function (status) {
            var sheetData = this.getActiveSheet();
            sheetData.view.showRowColHeader = !!status;
        },

        getRowColHeader: function () {
            var sheetData = this.getActiveSheet();

            if ($$.isDefined(sheetData.view.showRowColHeader)) {
                return sheetData.view.showRowColHeader;
            }

            return VIEW_DEFAULT.showRowColHeader;
        },

        setPane: function (start, end) {
            if ($$.isNdef(start)) {
                return this.clearPane();
            }

            var sheetData = this.getActiveSheet();
            sheetData.view.pane = {
                start: {
                    row: start.row,
                    col: start.col
                },
                end: {
                    row: end.row,
                    col: end.col
                }
            };
        },

        getPane: function () {
            return this.getActiveSheet().view.pane;
        },

        clearPane: function () {
            var sheetData = this.getActiveSheet();
            delete sheetData.view.pane;
        },

        /**
         * 获取默认行高
         * @returns {rowHeight|*}
         */
        getRowHeight: function () {
            var sheetData = this.getActiveSheet();

            if ($$.isDefined(sheetData.view.rowHeight)) {
                return sheetData.view.rowHeight;
            }

            return VIEW_DEFAULT.rowHeight;
        },

        /**
         * 获取默认列宽
         * @returns {colWidth|*}
         */
        getColWidth: function () {
            var sheetData = this.getActiveSheet();

            if ($$.isDefined(sheetData.view.colWidth)) {
                return sheetData.view.colWidth;
            }

            return VIEW_DEFAULT.colWidth;
        },

        /**
         * 设置默认行高
         * @param height
         */
        setRowHeight: function (height) {
            var sheetData = this.getActiveSheet();
            sheetData.view.rowHeight = height;
        },

        /**
         * 设置默认列宽
         * @param width
         */
        setColWidth: function (width) {
            var sheetData = this.getActiveSheet();
            sheetData.view.colWidth = width;
        },

        hideAllRow: function () {
            var sheetData = this.getActiveSheet();
            sheetData.view.zeroHeight = true;
        },

        hideAllCol: function () {
            var sheetData = this.getActiveSheet();
            sheetData.view.zeroWidth = true;
        },

        cancelHideAllRow: function () {
            var sheetData = this.getActiveSheet();
            delete sheetData.view.zeroHeight;
        },

        cancelHideAllCol: function () {
            var sheetData = this.getActiveSheet();
            delete sheetData.view.zeroWidth;
        },

        isHideAllRow: function () {
            var sheetData = this.getActiveSheet();
            return !!sheetData.view.zeroHeight;
        },

        isHideAllCol: function () {
            var sheetData = this.getActiveSheet();
            return !!sheetData.view.zeroWidth;
        }
    });
});