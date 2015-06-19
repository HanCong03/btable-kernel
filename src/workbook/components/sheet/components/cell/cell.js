/**
 * @file 批注组件
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');

    return $$.createClass('Cell', {
        base: require('sheet-component'),

        mixin: require('./clear'),

        init: function () {
            this.__initService();
            this.__initAPI();
        },

        __initService: function () {
            this.registerService({
                'clearall': this.clearAll,
                'synccell': this.syncCell
            });
        },

        __initAPI: function () {
            this.registerAPI({
                clearAll: this.clearAll
            });
        },

        /**
         * 同步指定区域内的单元格。
         * 同步规则：
         * 1. 所有单元格的内容和样式以及各式化等全都以区域内第一个有内容的单元格为参照。
         * 2. 如果区域内的所有单元格都没有内容，则以左上角的单元格为参照。
         * 3. 同步的样式将移除border。
         * @param start
         * @param end
         */
        syncCell: function (start, end) {
            // 获取区域内第一个含有内容的单元格
            var cell = this.__getFirstHasContentCell(start, end);

            // 包含的
            if ($$.isNdef(cell)) {
                cell = start;
            }

            // 备份cell内容
            var copyCellData = $$.clone(this.__getCellData(cell.row, cell.col));

            this.postMessage('lock');

            // 清空区域内的所有单元格数据
            this.clearAll(start, end);

            // 备份cell存在，则设置该单元格数据
            if (copyCellData) {
                this.__setCellData(copyCellData, start.row, 0);
            }

            var sid = this.rs('getcellsid', cell.row, cell.col);

            // 剔除样式中的border，生成新的sid
            sid = this.rs('generate.border', null, sid);

            // 统一单元格样式
            this.rs('setsid', sid, start, end);

            this.postMessage('unlock');

            this.postMessage('all.dimension.change');
        },

        /**
         * 获取给定区域中，第一个有内容的单元格坐标。如果未找到有内容的单元格，则返回null。
         * @param start
         * @param end
         * @returns {*}
         * @private
         */
        __getFirstHasContentCell: function (start, end) {
            var cellData = this.getActiveSheet().cell;
            var rowsData = cellData.rows;

            var currentRow;
            var cells;

            for (var i = start.row, limit = end.row; i <= limit; i++) {
                currentRow = rowsData[i];

                if ($$.isNdef(currentRow) || $$.isNdef(currentRow.cells)) {
                    continue;
                }

                cells = currentRow.cells;

                for (var j = start.col, jlimit = end.col; j <= jlimit; j++) {
                    if ($$.isDefined(cells[j]) && $$.isDefined(cells[j].value)) {
                        return {
                            row: i,
                            col: j
                        };
                    }
                }
            }

            return null;
        },

        /**
         * 获取指定单元格的数据
         * @param row
         * @param col
         * @returns {*}
         * @private
         */
        __getCellData: function (row, col) {
            var rowsData = this.getActiveSheet().cell.rows;
            var currentRow = rowsData[row];

            if ($$.isNdef(currentRow) || $$.isNdef(currentRow.cells) || $$.isNdef(currentRow.cells[col])) {
                return null;
            }

            return currentRow.cells[col];
        },

        /**
         * 把给定给定目标单元格数据放置到指定的单元格位置
         * @private
         */
        __setCellData: function (targetCellData, row, col) {
            var rowsData = this.getActiveSheet().cell.rows;
            var currentRow = rowsData[row];

            if ($$.isNdef(currentRow)) {
                rowsData[row] = {
                    cells: []
                };

                currentRow = rowsData[row];
            }

            if ($$.isNdef(currentRow.cells)) {
                currentRow.cells = [];
            }

            currentRow.cells[col] = targetCellData;
        }
    });
});