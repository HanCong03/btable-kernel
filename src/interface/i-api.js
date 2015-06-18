/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    module.exports = require('../base/clazz').create('IApi', {
        __$apis: {},

        registerAPI: function (provider, name, handler) {
            if (typeof name === 'object') {
                for (var key in name) {
                    if (!name.hasOwnProperty(key)) {
                        continue;
                    }

                    this.__register(provider, key, name[key]);
                }
            } else {
                this.__register(provider, name, handler);
            }
        },

        __register: function (provider, name, handler) {
            this.__$apis[name] = function () {
                return handler.apply(provider, arguments);
            };
        },

        getAPI: function () {
            return this.__$apis;
        }
    });
});