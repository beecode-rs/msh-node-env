"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockLocationStrategy = void 0;
const mockLocationStrategy = (sandbox) => class {
    constructor() {
        this.getValueByName = sandbox.stub();
    }
};
exports.mockLocationStrategy = mockLocationStrategy;
//# sourceMappingURL=location-strategy.test.js.map