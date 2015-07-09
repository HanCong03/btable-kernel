/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var NONE = require('NONE');

    module.exports = {
        fonts: {
            color: {
                value: '#fa7d00'
            },
            name: {
                type: 'minor'
            },
            size: 11
        },
        borders: {
            border: {
                top: NONE,
                left: NONE,
                right: NONE,
                bottom: {
                    style: 'double',
                    color: {
                        value: '#ff8001'
                    }
                }
            }
        }
    };
});