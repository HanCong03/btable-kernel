/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');
    var Workbook = require('./workbook/workbook');

    return $$.createClass('WorkbookFacade', {
        __$workbook: null,

        constructor: function (config) {
            this.__$workbook = new Workbook(this, config);
            this.__attachAPI();
        },

        __attachAPI: function () {
            var apis = this.__$workbook.getAPI();

            for (var key in apis) {
                if (!apis.hasOwnProperty(key)) {
                    continue;
                }

                console.log(key)

                this[key] = apis[key];
            }
        }
    });
});