"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentLocation = void 0;
class EnvironmentLocation {
    getValueByName(name) {
        return process.env[name];
    }
}
exports.EnvironmentLocation = EnvironmentLocation;
//# sourceMappingURL=environment-location.js.map