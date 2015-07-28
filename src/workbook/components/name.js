/**
 * @file 名称定义组件
 * @author hancong03@baiud.com
 */

define(function (require) {
    var $$ = require('utils');

    return $$.createClass('Name', {
        base: require('../interface/i-workbook-component'),

        init: function () {
            this.__initAPI();
        },

        __initAPI: function () {
            this.registerAPI({
                defineName: this.defineName,
                getNameDefine: this.getNameDefine,
                getName: this.getName
            });
        },

        defineName: function (name, ref, refSheet, scope, comment) {
            var sheetData = this.getActiveSheet();

            if (sheetData[name]) {
                return false;
            }

            if (!name || !ref || refSheet === undefined) {
                return false;
            }

            sheetData[name] = {
                ref: ref,
                sheet: refSheet,
                scope: scope,
                comment: comment
            };
        },

        getNameDefine: function (name) {
            var sheetData = this.getActiveSheet();
            return sheetData[name] || null;
        },

        getName: function (name, scope) {
            var sheetData = this.getActiveSheet();
            var nameDefine = sheetData[name];

            if (!nameDefine) {
                return false;
            }

            if (!nameDefine.scope || nameDefine.scope === scope) {
                return nameDefine;
            }

            return null;
        }
    });
});