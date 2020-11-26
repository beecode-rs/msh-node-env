"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleEnvLookup = void 0;
class SimpleEnvLookup {
    getEnvStringValue(envName) {
        return process.env[envName];
    }
}
exports.SimpleEnvLookup = SimpleEnvLookup;
//# sourceMappingURL=simple-env-lookup.js.map