/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    module.exports = {
        clearAll: function (start, end) {
            this.postMessage('lock');

            this.__clearContent(start, end);
            this.__clearComment(start, end);
            this.__clearHyperlink(start, end);
            this.__clearStyle(start, end);

            this.postMessage('unlock');

            this.postMessage('all.dimension.change');
        },

        __clearStyle: function (start, end) {
            this.getModule('Style').clearStyle(start, end);
            //this.rs('clearstyle', start, end);
        },

        __clearContent: function (start, end) {
            this.getModule('Content').clearContent(start, end);
        },

        __clearComment: function (start, end) {},

        __clearHyperlink: function (start, end) {}
    };
});