/**
 * @file 提供标准参考数据。如：标准字体，标准字号等
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var BUILTIN_CELLSTYLES = require('../builtin/cell-style/cell-style');

    return $$.createClass('Builtin', {
        base: require('../interface/i-workbook-component'),

        getBuiltinCellStyles: function () {
            return $$.clone(BUILTIN_CELLSTYLES);
        }
    });
});