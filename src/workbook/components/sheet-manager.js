/**
 * @file 名称定义组件
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');

    return $$.createClass('Name', {
        base: require('../interface/i-workbook-component'),

        init: function () {
            this.__initAPI();
        },

        __initAPI: function () {
            this.registerAPI({
                addSheet: this.addSheet
            });
        },

        addSheet: function (sheetName) {
            var sheetData = this.getActiveSheet();

        }
    });
});