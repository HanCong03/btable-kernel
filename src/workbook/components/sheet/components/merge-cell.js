/**
 * @file 内容组件，维护单元格内容
 * @author hancong03@baiud.com
 */

define(function (require) {
    var WorkbookUtils = require('workbook-utils');

    return require('utils').createClass('MergeCell', {
        base: require('sheet-component'),

        init: function () {
            this.__initAPI();
        },

        __initAPI: function () {
            this.registerAPI({
                mergeCell: this.mergeCell,
                unmergeCell: this.unmergeCell,
                toggleMergeCell: this.toggleMergeCell
            });
        },

        /**
         * 合并给定的区域。如果给定的区域内已经存在合并后的单元格，
         * 则取消该区域内所有的合并单元格后，再对该区域进行重新合并。
         * @param start 合并区域起始点
         * @param end 合并区域结束点
         * @return
         */
        mergeCell: function (start, end) {
            var mergedKeys = this.__getMergeCells(start, end);

            // 区域内存在合并单元格，则删除这些单元格的合并记录。
            if (mergedKeys) {
                this.__deleteMergeRecord(mergedKeys);
            }

            this.postMessage('lock');

            // 获取合并区域的边框值
            var borderOptions = this.rs('getouterborder', start, end);

            // 添加新的合并记录
            this.__addMergeRecord(start, end);
            // 同步样式
            this.rs('synccell', start, end);

            // 设置边框
            this.rs('add.border.top', borderOptions.top, start, end);
            this.rs('add.border.right', borderOptions.right, start, end);
            this.rs('add.border.bottom', borderOptions.bottom, start, end);
            this.rs('add.border.left', borderOptions.left, start, end);

            this.postMessage('unlock');

            this.postMessage('all.dimension.change');
        },

        unmergeCell: function (start, end) {
            var mergedKeys = this.__getMergeCells(start, end);

            if (!mergedKeys) {
                return;
            }

            this.__deleteMergeRecord(mergedKeys);

            this.postMessage('all.dimension.change');
        },

        toggleMergeCell: function (start, end) {
            var mergedKeys = this.__getMergeCells(start, end);

            if (mergedKeys) {
                this.__deleteMergeRecord(mergedKeys);
            } else {
                this.postMessage('lock');

                // 添加新的合并记录
                this.__addMergeRecord(start, end);
                // 同步样式
                this.rs('synccell', start, end);

                this.postMessage('unlock');
            }

            this.postMessage('all.dimension.change');
        },

        __deleteMergeRecord: function (mergedKeys) {
            var mergeCells = this.getActiveSheet().mergeCells;

            for (var key in mergedKeys) {
                if (!mergedKeys.hasOwnProperty(key)) {
                    continue;
                }

                // 删除合并记录
                delete mergeCells[key];
            }
        },

        __addMergeRecord: function (start, end) {
            var mergeCells = this.getActiveSheet().mergeCells;

            mergeCells[WorkbookUtils.rowColToIndex(start.row, start.col)] = {
                start: start,
                end: end
            };
        },

        /**
         * 获取指定区域内被合并单元格的合并信息。
         * 如果指定的区域内不存在合并的单元格，则返回null。否则，返回一个map，其每一个元素记录了一条合并信息。
         * 查找的顺序以行为主。
         * @param start
         * @param end
         * @returns {{}}
         * @private
         */
        __getMergeCells: function (start, end) {
            var merged = {};
            var hasMerged = false;
            var mergeCells = this.getActiveSheet().mergeCells;

            var current = {
                start: start,
                end: end
            }

            for (var key in mergeCells) {
                if (!mergeCells.hasOwnProperty(key)) {
                    continue;
                }

                // 两矩形相交
                if (isIntersection(current, mergeCells[key])) {
                    hasMerged = true;
                    merged[key] = mergeCells[key];
                }
            }

            return hasMerged ? merged : null;
        }
    });

    function isIntersection(rect1, rect2) {
        var ya1 = rect1.start.row;
        var ya2 = rect1.end.row;
        var yb1 = rect2.start.row;
        var yb2 = rect2.end.row;

        if (Math.abs(yb2 + yb1 - ya2 - ya1) > ya2 - ya1 + yb2 - yb1) {
            return false;
        }

        var xa1 = rect1.start.col;
        var xa2 = rect1.end.col;
        var xb1 = rect2.start.col;
        var xb2 = rect2.end.col;

        if (Math.abs(xb2 + xb1 - xa2 - xa1) > xa2 - xa1 + xb2 - xb1) {
            return false;
        }

        return true;
    }
});