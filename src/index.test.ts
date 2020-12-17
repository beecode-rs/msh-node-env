import { expect } from 'chai'
import proxyquire from 'proxyquire'
import { SinonSpy, assert, createSandbox } from 'sinon'

describe('MshNodeEnv', () => {
  proxyquire.noCallThru()
  const sandbox = createSandbox()
  const dummyNoLogger = { type: 'noLogger' }
  const dummyEnvironmentLocation = { type: 'environmentLocation' }
  const dummySimpleName = { type: 'simpleName' }
  const dummyBaseConvert = { type: 'baseConvert' }
  const dummyEnv = { type: 'env' }
  let spy_NoLogger: SinonSpy
  let spy_EnvironmentLocation: SinonSpy
  let spy_SimpleName: SinonSpy
  let spy_BaseConvert: SinonSpy
  let spy_Env: SinonSpy
  let mod: any
  beforeEach(() => {
    spy_NoLogger = sandbox.fake.returns(dummyNoLogger)
    spy_EnvironmentLocation = sandbox.fake.returns(dummyEnvironmentLocation)
    spy_SimpleName = sandbox.fake.returns(dummySimpleName)
    spy_BaseConvert = sandbox.fake.returns(dummyBaseConvert)
    spy_Env = sandbox.fake.returns(dummyEnv)
    mod = proxyquire('./index', {
      './logger': { NoLogger: spy_NoLogger },
      './location': { EnvironmentLocation: spy_EnvironmentLocation },
      './naming': { SimpleName: spy_SimpleName },
      './convert': { BaseConvert: spy_BaseConvert },
      './env': { Env: spy_Env },
    })
  })
  afterEach(sandbox.restore)
  it('should all default strategies', () => {
    const env = mod.default()
    assert.calledOnce(spy_NoLogger)
    assert.calledOnce(spy_EnvironmentLocation)
    assert.calledOnce(spy_SimpleName)
    assert.notCalled(spy_BaseConvert)
    expect(typeof env).to.equal('function')
  })
  it('should pass all default strategy to Env on env used', () => {
    const env = mod.default()
    const name = 'TEST'
    const envResult = env(name)
    assert.calledOnce(spy_BaseConvert)
    assert.calledOnce(spy_Env)
    assert.calledWith(spy_Env, {
      name,
      locationStrategies: [dummyEnvironmentLocation],
      loggerStrategy: dummyNoLogger,
      namingStrategies: [dummySimpleName],
    })
    expect(envResult).to.equal(dummyBaseConvert)
  })
  it('should not use default strategies if all are passed in constructor', () => {
    const userNoLogger = { type: 'user-noLogger' }
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
      loggerStrategy: userNoLogger,
      namingStrategies: [userSimpleName],
    })

    assert.notCalled(spy_NoLogger)
    assert.notCalled(spy_EnvironmentLocation)
    assert.notCalled(spy_SimpleName)
  })
})
