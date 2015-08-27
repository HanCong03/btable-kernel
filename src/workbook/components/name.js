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
                getAllNameDefine: this.getAllNameDefine,
                defineName: this.defineName,
                getNameDefine: this.getNameDefine,
                getName: this.getName
            });
        },

        getAllNameDefine: function () {
            var namesData = this.getWorkbook().names;

            return $$.clone(namesData);
        },

        defineName: function (name, ref, refSheet, scope, comment) {
            var namesData = this.getWorkbook().names;

            if (namesData[name]) {
                return false;
            }

            if (!name || !ref || refSheet === undefined) {
                return false;
            }

            namesData[name] = {
                ref: ref,
                sheet: refSheet,
                scope: scope,
                comment: comment
            };

            this.postMessage('namedefinechange');
            this.postMessage('kerneldatachange');
        },

        getNameDefine: function (name) {
            var namesData = this.getWorkbook().names;

            return namesData[name] || null;
        },

        getName: function (name, scope) {
            var namesData = this.getWorkbook().names;

            var nameDefine = namesData[name];

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