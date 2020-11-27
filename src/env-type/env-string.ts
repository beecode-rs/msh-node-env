// import { Env } from '../env'
// import { BaseEnvStorage } from './base-env-storage'
import { ConvertStrategy } from './convert-strategy'

// export class EnvString extends BaseEnvStorage<string> {
//   constructor(env: Env) {
//     super(env)
//   }
//
//   protected _convertValue(stringOrUndefined?: string): string | undefined {
//     const stringValue = stringOrUndefined ?? ''
//     return stringValue.trim() || this._defaultValue
//   }
//
//   public default(defaultValue: string): EnvString {
//     this._setDefault(defaultValue)
//     return this
//   }
// }

export class EnvString implements ConvertStrategy<string> {
  public convert(str: string): string | undefined {
    return str
  }
}
