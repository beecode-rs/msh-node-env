/// <reference types="jest" />
import { LocationStrategy } from '../../location/location-strategy';
import { NamingStrategy } from '../../naming/naming-strategy';
export declare class Env {
    protected readonly _name: string;
    protected readonly _locationStrategies: LocationStrategy[];
    protected readonly _namingStrategies: NamingStrategy[];
    constructor(params: {
        name: string;
        locationStrategies: LocationStrategy[];
        namingStrategies: NamingStrategy[];
    });
    mockName: jest.Mock<string, []>;
    get Name(): string;
    protected _envNames: jest.Mock<string[], []>;
    envValue: jest.Mock<string | undefined, []>;
}
//# sourceMappingURL=env.d.ts.map