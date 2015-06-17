/**
 * @file workbook api管理器
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    module.exports = {
        __$messagess: {},

        onMessage: function (provider, args) {
            var messages = this.__$messagess;

            for (var key in args) {
                if (!args.hasOwnProperty(key)) {
                    continue;
                }

                if (!messages[key]) {
                    messages[key] = [];
                }

                messages[key].push({
                    provider: provider,
                    handler: args[key]
                });
            }
        },

        postMessage: function (name) {
            var listeners = this.__$messagess[name];
            var allListeners = this.__$messagess['*'];

            if (!listeners && !allListeners) {
                return;
            }

            listeners = (listeners || []).concat(allListeners || []);

            var args = [].slice.call(arguments, 0);

            listeners.forEach(function (current) {
                current.handler.apply(current.provider, args);
            });
        }
    };
});