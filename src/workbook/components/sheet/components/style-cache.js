/**
 * @file 样式缓存管理器管理
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('StyleCache', {
        base: require('sheet-component'),

        mixin: [
            require('./common/style')
        ],

        init: function () {
            this.__initMessage();
            this.__initService();
        },

        __initMessage: function () {
            this.onMessage({
                'stylechange': this.__cleanCache
            });
        },

        __initService: function () {
            this.registerService([
                'getRenderStyle'
            ]);
        },

        getRenderStyle: function (rows, cols) {
            var StylePool = this.getModule('StylePool');
            var Style = this.getModule('Style');

            var result = {};
            var row;
            var col;
            var key;
            var sid;

            for (var i = 0, len = rows.length; i < len; i++) {
                row = rows[i];
                for (var j = 0, jlen = cols.length; j < jlen; j++) {
                    col = cols[j];
                    key = row + ',' + col;

                    sid = this.getCellSid(row, col);

                    result[key] = {
                        fonts: StylePool.getClassifyStyleDetailBySid('fonts', sid),
                        borders: StylePool.getClassifyStyleDetailBySid('borders', sid),
                        alignments: StylePool.getClassifyStyleDetailBySid('alignments', sid),
                        fills: StylePool.getClassifyStyleDetailBySid('fills', sid)
                    };
                }
            }

            return result;
        },

        __cleanCache: function (start, end) {
            //var heap = this.getActiveHeap();
            //var cache = heap.cache;
            //
            //if (!cache) {
            //    return;
            //}
            //
            //var rowCache;
            //var startCol = start.cl;
            //var endCol = end.col;
            //var keys;
            //
            //var rangeType = WorkbookUtils.getRangeType(start, end);
            //
            //switch (rangeType) {
            //    case 'all':
            //        heap.cache = [];
            //        break;
            //
            //    case 'col':
            //        //this.__cleanColumnCache(start.col, end.col);
            //        break;
            //
            //    case 'row':
            //        for (var i = start.row, limit = end.row; i <= limit; i++) {
            //            delete cache[i];
            //        }
            //        break;
            //
            //    case 'range':
            //        this.rangeStyle.setStyle(styleName, styleValue, start, end);
            //        break;
            //}
            //
            //for (var i = start.row, limit = end.row; i <= limit; i++) {
            //    rowCache = cache[i];
            //
            //    if (!rowCache) {
            //        continue;
            //    }
            //
            //    keys = Object.keys(rowCache);
            //
            //    if (keys.length === 0) {
            //        continue;
            //    }
            //
            //    // 整行删除
            //    if (startCol <= keys[0] && endCol >= keys[keys.length - 1]) {
            //        delete cache[i];
            //    }
            //
            //    for (var j = startCol; j <= endCol; j++) {
            //        if (rowCache[j]) {
            //            delete rowCache[j];
            //        }
            //    }
            //}
        }
    });
});