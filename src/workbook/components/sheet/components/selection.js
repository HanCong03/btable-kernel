/**
 * @file 选区组件
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');

    return $$.createClass('Selection', {
        base: require('sheet-component'),

        init: function () {
            this.registerAPI({
                setRange: this.setRange,
                addRange: this.addRange,
                updateRange: this.updateRange,
                updateFocus: this.updateFocus,
                upRange: this.upRange,
                downRange: this.downRange,
                getActiveRange: this.getActiveRange,
                getRanges: this.getRanges
            });
        },

        setRange: function (start, end, entry) {
            var sheetData = this.getActiveSheet();

            sheetData.selections = [$$.clone({
                start: start,
                end: end,
                entry: entry || start
            })];

            this.postMessage('rangechange');
        },

        addRange: function (start, end, entry) {
            var sheetData = this.getActiveSheet();

            sheetData.selections.push($$.clone({
                start: start,
                end: end,
                entry: entry || start
            }));

            this.postMessage('rangechange');
        },

        updateRange: function (start, end, entry) {
            var sheetData = this.getActiveSheet();
            var selections = sheetData.selections;

            var range = selections[selections.length - 1];

            range.start = {
                row: start.row,
                col: start.col
            };

            range.end = {
                row: end.row,
                col: end.col
            };

            if (entry) {
                range.entry = {
                    row: entry.row,
                    col: entry.col
                };
            }

            this.postMessage('rangechange');
        },

        updateFocus: function (row, col) {
            var sheetData = this.getActiveSheet();
            var selections = sheetData.selections;
            var range = selections[selections.length - 1];
            var rangeStart = range.start;
            var rangeEnd = range.end;

            if (row >= rangeStart.row && col >= rangeStart.col
                && row <= rangeEnd.row && col <= rangeEnd.col) {
                range.entry = {
                    row: row,
                    col: col
                };

                this.postMessage('rangechange');
            }
        },

        /**
         * 提升选区操作
         * 注1：提升选区会使得最老的选区被提升为活动选区。
         * 注2：如果当前仅有一个选区，则该操作什么也不做。
         */
        upRange: function () {
            var sheetData = this.getActiveSheet();
            var selections = sheetData.selections;

            if (selections.length === 1) {
                return;
            }

            var oldRange = selections.shift();
            selections.push(oldRange);

            this.postMessage('rangechange');
        },

        /**
         * 降低选区操作
         * 注1：降低选区会使得当前的活动选区成为最老的选区，同时，次新的选区将成为活动选区。
         * 注2：如果当前仅有一个选区，则该操作什么也不做。
         */
        downRange: function () {
            var sheetData = this.getActiveSheet();
            var selections = sheetData.selections;

            if (selections.length === 1) {
                return;
            }

            var activeRange = selections.pop();
            selections.unshift(activeRange);

            this.postMessage('rangechange');
        },

        getActiveRange: function () {
            var selections = this.getActiveSheet().selections;
            return selections[selections.length - 1];
        },

        getRanges: function () {
            return this.getActiveSheet().selections;
        }
    });
});