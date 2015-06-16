/**
 * @file workbook 数据模型定义
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var DEFAULTS_STYLE = $$.clone(require('../../defaults/style'));
    var BUILTIN_THEMES = require('../../builtin/theme/theme');

    module.exports = {
        active: 0,
        readonly: false,
        sheetNames: [],
        sheets: [],
        theme: $$.clone(BUILTIN_THEMES['office']),
        stylePool: {
            numfmts: [DEFAULTS_STYLE.numfmts],
            fonts: [DEFAULTS_STYLE.fonts],
            fills: [DEFAULTS_STYLE.fills],
            borders: [DEFAULTS_STYLE.borders],
            alignments: [DEFAULTS_STYLE.alignments]
        },
        styleGroup: [{
            numfmts: 0,
            fonts: 0,
            fills: 0,
            borders: 0,
            alignments: 0,
            xf: 0,

            applyNumfmt: 0,
            applyFont: 0,
            applyFill: 0,
            applyBorder: 0,
            applyAlignment: 0
        }],
        cellStyleGroup: [{
            numfmts: 0,
            fonts: 0,
            fills: 0,
            borders: 0,
            alignments: 0,

            applyNumfmt: 1,
            applyFont: 1,
            applyFill: 1,
            applyBorder: 1,
            applyAlignment: 1
        }],
        cellStyles: [{
            name: '常规',
            xfId: 0,
            //custom: 1,
            builtinId: 0
        }]
    };
});