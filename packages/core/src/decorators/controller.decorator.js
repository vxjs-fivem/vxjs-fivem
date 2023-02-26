"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
var reflector_1 = require("../metadata/reflector");
var Controller = function (name) {
    return function (target) {
        reflector_1.Reflector.setClassMetadata(target, 'CONTROLLER', {
            name: name !== null && name !== void 0 ? name : target.name.replace('Controller', ''),
        });
    };
};
exports.Controller = Controller;
//# sourceMappingURL=controller.decorator.js.map