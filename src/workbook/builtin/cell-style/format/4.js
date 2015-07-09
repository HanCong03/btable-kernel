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
            bold: true,
            size: 11
        },
        fills: {
            fill: {
                value: '#f2f2f2'
            }
        },
        borders: {
            border: {
                top: {
                    style: 'thin',
                    color: {
                        value: '#7f7f7f'
                    }
                },
                left: {
                    style: 'thin',
                    color: {
                        value: '#7f7f7f'
                    }
                },
                right: {
                    style: 'thin',
                    color: {
                        value: '#7f7f7f'
                    }
                },
                bottom: {
                    style: 'thin',
                    color: {
                        value: '#7f7f7f'
                    }
                }
            }
        }
    };
});