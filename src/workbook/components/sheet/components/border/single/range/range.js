/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var NONE = require('NONE');

    return $$.createClass('Border', {
        base: require('sheet-component'),

        mixin: [
            require('../../../common/style'),
            require('./add'),
            require('./remove'),
            require('./restrict-add'),
            require('./restrict-remove')
        ],

        /**
         * 检查给定的样式detail里在指定位置上是否包含有效边框
         * @param details
         * @returns {boolean}
         * @private
         */
        __hasBorder: function (location, details) {
            /* --- 空检查 startIndex --- */
            if ($$.isNdef(details)) {
                return false;
            }

            details = details.border;

            if ($$.isNdef(details) || details[location] === NONE) {
                return false;
            }

            return true;
        },

        __checkBoundary: function (start, end) {
            if (start.row < 0 || start.col < 0) {
                return false;
            }

            if (end.row > this.getConfig('MAX_ROW') - 1 || end.col > this.getConfig('MAX_COLUMN') - 1) {
                return false;
            }

            return true;
        }
    });
});