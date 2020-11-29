"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionProjectNameIsolation = void 0;
const project_name_isolation_1 = require("./project-name-isolation");
class VersionProjectNameIsolation extends project_name_isolation_1.ProjectNameIsolation {
    constructor(projectName, version) {
        super(projectName);
        this._version = version;
    }
    getEnvStringValue(envName) {
        return process.env[[this._projectName.toUpperCase(), this._version, envName].join('_')] ?? super.getEnvStringValue(envName);
    }
}
exports.VersionProjectNameIsolation = VersionProjectNameIsolation;
//# sourceMappingURL=version-project-name-isolation.js.map