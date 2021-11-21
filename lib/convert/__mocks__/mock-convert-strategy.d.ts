/// <reference types="jest" />
import { ConvertStrategy } from '../convert-strategy';
export declare class MockConvertStrategy<T = any> implements ConvertStrategy<T> {
    convert: jest.Mock<T | undefined, [string]>;
}
//# sourceMappingURL=mock-convert-strategy.d.ts.map