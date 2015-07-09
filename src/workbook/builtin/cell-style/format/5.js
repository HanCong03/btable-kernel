/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var NONE = require('NONE');

    module.exports = {
        fonts: {
            color: {
                theme: 0,
                tint: 0
            },
            name: {
                type: 'minor'
            },
            bold: true,
            size: 11
        },
        fills: {
            fill: {
                value: '#a5a5a5'
            }
        },
        borders: {
            border: {
                top: {
                    style: 'double',
                    color: {
                        value: '#3f3f3f'
                    }
                },
                left: {
                    style: 'double',
                    color: {
                        value: '#3f3f3f'
                    }
                },
                right: {
                    style: 'double',
                    color: {
                        value: '#3f3f3f'
                    }
                },
                bottom: {
                    style: 'double',
                    color: {
                        value: '#3f3f3f'
                    }
                }
            }
        }
    };
});