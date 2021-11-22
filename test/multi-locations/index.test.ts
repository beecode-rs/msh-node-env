import { Options } from 'minimist-options'
import { MshNodeEnv } from '../../src/index'
import { LogLevelType } from '@beecode/msh-node-log'
import { ConsoleLogger } from '@beecode/msh-node-log/lib/console-logger'
import dotenv from 'dotenv'
import { CliArgsMinimistLocation } from '../../src/location/cli-args-minimist-location'
import { EnvironmentLocation } from '../../src/location/environment-location'
import { NodeEnvLogger } from '../../src/util/logger'

dotenv.config({ path: `${__dirname}/.env` })

describe('Multiple Locations Example', () => {
  beforeEach(() => {
    NodeEnvLogger(new ConsoleLogger({ logLevel: LogLevelType.DEBUG }))
  })
  it.each([
    ['dbNameFromArgs', ['node', 'some-app.js', '--db-name=dbNameFromArgs']],
    ['dbNameFromArgs', ['node', 'some-app.js', '--db-name', 'dbNameFromArgs']],
    ['dbNameFromArgs', ['node', 'some-app.js', '-d=dbNameFromArgs']],
    ['dbNameFromArgs', ['node', 'some-app.js', '-d', 'dbNameFromArgs']],
    ['dbNameFromArgs', ['node', 'some-app.js', '--DB_NAME', 'dbNameFromArgs']],
    ['dbNameFromArgs', ['node', 'some-app.js', '--DB_NAME=dbNameFromArgs']],
    ['dbNameFromEnv', ['node', 'some-app.js']],
  ])('should expect dbName to be %s, for args %j', (dbName, args) => {
    const options: Options = { DB_NAME: { alias: ['d', 'db-name', 'dbName'], type: 'string' } }
    const env = MshNodeEnv({
      locationStrategies: [new CliArgsMinimistLocation({ options, args: args.slice(2) }), new EnvironmentLocation()],
    })
    const config = Object.freeze({
      dbName: env('DB_NAME').string.required,
      dbPassword: env('DB_PASS').string.required,
    })
    expect(config.dbName).toEqual(dbName)
    expect(config.dbPassword).toEqual('password')
  })
})
