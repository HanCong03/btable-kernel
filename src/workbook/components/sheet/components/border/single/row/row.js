/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var NONE = require('NONE');

    return require('base/clazz').create('Border', {
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

        __checkBoundary: function (startRow, endRow) {
            if (startRow < 0 || endRow > this.getConfig('MAX_ROW') - 1) {
                return false;
            }

            return true;
        }
    });
});