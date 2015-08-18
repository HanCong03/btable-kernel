/**
 * @file 提供标准参考数据。如：标准字体，标准字号等
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var STANDARD_VALUE = require('../../../definition/standard');

    return $$.createClass('Standard', {
        base: require('sheet-component'),

        init: function () {
            this.__initAPI();
            this.__initEvent();
        },

        __initAPI: function () {
            this.registerAPI({
                getStandardFontSize: this.getStandardFontSize,
                getStandardFont: this.getStandardFont,
                getStandardColor: this.getStandardColor,
                getStandardWidth: this.getStandardWidth,
                getStandardHeight: this.getStandardHeight
            });
        },

        __initEvent: function () {
            this.onMessage({
                'defaultrowheightchange': this.__onChange,
                'defaultcolumnwidthchange': this.__onChange
            });
        },

        __onChange: function () {
            this.postMessage('standardchange');
        },

        getStandardFontSize: function () {
            return this.getWorkbook().stylePool.fonts[0].name.size;
        },

        getStandardFont: function () {
            return this.getWorkbook().stylePool.fonts[0].name.value;
        },

        getStandardColor: function () {
            return this.getWorkbook().stylePool.fonts[0].color.value;
        },

        getStandardWidth: function () {
            var defaultWidth = this.getModule('View').getDefaultColumnWidth();
            return defaultWidth || STANDARD_VALUE.width;
        },

        getStandardHeight: function () {
            var defaultHeight = this.getModule('View').getDefaultRowHeight();
            return defaultHeight || STANDARD_VALUE.height;
        }
    });
});