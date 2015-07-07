/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var NONE = require('NONE');

    module.exports = {
        fonts: {
            color: {
                theme: 3,
                tint: 0
            },
            name: {
                type: 'minor'
            },
            bold: true,
            size: 15
        },
        borders: {
            border: {
                top: NONE,
                left: NONE,
                right: NONE,
                bottom: {
                    style: 'thick',
                    color: {
                        theme: 4,
                        thint: 0
                    }
                }
            }
        }
    };
});