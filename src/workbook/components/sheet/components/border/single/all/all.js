/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('utils').createClass('Border', {
        base: require('sheet-component'),
        mixin: [
            require('../../../common/style'),
            require('./add'),
            require('./remove'),
            require('./restrict-add'),
            require('./restrict-remove')
        ]
    });
});