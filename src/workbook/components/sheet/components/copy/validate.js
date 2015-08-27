/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {

    module.exports = {
        __writableRange: function (range) {
            var contentModule = this.getModule('Content');
            return contentModule.isSafeRange(range);
        }
    };
});