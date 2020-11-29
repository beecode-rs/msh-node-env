"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectNameIsolation = void 0;
const util_1 = require("../util");
const _1 = require("./");
class ProjectNameIsolation extends _1.SimpleEnvLookup {
    constructor(projectName) {
        super();
        this._projectName = projectName;
    }
    getEnvStringValue(envName) {
        return (process.env[[util_1.stringUtil.toSnakeCase(this._projectName).toUpperCase(), envName].join('_')] ??
            super.getEnvStringValue(envName));
    }
}
exports.ProjectNameIsolation = ProjectNameIsolation;
//# sourceMappingURL=project-name-isolation.js.map