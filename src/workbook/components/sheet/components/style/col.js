/**
 * @file 样式组件，维护工作表内的列样式
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');

    return require('utils').createClass('ColStyle', {
        base: require('sheet-component'),

        mixin: require('../common/style'),

        setStyle: function (styleName, styleValue, startIndex, endIndex) {
            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;
            var colsData = styleData.cols;

            var mainStyle = this.mainStyle;

            // 列上独立单元格样式处理
            $$.forEach(rowsData, function (currentRow) {
                if ($$.isNdef(currentRow.cells)) {
                    return;
                }

                var cells = currentRow.cells;
                var currentCell;

                for (var i = startIndex; i <= endIndex; i++) {
                    currentCell = cells[i];

                    if ($$.isNdef(currentCell)) {
                        continue;
                    }

                    currentCell.si = this.rs('generate.style', styleName, styleValue, currentCell.si);
                }
            }, this);

            // 行样式叠加处理
            $$.forEach(rowsData, function (currentRow, row) {
                // 非自定义样式行不用处理合并
                if ($$.isNdef(currentRow.customFormat)) {
                    return;
                }

                if ($$.isNdef(currentRow.cells)) {
                    currentRow.cells = [];
                }

                var cells = currentRow.cells;

                // 填充所有交叉的无独立数据的单元格
                for (var i = startIndex; i <= endIndex; i++) {
                    // 跳过包含独立数据的单元格
                    if ($$.isDefined(cells[i])) {
                        continue;
                    }

                    // 基于行样式生成新单元格以覆盖重叠部分
                    currentRow.cells[i] = {
                        si: this.rs('generate.style', styleName, styleValue, currentRow.si)
                    };
                }
            });

            // 生成列样式
            var sid;
            var globalStyle = styleData.globalStyle;

            for (var i = startIndex; i <= endIndex; i++) {
                sid = this.rs('generate.style', styleName, styleValue, this.getColumnSid(i));

                if (sid === globalStyle) {
                    // 新样式和全局样式一致，则删除列样式
                    if ($$.isDefined(colsData[i])) {
                        delete colsData[i];
                    }
                } else {
                    if ($$.isNdef(colsData[i])) {
                        colsData[i] = {
                            si: sid,
                            customFormat: 1
                        };
                    } else {
                        colsData[i].si = sid;
                        colsData[i].customFormat = 1;
                    }
                }
            }
        },

        /**
         * 直接设置指定行区域的sid
         * @param sid
         * @param startIndex
         * @param endIndex
         */
        setSid: function (sid, startIndex, endIndex) {
            if ($$.isNdef(sid)) {
                return this.clearStyle(startIndex, endIndex);
            }

            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;
            var colsData = styleData.cols;

            // 重置列样式
            if (styleData.globalStyle !== sid) {
                for (var i = startIndex; i <= endIndex; i++) {
                    colsData[i] = {
                        si: sid,
                        customFormat: 1
                    };
                }
            } else {
                for (var i = startIndex; i <= endIndex; i++) {
                    delete colsData[i];
                    this.cleanColumnStyle(i);
                }
            }

            // 重置列上独立单元格样式数据
            $$.forEach(rowsData, function (currentRow) {
                if ($$.isNdef(currentRow.cells)) {
                    return;
                }

                var cells = currentRow.cells;

                for (var i = startIndex; i <= endIndex; i++) {
                    if ($$.isDefined(cells[i])) {
                        cells[i] = {
                            si: sid
                        };
                    }
                }
            }, this);

            // 覆盖行样式
            $$.forEach(rowsData, function (currentRow) {
                if ($$.isNdef(currentRow.customFormat)) {
                    return;
                }

                if ($$.isNdef(currentRow.cells)) {
                    currentRow.cells = [];
                }

                var cells = currentRow.cells;

                for (var i = startIndex; i <= endIndex; i++) {
                    // 独立单元格不处理
                    if ($$.isDefined(cells[i])) {
                        continue;
                    }

                    cells[i] = {
                        si: sid
                    };
                }
            });
        },

        clearStyle: function (startIndex, endIndex) {
            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;
            var colsData = styleData.cols;

            // 删除列样式
            if ($$.isDefined(styleData.globalStyle)) {
                for (var i = startIndex; i <= endIndex; i++) {
                    colsData[i] = {
                        customFormat: 1
                    };
                }
            } else {
                for (var i = startIndex; i <= endIndex; i++) {
                    delete colsData[i];
                    this.cleanColumnStyle(i);
                }
            }


            // 清除列上独立单元格样式数据
            $$.forEach(rowsData, function (currentRow) {
                if ($$.isNdef(currentRow.cells)) {
                    return;
                }

                var cells = currentRow.cells;

                for (var i = startIndex; i <= endIndex; i++) {
                    if ($$.isDefined(cells[i])) {
                        cells[i] = {};
                    }
                }
            }, this);

            // 覆盖行样式
            $$.forEach(rowsData, function (currentRow) {
                if ($$.isNdef(currentRow.customFormat)) {
                    return;
                }

                if ($$.isNdef(currentRow.cells)) {
                    currentRow.cells = [];
                }

                var cells = currentRow.cells;

                for (var i = startIndex; i <= endIndex; i++) {
                    // 独立单元格不处理
                    if ($$.isDefined(cells[i])) {
                        continue;
                    }

                    cells[i] = {};
                }
            });


            // 清理所有单元格
            $$.forEach(rowsData, function (currentRow, row) {
                if ($$.isNdef(currentRow.cells)) {
                    return;
                }

                var cells = currentRow.cells;

                for (var i = startIndex; i <= endIndex; i++) {
                    if ($$.isDefined(cells[i])) {
                        this.cleanCellStyle(row, i);
                    }
                }
            }, this);
        }
    });
});