/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    module.exports = require('utils').createClass('ICommand', {
        __$apis: null,

        constructor: function (apis) {
            this.__$apis = apis;
            this.init();
        },

        init: function () {},

        getAPI: function () {
            return this.__$apis;
        }
    });
});