/**
 * @file workbook service管理器
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = {
        __$services: {},

        registerService: function (provider, services) {
            var name = provider.___className;
            var pool = this.__$services[name] || {};

            this.__$services[name] = pool;

            $$.forEach(services, function (serviceName) {
                pool[serviceName] = function () {
                    return provider[serviceName].apply(provider, arguments);
                };
            });
        },

        getModule: function (name) {
            return this.__$services[name];
        }
    };
});