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
        }
    });
});