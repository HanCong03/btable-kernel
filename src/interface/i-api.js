/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    module.exports = require('../base/clazz').create('IApi', {
        __$apis: [],

        registerAPI: function (name, apiHandler) {
            if (typeof name === 'object') {
                for (var key in name) {
                    if (!name.hasOwnProperty(key)) {
                        continue;
                    }

                    this.__register(key, name[key]);
                }
            } else {
                this.__register(name, apiHandler);
            }
        },

        __register: function (name, apiHandler) {
            this.__$apis[name] = function () {
                return apiHandler.handler.apply(apiHandler.provider, arguments);
            };
        },

        getAPI: function () {
            return this.__$apis;
        }
    });
});