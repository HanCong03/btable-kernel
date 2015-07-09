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
            var heap = this.getActiveHeap();

            if (!heap.cache) {
                heap.cache = [];
            }

            var cache = heap.cache;
            var StylePool = this.getModule('StylePool');

            var result = {};
            var row;
            var col;
            var key;
            var sid;

            for (var i = 0, len = rows.length; i < len; i++) {
                row = rows[i];
                for (var j = 0, jlen = cols.length; j < jlen; j++) {
                    col = cols[j];

                    if (!cache[row]) {
                        cache[row] = [];
                    }

                    if (!cache[row][col]) {
                        sid = this.getCellSid(row, col);

                        cache[row][col] = {
                            fonts: StylePool.getClassifyStyleDetailBySid('fonts', sid),
                            borders: StylePool.getClassifyStyleDetailBySid('borders', sid),
                            alignments: StylePool.getClassifyStyleDetailBySid('alignments', sid)
                        };
                    }

                    key = row + ',' + col;

                    result[key] = cache[row][col];
                }
            }

            return result;
        },

        __cleanCache: function (start, end) {
            var cache = this.getActiveHeap().cache;

            if (!cache) {
                return;
            }

            var rowCache;
            var startCol = start.cl;
            var endCol = end.col;
            var keys;

            for (var i = start.row, limit = end.row; i <= limit; i++) {
                rowCache = cache[i];

                if (!rowCache) {
                    continue;
                }

                keys = Object.keys(rowCache);

                if (rowCache.length === 0) {
                    continue;
                }

                // 整行删除
                if (startCol <= keys[0] && endCol >= keys[keys.length - 1]) {
                    delete cache[i];
                }

                for (var j = startCol; j <= endCol; j++) {
                    if (rowCache[j]) {
                        delete rowCache[j];
                    }
                }
            }
        }
    });
});