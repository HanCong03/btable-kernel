/**
 * @file border组件
 * @author hancong03@baiud.com
 */

define(function (require) {
    var AllBorder = require('./all/border');
    var SingleBorder = require('./single/border');
    var BorderReader = require('./reader/border');

    return require('base/clazz').create('Border', {
        base: require('sheet-component'),

        allBorder: null,
        singleBorder: null,
        borderReader: null,

        init: function () {
            this.allBorder = this.createComponent(AllBorder);
            this.singleBorder = this.createComponent(SingleBorder);
            this.borderReader = this.createComponent(BorderReader);
        }
    });
});