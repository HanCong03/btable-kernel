/**
 * @file workbook api管理器
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    module.exports = {
        __$services: {},

        registerService: function (provider, services) {
            for (var key in services) {
                if (!services.hasOwnProperty(key)) {
                    continue;
                }

                this.__$services[key] = {
                    handler: services[key],
                    provider: provider
                };
            }
        },

        rs: function (name) {
            var args = [].slice.call(arguments, 1);

            var service = this.__$services[name];

            if (!service) {
                throw new Error('service not found: ' + name);
            }

            return service.handler.apply(service.provider, args);
        }
    };
});