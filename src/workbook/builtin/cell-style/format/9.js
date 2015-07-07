/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var NONE = require('NONE');

    module.exports = {
        fonts: {
            color: '#3f3f3f',
            name: {
                type: 'minor'
            },
            bold: true,
            size: 11
        },
        fills: {
            fill: '#f2f2f2'
        },
        borders: {
            border: {
                top: {
                    style: 'thin',
                    color: '#3f3f3f'
                },
                left: {
                    style: 'thin',
                    color: '#3f3f3f'
                },
                right: {
                    style: 'thin',
                    color: '#3f3f3f'
                },
                bottom: {
                    style: 'thin',
                    color: '#3f3f3f'
                }
            }
        }
    };
});