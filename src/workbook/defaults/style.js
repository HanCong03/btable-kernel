/**
 * @file 默认样式定义
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var NONE = require('NONE');
    var BUILTIN_THEMES = $$.clone(require('../builtin/theme/theme'));

    module.exports = {
        numfmts: {
            numfmt: NONE
        },
        fonts: {
            // color: '#000000'
            color: {
                theme: 1,
                tint: 0,
                value: '#' + BUILTIN_THEMES['office'].color.values[1]
            },
            // name: '宋体'
            name: {
                type: 'minor',
                value: BUILTIN_THEMES['office'].font.minor.ea
            },
            bold: false,
            italic: false,
            // underline: "single" or "double" or "none"
            underline: NONE,
            throughline: false,
            size: 11
        },
        fills: {
            fill: NONE
        },
        borders: {
            border: {
                top: NONE,
                left: NONE,
                right: NONE,
                bottom: NONE
            }
        },
        alignments: {
            wraptext: false,
            horizontal: NONE,
            vertical: NONE
        }
    };
});