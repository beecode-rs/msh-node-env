"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockNamingStrategy = void 0;
const mockNamingStrategy = (sandbox) => {
    var _a;
    const stub_constructor = sandbox.stub();
    return _a = class {
            constructor(...args) {
                this.getNames = sandbox.stub();
                stub_constructor(...args);
            }
        },
        _a.STUB_CONSTRUCTOR = stub_constructor,
        _a;
};
exports.mockNamingStrategy = mockNamingStrategy;
//# sourceMappingURL=naming-strategy.test.js.map