import { MshNodeEnv } from '../../src/index'
import { LogLevelType } from '@beecode/msh-node-log'
import { ConsoleLogger } from '@beecode/msh-node-log/lib/console-logger'
import dotenv from 'dotenv'
import { PrefixName } from '../../src/naming/prefix-name'
import { NodeEnvLogger } from '../../src/util/logger'

dotenv.config({ path: `${__dirname}/.env` })

describe('Prefix Example', () => {
  beforeEach(() => {
    NodeEnvLogger(new ConsoleLogger({ logLevel: LogLevelType.DEBUG }))
  })
  it('should use prefixed env first', () => {
    const env = MshNodeEnv({
      namingStrategies: [new PrefixName('APP_NAME_')],
    })
    const config = Object.freeze({
      dbName: env('DB_NAME').string.required,
      dbPassword: env('DB_PASS').string.required,
    })
    expect(config.dbName).toEqual('appSpecificDatabaseName')
    expect(config.dbPassword).toEqual('password')
  })
  it('should use additional prefix first and then prefix', () => {
    const env = MshNodeEnv({
      namingStrategies: [new PrefixName('APP_NAME_'), new PrefixName('ADDITIONAL_PREFIX_')],
    })
    const config = Object.freeze({
      dbName: env('DB_NAME').string.required,
      dbPassword: env('DB_PASS').string.required,
    })
    expect(config.dbName).toEqual('appSpecificDatabaseName')
    expect(config.dbPassword).toEqual('additionalPrefixAppNameDbPass')
  })
})
