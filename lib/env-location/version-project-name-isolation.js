"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionProjectNameIsolation = void 0;
const project_name_isolation_1 = require("./project-name-isolation");
class VersionProjectNameIsolation extends project_name_isolation_1.ProjectNameIsolation {
    constructor(projectName, version) {
        super(projectName);
        this._version = version;
    }
    getEnvStringValue() {
        return process.env[[this._projectName.toUpperCase(), this._version, this.getEnvName()].join('_')] ?? super.getEnvStringValue();
    }
}
exports.VersionProjectNameIsolation = VersionProjectNameIsolation;
//# sourceMappingURL=version-project-name-isolation.js.map