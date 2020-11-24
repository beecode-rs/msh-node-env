"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectNameIsolation = void 0;
const simple_env_lookup_1 = require("./simple-env-lookup");
class ProjectNameIsolation extends simple_env_lookup_1.SimpleEnvLookup {
    constructor(projectName) {
        super();
        this._projectName = projectName;
    }
    getEnvStringValue() {
        return (process.env[[this.__toSnakeCase(this._projectName).toUpperCase(), this.getEnvName()].join('_')] ?? super.getEnvStringValue());
    }
    __toSnakeCase(str) {
        return (str &&
            (str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) || [])
                .map((x) => x.toLowerCase())
                .join('_'));
    }
}
exports.ProjectNameIsolation = ProjectNameIsolation;
//# sourceMappingURL=project-name-isolation.js.map