"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliArgsMinimistLocation = void 0;
const minimist_1 = __importDefault(require("minimist"));
const minimist_options_1 = __importDefault(require("minimist-options"));
class CliArgsMinimistLocation {
    constructor(params = {}) {
        const { options = {}, args = process.argv.slice(2) } = params;
        this._miniOpts = (0, minimist_options_1.default)(options);
        this._args = (0, minimist_1.default)(args, this._miniOpts);
    }
    valueByName(name) {
        const value = this._args[name];
        if (value === undefined)
            return value;
        return value.toString();
    }
}
exports.CliArgsMinimistLocation = CliArgsMinimistLocation;
//# sourceMappingURL=cli-args-minimist-location.js.map