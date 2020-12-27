"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const chai_1 = require("chai");
describe('location - EnvironmentLocation', () => {
    describe('getValueByName', () => {
        it('should return env value', () => {
            process.env.test = 'test-env-value';
            const environmentLocation = new _1.EnvironmentLocation();
            chai_1.expect(environmentLocation.getValueByName('test')).to.equal(process.env.test);
            delete process.env.test;
        });
        it('should return undefined if env not set', () => {
            delete process.env.test;
            const environmentLocation = new _1.EnvironmentLocation();
            chai_1.expect(environmentLocation.getValueByName('test')).to.be.undefined;
        });
    });
});
//# sourceMappingURL=environment-location.test.js.map