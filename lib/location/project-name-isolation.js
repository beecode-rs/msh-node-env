"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectNameIsolation = void 0;
const _1 = require(".");
const util_1 = require("../util");
class ProjectNameIsolation extends _1.SimpleEnvLookup {
    constructor(projectName) {
        super();
        this._projectName = projectName;
    }
    get _ProjectName() {
        return util_1.stringUtil.toSnakeUpperCase(this._projectName);
    }
    __envName(envName) {
        return [this._ProjectName, envName].join('_');
    }
    getEnvStringValue(envName) {
        var _a;
        return (_a = process.env[this.__envName(envName)]) !== null && _a !== void 0 ? _a : super.getEnvStringValue(envName);
    }
}
exports.ProjectNameIsolation = ProjectNameIsolation;
//# sourceMappingURL=project-name-isolation.js.map