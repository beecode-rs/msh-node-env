"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const chai_1 = require("chai");
describe('naming - SimpleName', () => {
    describe('getNames', () => {
        it('should return array of name', () => {
            const simpleName = new _1.SimpleName();
            chai_1.expect(simpleName.getNames('some-name')).to.deep.equal(['some-name']);
        });
        it('should return array of names', () => {
            const simpleName = new _1.SimpleName();
            chai_1.expect(simpleName.getNames(['some-name'])).to.deep.equal(['some-name']);
        });
        it('should return array of multiple names', () => {
            const simpleName = new _1.SimpleName();
            chai_1.expect(simpleName.getNames(['some-name', 'some-name2'])).to.deep.equal(['some-name', 'some-name2']);
        });
    });
});
//# sourceMappingURL=simple-name.test.js.map