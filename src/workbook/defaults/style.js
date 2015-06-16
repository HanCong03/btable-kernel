/**
 * @file 默认样式定义
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var NONE = require('NONE');
    var BUILTIN_THEMES = $$.clone(require('../builtin/theme/theme'));
    var DEFAULT_BORDER_VALUE = require('./border-value');

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
            underline: false,
            throughline: false,
            size: 13
        },
        fills: {
            fill: NONE
        },
        borders: {
            border: {
                top: DEFAULT_BORDER_VALUE,
                left: DEFAULT_BORDER_VALUE,
                right: DEFAULT_BORDER_VALUE,
                bottom: DEFAULT_BORDER_VALUE
            }
        },
        alignments: {
            wraptext: false,
            horizontal: NONE,
            vertical: NONE
        }
    };
});