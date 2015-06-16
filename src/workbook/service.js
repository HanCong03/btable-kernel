/**
 * @file workbook api管理器
 * @author hancong03@baiud.com
 */

define(function (require) {
    return require('base/clazz').create('Service', {
        __$services: {},

        registerService: function (services) {
            for (var key in services) {
                if (!services.hasOwnProperty(key)) {
                    continue;
                }

                this.__$services[key] = services[key];
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
    });
});