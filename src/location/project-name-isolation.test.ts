import { ProjectNameIsolation, SimpleEnvLookup } from '.'
import { MockServerResult, MockService } from '../index.test'
import { stringUtil } from '../util'
import { expect } from 'chai'
import proxyquire from 'proxyquire'
import { SinonStub, assert, createSandbox } from 'sinon'

describe('location - ProjectNameIsolation', () => {
  proxyquire.noPreserveCache().noCallThru()
  const sandbox = createSandbox()

  const projectName = 'testProject'
  const projectEnvName = 'TEST_PROJECT'
  const dummyEnvKey = 'DUMMY_ENV_KEY'
  const dummyEnvValue = 'Some env value'
  const dummyProjectEnvValue = 'Some project env value'
  let mockStringUtil: MockServerResult

  beforeEach(() => {
    mockStringUtil = MockService(stringUtil, sandbox)
    proxyquire('../util/string-util', mockStringUtil)
  })
  afterEach(sandbox.restore)

  describe('constructor', () => {
    it('should set project name', () => {
      const location = new ProjectNameIsolation(projectName)
      expect(location['_projectName']).to.eq(projectName)
    })
  })
  describe('_ProjectName', () => {
    beforeEach(() => {
      mockStringUtil.toSnakeUpperCase.returns(projectEnvName)
    })

    it('should return upper snake case of a project name', () => {
      const location = new ProjectNameIsolation(projectName)
      expect(location['_ProjectName']).to.eq(projectEnvName)
      assert.calledOnce(mockStringUtil.toSnakeUpperCase)
      assert.calledWith(mockStringUtil.toSnakeUpperCase, projectName)
    })
  })
  describe('__envName', () => {
    it('should return upper snake case of a project env name', () => {
      const location = new ProjectNameIsolation(projectName)
      const fake_projectName_get = sandbox.fake.returns(projectEnvName)
      sandbox.stub(location, '_ProjectName' as any).get(fake_projectName_get)
      const result = location['__envName'](dummyEnvKey)
      expect(result).to.eq(`${projectEnvName}_${dummyEnvKey}`)
      assert.calledOnce(fake_projectName_get)
      assert.calledOnce(fake_projectName_get)
    })
  })
  describe('getEnvStringValue', () => {
    const testProjectEvnLocation = new ProjectNameIsolation(projectName)
    let stub_simpleEnvLookup_getEnvStringValue: SinonStub
    let stub_projectNameIsolation_envName: SinonStub
    beforeEach(() => {
      stub_simpleEnvLookup_getEnvStringValue = sandbox.stub(SimpleEnvLookup.prototype, 'getEnvStringValue')
      stub_projectNameIsolation_envName = sandbox
        .stub(ProjectNameIsolation.prototype, '__envName' as any)
        .returns(`${projectEnvName}_${dummyEnvKey}`)
    })
    afterEach(() => {
      delete process.env[`${projectEnvName}_${dummyEnvKey}`]
    })
    it('should return undefined if no env exists', () => {
      const result = testProjectEvnLocation.getEnvStringValue(dummyEnvKey)
      assert.calledOnce(stub_projectNameIsolation_envName)
      assert.calledWith(stub_projectNameIsolation_envName, dummyEnvKey)
      assert.calledOnce(stub_simpleEnvLookup_getEnvStringValue)
      assert.calledWith(stub_simpleEnvLookup_getEnvStringValue, dummyEnvKey)
      expect(result).to.be.undefined
    })
    it('should return simple env if project specific does not exists', () => {
      stub_simpleEnvLookup_getEnvStringValue.returns(dummyEnvValue)
      const result = testProjectEvnLocation.getEnvStringValue(dummyEnvKey)
      assert.calledOnce(stub_projectNameIsolation_envName)
      assert.calledWith(stub_projectNameIsolation_envName, dummyEnvKey)
      assert.calledOnce(stub_simpleEnvLookup_getEnvStringValue)
      assert.calledWith(stub_simpleEnvLookup_getEnvStringValue, dummyEnvKey)
      expect(result).to.equal(dummyEnvValue)
    })
    it('should return project specific env without checking simple env', () => {
      process.env[`${projectEnvName}_${dummyEnvKey}`] = dummyProjectEnvValue
      const result = testProjectEvnLocation.getEnvStringValue(dummyEnvKey)
      assert.calledOnce(stub_projectNameIsolation_envName)
      assert.calledWith(stub_projectNameIsolation_envName, dummyEnvKey)
      assert.notCalled(stub_simpleEnvLookup_getEnvStringValue)
      expect(result).to.equal(dummyProjectEnvValue)
    })
  })
})
