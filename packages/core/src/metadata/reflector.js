"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reflector = void 0;
var Reflector = /** @class */ (function () {
    function Reflector() {
    }
    Reflector.getClass = function (target) {
        return (typeof target === 'function' ? target : target.constructor);
    };
    Reflector.bindMethod = function (target, method) {
        var _a, _b, _c;
        var _d, _e, _f, _g;
        (_a = target[_d = this._metadataBackingFiled]) !== null && _a !== void 0 ? _a : (target[_d] = {});
        (_b = (_e = target[this._metadataBackingFiled])[_f = this._boundMethodsMetadataKey]) !== null && _b !== void 0 ? _b : (_e[_f] = {});
        (_c = (_g = target[this._metadataBackingFiled][this._boundMethodsMetadataKey])[method]) !== null && _c !== void 0 ? _c : (_g[method] = target[method].bind(target));
        return target[this._metadataBackingFiled][this._boundMethodsMetadataKey][method];
    };
    Reflector.setClassMetadata = function (target, key, value) {
        var metadata = {
            kind: 'class',
            value: value,
        };
        this.getCustomMetadata(target, key).push(metadata);
    };
    Reflector.setMethodMetadata = function (target, method, key, value) {
        var metadata = {
            method: method,
            kind: 'method',
            value: value,
        };
        this.getCustomMetadata(target, key).push(metadata);
    };
    Reflector.getCustomMetadata = function (target, key) {
        var _a, _b, _c;
        var _d, _e, _f, _g;
        var ctor = this.getClass(target);
        (_a = ctor[_d = this._metadataBackingFiled]) !== null && _a !== void 0 ? _a : (ctor[_d] = {});
        (_b = (_e = ctor[this._metadataBackingFiled])[_f = this._customMetadataKey]) !== null && _b !== void 0 ? _b : (_e[_f] = {});
        (_c = (_g = ctor[this._metadataBackingFiled][this._customMetadataKey])[key]) !== null && _c !== void 0 ? _c : (_g[key] = []);
        return ctor[this._metadataBackingFiled][this._customMetadataKey][key];
    };
    Reflector.getCustomClassMetadata = function (target, key) {
        return this.getCustomMetadata(target, key).filter(function (x) { return x.kind === 'class'; });
    };
    Reflector.getCustomMethodMetadata = function (target, key) {
        return this.getCustomMetadata(target, key).filter(function (x) { return x.kind === 'method'; });
    };
    Reflector._metadataBackingFiled = 'METADATA_BACKING_FIELD';
    Reflector._boundMethodsMetadataKey = 'BOUND_METHODS';
    Reflector._customMetadataKey = 'CUSTOM_METADATA';
    return Reflector;
}());
exports.Reflector = Reflector;
//# sourceMappingURL=reflector.js.map