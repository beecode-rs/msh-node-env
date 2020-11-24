"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectNameIsolation = void 0;
const string_util_1 = require("../util/string-util");
const simple_env_lookup_1 = require("./simple-env-lookup");
class ProjectNameIsolation extends simple_env_lookup_1.SimpleEnvLookup {
    constructor(projectName) {
        super();
        this._projectName = projectName;
    }
    getEnvStringValue(envName) {
        return (process.env[[string_util_1.stringUtil.toSnakeCase(this._projectName).toUpperCase(), envName].join('_')] ??
            super.getEnvStringValue(envName));
    }
}
exports.ProjectNameIsolation = ProjectNameIsolation;
//# sourceMappingURL=project-name-isolation.js.map