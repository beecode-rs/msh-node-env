"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_location_1 = require("./environment-location");
describe('EnvironmentLocation', () => {
    describe('valueByName', () => {
        it('should return env value', () => {
            process.env.test = 'test-env-value';
            const environmentLocation = new environment_location_1.EnvironmentLocation();
            expect(environmentLocation.valueByName('test')).toEqual(process.env.test);
            delete process.env.test;
        });
        it('should return undefined if env not set', () => {
            delete process.env.test;
            const environmentLocation = new environment_location_1.EnvironmentLocation();
            expect(environmentLocation.valueByName('test')).toBeUndefined();
        });
    });
});
//# sourceMappingURL=environment-location.test.js.map