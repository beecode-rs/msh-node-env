import { logger, loggerUtil } from './logger-util'
import { LoggerStrategy } from '@beecode/msh-node-log'
import { expect } from 'chai'
import { SinonSandbox, assert, createSandbox } from 'sinon'

export const mockLoggerUtil = (sandbox: SinonSandbox): any => ({
  _logger: { dummyLogger: 'dummyLogger' },
  setLogger: sandbox.stub<[LoggerStrategy], void>(),
  getLogger: sandbox.stub<[], LoggerStrategy>(),
})

describe('util - loggerUtil', () => {
  afterEach(() => {
    loggerUtil._logger = undefined
  })
  describe('_logger', () => {
    it('should return undefined by default', () => {
      expect(loggerUtil._logger).to.be.undefined
    })
  })

  describe('setLogger', () => {
    it('should set logger strategy in _logger', () => {
      expect(loggerUtil._logger).to.be.undefined
      const userLogger = { dummy: 'logger' } as any
      loggerUtil.setLogger(userLogger)
      expect(loggerUtil._logger).to.equal(userLogger)
    })
  })

  describe('getLogger', () => {
    it('should throw error if _logger undefined', () => {
      try {
        expect(loggerUtil._logger).to.be.undefined
        loggerUtil.getLogger()
        expect.fail()
      } catch (err) {
        expect(err.message).to.equal('No logger registered')
      }
    })
    it('should return _logger if it is defined', () => {
      const userLogger = { dummy: 'logger' } as any
      loggerUtil.setLogger(userLogger)
      const result = loggerUtil.getLogger()
      expect(result).to.equal(userLogger)
    })
  })
})

describe('util - logger', () => {
  const sandbox = createSandbox()
  afterEach(sandbox.restore)

  it('should call getLogger function', () => {
    const userLogger = { dummy: 'logger' } as any
    const stub_loggerUtil_getLogger = sandbox.stub(loggerUtil, 'getLogger').returns(userLogger)
    const loggerInstance = logger()
    assert.calledOnce(stub_loggerUtil_getLogger)
    expect(loggerInstance).to.equal(userLogger)
  })
})
