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
            this.__initAPI();
        },

        __initMessage: function () {
            this.onMessage({
                'stylechange': this.__cleanCache
            });
        },

        __initAPI: function () {
            this.registerAPI({
                getBatchStyle: this.getBatchStyle
            });
        },

        getBatchStyle: function (cells) {
            var heap = this.getActiveHeap();

            if (!heap.cache) {
                heap.cache = {};
            }

            var cache = heap.cache;
            var StylePool = this.getModule('StylePool');

            var result = {};
            var row;
            var col;
            var key;
            var sid;

            for (var i = 0, len = cells.length; i < len; i++) {
                col = cells[i];
                row = col.row;
                col = col.col;

                key = row + ',' + col;

                if (!cache[key]) {
                    sid = this.getCellSid(row, col);
                    cache[key] = StylePool.getStyleDetailBySid(sid);
                }

                result[key] = cache[key];
            }

            return result;
        },

        __cleanCache: function (start, end) {
            var cache = this.getActiveHeap().cache;

            if (!cache) {
                return;
            }

            $$.iterator(start, end, function (row, col) {
                var key = row + ',' + col;

                if (cache[key]) {
                    cache[key] = undefined;
                }
            });
        }
    });
});