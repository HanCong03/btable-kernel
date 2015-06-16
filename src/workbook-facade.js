/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var Workbook = require('./workbook/workbook');

    return $$.createClass('WorkbookFacade', {
        __$workbook: null,

        constructor: function () {
            this.__$workbook = new Workbook(this);
            this.__attachAPI();
        },

        __attachAPI: function () {
            var apis = this.__$workbook.getAPI();

            for (var key in apis) {
                if (!apis.hasOwnProperty(key)) {
                    continue;
                }

                this[key] = apis[key];
            }
        }
    });
});