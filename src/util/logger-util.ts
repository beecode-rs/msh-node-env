import { LoggerStrategy } from '@beecode/msh-node-log'

export const loggerUtil = {
  _logger: undefined as undefined | LoggerStrategy,
  setLogger: (loggerStrategy: LoggerStrategy): void => {
    loggerUtil._logger = loggerStrategy
  },
  getLogger: (): LoggerStrategy => {
    if (loggerUtil._logger === undefined) throw new Error('No logger registered')
    return loggerUtil._logger
  },
}

export const logger = (): LoggerStrategy => loggerUtil.getLogger()
