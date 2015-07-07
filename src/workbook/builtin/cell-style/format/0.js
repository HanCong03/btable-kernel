/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var NONE = require('NONE');

    module.exports = {
        numfmts: {
            numfmt: NONE
        },
        fonts: {
            // color: '#000000'
            color: {
                theme: 1,
                tint: 0
            },
            // name: '宋体'
            name: {
                type: 'minor'
            },
            bold: false,
            italic: false,
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