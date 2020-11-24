import { LoggerStrategy } from './logger-strategy'

export type ConsoleLogFunction = (msg: string, obj?: any) => void

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

export class ConsoleLogging implements LoggerStrategy {
  private readonly __logLevel: LogLevel

  public constructor(logLevel: LogLevel = LogLevel.ERROR) {
    this.__logLevel = logLevel
  }

  private __logMessage(type: string): ConsoleLogFunction {
    return (msg: string, obj?: any): void => {
      if (obj) {
        // eslint-disable-next-line no-console
        console.log(`${type}: ${msg}`)
      } else {
        // eslint-disable-next-line no-console
        console.log(`${type}: ${msg}\n`, obj)
      }
    }
  }

  public debug(msg: string, obj?: any): void {
    if (this.__logLevel > LogLevel.DEBUG) return
    this.__logMessage('debug')(msg, obj)
  }

  public info(msg: string, obj?: any): void {
    if (this.__logLevel > LogLevel.INFO) return
    this.__logMessage('info')(msg, obj)
  }

  public warn(msg: string, obj?: any): void {
    if (this.__logLevel > LogLevel.WARN) return
    this.__logMessage('warn')(msg, obj)
  }

  public error(msg: string, obj?: any): void {
    if (this.__logLevel > LogLevel.ERROR) return
    this.__logMessage('error')(msg, obj)
  }
}
