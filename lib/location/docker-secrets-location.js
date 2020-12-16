"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DockerSecretsLocation = void 0;
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
class DockerSecretsLocation {
    getValueByName(name) {
        try {
            return fs_1.default.readFileSync(util_1.default.format('/run/secrets/%s', name), 'utf8').trim();
        }
        catch (e) {
            return undefined;
        }
    }
}
exports.DockerSecretsLocation = DockerSecretsLocation;
//# sourceMappingURL=docker-secrets-location.js.map