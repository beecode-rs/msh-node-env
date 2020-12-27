"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockConvertStrategy = void 0;
const mockConvertStrategy = (sandbox) => {
    const stub_constructor = sandbox.stub();
    return class {
        constructor(...args) {
            this.STUB_CONSTRUCTOR = stub_constructor;
            this.convert = sandbox.stub();
            stub_constructor(...args);
        }
    };
};
exports.mockConvertStrategy = mockConvertStrategy;
//# sourceMappingURL=convert-strategy.test.js.map