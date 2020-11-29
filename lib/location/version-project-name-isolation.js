"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionProjectNameIsolation = void 0;
const project_name_isolation_1 = require("./project-name-isolation");
class VersionProjectNameIsolation extends project_name_isolation_1.ProjectNameIsolation {
    constructor(params) {
        super(params.projectName);
        this._version = params.version;
    }
    get __Version() {
        return this._version.split('.').join('_');
    }
    __envProjectVersionName(envName) {
        return [this._ProjectName, this.__Version, envName].join('_');
    }
    getEnvStringValue(envName) {
        return process.env[this.__envProjectVersionName(envName)] ?? super.getEnvStringValue(envName);
    }
}
exports.VersionProjectNameIsolation = VersionProjectNameIsolation;
//# sourceMappingURL=version-project-name-isolation.js.map