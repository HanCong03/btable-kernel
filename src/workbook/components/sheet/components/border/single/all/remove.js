/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    var BORDER_LOCATION = require('../../definition/location');

    return {
        removeBorder: function (location) {
            switch (location) {
                case BORDER_LOCATION.TOP:
                case BORDER_LOCATION.BOTTOM:
                case BORDER_LOCATION.RIGHT:
                case BORDER_LOCATION.LEFT:
                case BORDER_LOCATION.OUTER:
                    // do nothing
                    break;

                case BORDER_LOCATION.INNER:
                    this.__removeInnerBorder();
                    break;
            }
        },

        __removeInnerBorder: function () {
            this.getModule('Border').unsetBorder({
            //this.rs('unset.border', {
                row: 0,
                col: 0
            }, {
                row: this.getConfig('MAX_ROW') - 1,
                col: this.getConfig('MAX_COLUMN') - 1
            });
        }
    };
});