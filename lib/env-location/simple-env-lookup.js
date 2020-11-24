"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleEnvLookup = void 0;
class SimpleEnvLookup {
    setEnvName(envName) {
        this.__envName = envName;
    }
    getEnvName() {
        if (typeof this.__envName === 'undefined')
            throw new Error('ENV value not set');
        return this.__envName;
    }
    getEnvStringValue() {
        return process.env[this.getEnvName()];
    }
}
exports.SimpleEnvLookup = SimpleEnvLookup;
//# sourceMappingURL=simple-env-lookup.js.map