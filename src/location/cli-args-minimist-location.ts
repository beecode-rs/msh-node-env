import { LocationStrategy } from './location-strategy'
import minimist from 'minimist'
import buildOptions, { Options } from 'minimist-options'

export class CliArgsMinimistLocation<T extends minimist.ParsedArgs> implements LocationStrategy {
  protected readonly _miniOpts: minimist.Opts
  protected readonly _args: T

  public constructor(params?: { options?: Options; args?: string[] }) {
    const { options = {}, args = process.argv.slice(2) } = params ?? {}
    this._miniOpts = buildOptions(options)
    this._args = minimist<T>(args, this._miniOpts)
  }

  public valueByName(name: string): string | undefined {
    const value = this._args[name]
    if (value === undefined) return value
    return value.toString()
  }
}
