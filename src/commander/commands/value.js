/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('base/clazz').create({

        base: require('../i-command'),

        $deps: 'value',

        $exec: ['write'],

        exec_write: function (value, contentType, row, col) {
            this.getAPI().write(value, contentType, row, col);
        }
    });
});