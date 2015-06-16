/**
 * @file workbook api管理器
 * @author hancong03@baiud.com
 */

define(function (require) {
    return {
        __$messagess: {},

        onMessage: function (args) {
            var messages = this.__$messagess;

            for (var key in args) {
                if (!args.hasOwnProperty(key)) {
                    continue;
                }

                if (!messages[key]) {
                    messages[key] = [];
                }

                messages[key].push(args[key]);
            }
        },

        postMessage: function (name) {
            var listeners = this.__$messagess[name];

            if (!listeners) {
                return;
            }

            var args = [].slice.call(arguments, 1);

            listeners.forEach(function (current) {
                current.handler.apply(current.provider, args);
            });
        }
    };
});