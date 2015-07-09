/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var NONE = require('NONE');

    module.exports = {
        fonts: {
            color: {
                value: '#3f3f76'
            },
            name: {
                type: 'minor'
            },
            size: 11
        },
        fills: {
            fill: {
                value: '#ffcc99'
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