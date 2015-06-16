/**
 * @file 维度信息维护单元
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');

    return require('base/clazz').create('Dimension', {
        base: require('sheet-component'),

        __lock: 0,

        init: function () {
            this.onMessage({
                'sheetready': this.__initRecord,

                'style.dimension.change': this.onStyleChange,
                'cell.dimension.change': this.onCellChange,
                'all.dimension.change': this.onAllChange,

                'lock': this.lock,
                'unlock': this.unlock
            });
        },

        lock: function () {
            this.__lock++;
        },

        unlock: function () {
            this.__lock--;
        },

        onStyleChange: function () {
            if (this.__lock !== 0) {
                return;
            }

            // 更新样式记录
            this.__updateStyleRecord();

            // 更新主记录
            this.__updateMianDimension();
        },

        onCellChange: function () {
            if (this.__lock !== 0) {
                return;
            }

            // 更新内容记录
            this.__updateCellRecord();

            // 更新主记录
            this.__updateMianDimension();
        },

        onAllChange: function () {
            if (this.__lock !== 0) {
                return;
            }

            // 重计算
            this.__initRecord();
        },

        __updateMianDimension: function () {
            var sheetData = this.getActiveSheet();

            // 计算维度
            var colMinMax = this.__getColMinMax();
            var rowMinMax = this.__getRowMinMax();

            // 更新主维度记录
            sheetData.dimension = {
                min: {
                    row: rowMinMax.min,
                    col: colMinMax.min
                },
                max: {
                    row: rowMinMax.max,
                    col: colMinMax.max
                }
            };

            console.log(JSON.stringify(sheetData.dimension));
        },

        __getColMinMax: function () {
            var heap = this.getActiveHeap();
            var dimension = heap.dimension;

            var sheetData = this.getActiveSheet();

            // 独立单元格样式信息
            var styleMinMax = {
                min: getMin(dimension.style.min),
                max: getMax(dimension.style.max)
            };

            // 独立单元格内容信息
            var cellMinMax = {
                min: getMin(dimension.cell.min),
                max: getMax(dimension.cell.max)
            };

            // 列样式信息
            var keys = Object.keys(sheetData.style.cols);

            var styleColMinMax = {
                min: keys.length ? +keys[0] : -1,
                max: keys.length ? +keys[keys.length - 1] : -1
            };

            // 列内容信息
            keys = Object.keys(sheetData.cell.cols);

            var cellColMinMax = {
                min: keys.length ? +keys[0] : -1,
                max: keys.length ? +keys[keys.length - 1] : -1
            };

            var min = [styleMinMax.min, cellMinMax.min, styleColMinMax.min, cellColMinMax.min];
            var max = [styleMinMax.max, cellMinMax.max, styleColMinMax.max, cellColMinMax.max];

            return {
                min: _getMin(min),
                max: _getMax(max)
            };
        },

        __getRowMinMax: function () {
            var sheetData = this.getActiveSheet();
            var styleRows = sheetData.style.rows;
            var cellRows = sheetData.cell.rows;

            var styleKeys = Object.keys(styleRows);
            var cellKeys = Object.keys(cellRows);

            var styleMin = -1;
            var styleMax = -1;
            var cellMin = -1;
            var cellMax = -1;

            if (styleKeys.length > 0) {
                styleMin = +styleKeys[0];
                styleMax = +styleKeys[styleKeys.length - 1];
            }

            if (cellKeys.length > 0) {
                cellMin = +cellKeys[0];
                cellMax = +cellKeys[cellKeys.length - 1];
            }

            return {
                min: _getMin([styleMin, cellMin]),
                max: _getMax([styleMax, cellMax])
            };
        },

        __initRecord: function () {
            var heap = this.getActiveHeap();

            // 只记录style和cell的列，行可以直接计算出
            heap.dimension = {
                style: {
                    min: [],
                    max: []
                },
                cell: {
                    min: [],
                    max: []
                }
            };

            this.__updateStyleRecord();
            this.__updateCellRecord();

            this.__updateMianDimension();
        },

        __updateStyleRecord: function () {
            var heap = this.getActiveHeap();
            var styleData = this.getActiveSheet().style;
            var rowsData = styleData.rows;

            heap.dimension.style = getRecord(rowsData);
        },

        __updateCellRecord: function () {
            var heap = this.getActiveHeap();
            var cellData = this.getActiveSheet().cell;
            var rowsData = cellData.rows;

            heap.dimension.cell = getRecord(rowsData);
        }
    });

    function getRecord(rowsData) {
        var min = [];
        var max = [];

        $$.forEach(rowsData, function (currentRow, row) {
            if ($$.isNdef(currentRow.cells)) {
                return;
            }

            var keys = Object.keys(currentRow.cells);

            if (keys.length === 0) {
                return;
            }

            min[row] = +keys[0];
            max[row] = +keys[keys.length - 1];
        });

        return {
            min: min,
            max:  max
        };
    }

    function getMin(arr) {
        var min = -1;

        if (arr.length !== 0) {
            min = Number.MAX_VALUE;

            $$.forEach(arr, function (val) {
                min = val < min ? val : min;
            });
        }

        return min;
    }

    function getMax(arr) {
        var max = -1;

        if (arr.length !== 0) {
            max = Number.MIN_VALUE;

            $$.forEach(arr, function (val) {
                max = val > max ? val : max;
            });
        }

        return max;
    }

    // 类似getMin，但是不计算小于0的值
    function _getMin(arr) {
        var min = Number.MAX_VALUE;

        $$.forEach(arr, function (val) {
            if (val < 0) {
                return;
            }

            min = val < min ? val : min;
        });

        return min === Number.MAX_VALUE ? -1 : min;
    }

    // 类似getMax，但是不计算小于0的值
    function _getMax(arr) {
        var max = Number.MIN_VALUE;

        $$.forEach(arr, function (val) {
            if (val < 0) {
                return;
            }

            max = val > max ? val : max;
        });

        return max === Number.MIN_VALUE ? -1 : max;
    }
});