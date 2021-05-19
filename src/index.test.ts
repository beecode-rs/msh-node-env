import { mockLoggerUtil } from './util/logger-util.test'
import { mockLoggerStrategyFactory } from '@beecode/msh-node-log/lib/logger-strategy.test'
import { expect } from 'chai'
import proxyquire from 'proxyquire'
import { SinonSpy, assert, createSandbox } from 'sinon'

describe('MshNodeEnv', () => {
  proxyquire.noCallThru()
  const sandbox = createSandbox()
  const dummyEnvironmentLocation = { type: 'environmentLocation' }
  const dummySimpleName = { type: 'simpleName' }
  const dummyBaseConvert = { type: 'baseConvert' }
  const dummyEnv = { type: 'env' }
  let spy_EnvironmentLocation: SinonSpy
  let spy_SimpleName: SinonSpy
  let spy_BaseConvert: SinonSpy
  let spy_Env: SinonSpy
  let mockNoLogger: any
  let mckLoggerUtil: any
  let mod: any
  beforeEach(() => {
    mockNoLogger = mockLoggerStrategyFactory(sandbox)
    spy_EnvironmentLocation = sandbox.fake.returns(dummyEnvironmentLocation)
    spy_SimpleName = sandbox.fake.returns(dummySimpleName)
    spy_BaseConvert = sandbox.fake.returns(dummyBaseConvert)
    spy_Env = sandbox.fake.returns(dummyEnv)
    mckLoggerUtil = mockLoggerUtil(sandbox)
    mod = proxyquire('./index', {
      '@beecode/msh-node-log/lib/no-logger': { NoLogger: mockNoLogger },
      './location': { EnvironmentLocation: spy_EnvironmentLocation },
      './naming': { SimpleName: spy_SimpleName },
      './convert': { BaseConvert: spy_BaseConvert },
      './env': { Env: spy_Env },
      './util': { loggerUtil: mckLoggerUtil },
    })
  })
  afterEach(sandbox.restore)
  it('should all default strategies', () => {
    const env = mod.default()
    assert.calledOnce(mockNoLogger.STUB_CONSTRUCTOR)
    assert.calledOnce(spy_EnvironmentLocation)
    assert.calledOnce(spy_SimpleName)
    assert.notCalled(spy_BaseConvert)
    assert.calledOnce(mckLoggerUtil.setLogger)
    expect(typeof env).to.equal('function')
  })
  it('should pass all default strategy to Env on env used', () => {
    const userNoLogger = new (mockLoggerStrategyFactory(sandbox))()
    const env = mod.default({ loggerStrategy: userNoLogger })
    const name = 'TEST'
    const envResult = env(name)
    assert.calledOnce(spy_BaseConvert)
    assert.calledOnce(spy_Env)
    assert.calledWith(spy_Env, {
      name,
      locationStrategies: [dummyEnvironmentLocation],
      namingStrategies: [dummySimpleName],
    })
    expect(envResult).to.equal(dummyBaseConvert)
    assert.calledOnce(userNoLogger.debug)
    assert.calledWith(userNoLogger.debug, `Initiate env: "${name}"`)
  })
  it('should not use default strategies if all are passed in constructor', () => {
    const userNoLogger = new (mockLoggerStrategyFactory(sandbox))()
    const userEnvironmentLocation = { type: 'user-environmentLocation' }
    const userSimpleName = { type: 'user-simpleName' }
    const env = mod.default({
      loggerStrategy: userNoLogger,
      locationStrategies: [userEnvironmentLocation],
      namingStrategies: [userSimpleName],
    })
    const name = 'TEST'
    env(name)
    assert.calledWith(spy_Env, {
      name,
      locationStrategies: [userEnvironmentLocation],
      namingStrategies: [userSimpleName],
    })

    assert.notCalled(mockNoLogger.STUB_CONSTRUCTOR)
    assert.notCalled(spy_EnvironmentLocation)
    assert.notCalled(spy_SimpleName)
    assert.calledOnce(mckLoggerUtil.setLogger)
    assert.calledWith(mckLoggerUtil.setLogger, userNoLogger)
  })
})
