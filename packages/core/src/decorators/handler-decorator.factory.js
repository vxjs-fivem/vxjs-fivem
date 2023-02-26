"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHandlerDecorator = void 0;
var reflector_1 = require("../metadata/reflector");
var createHandlerDecorator = function (key, argsTransformer) {
    var handler = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var decorator = function (target, method) {
            reflector_1.Reflector.setMethodMetadata(target, method, key, argsTransformer.apply(void 0, args));
        };
        return decorator;
    };
    handler.getMetadata = function (target) {
        return reflector_1.Reflector.getCustomMethodMetadata(target, key);
    };
    return handler;
};
exports.createHandlerDecorator = createHandlerDecorator;
//# sourceMappingURL=handler-decorator.factory.js.map