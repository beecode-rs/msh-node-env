import { ProjectNameIsolation, SimpleEnvLookup } from '.'
import { stringUtil } from '../util'
import { expect } from 'chai'
import sinon, { SinonStub, assert } from 'sinon'

describe('ProjectNameIsolation', () => {
  const projectName = 'testProject'
  const projectEnvName = 'TEST_PROJECT'
  const dummyEnvKey = 'DUMMY_ENV_KEY'
  const dummyEnvValue = 'Some env value'
  const dummyProjectEnvValue = 'Some project env value'

  describe('constructor', () => {
    it('should set project name', () => {
      const location = new ProjectNameIsolation(projectName)
      expect(location['_projectName']).to.eq(projectName)
    })
  })
  describe('_ProjectName', () => {
    let stub_stringUtil_toSnakeUpperCase: SinonStub
    beforeEach(() => {
      stub_stringUtil_toSnakeUpperCase = sinon.stub(stringUtil, 'toSnakeUpperCase').returns(projectEnvName)
    })
    afterEach(() => {
      sinon.restore()
    })
    it('should return upper snake case of a project name', () => {
      stub_stringUtil_toSnakeUpperCase.returns(projectEnvName)
      const location = new ProjectNameIsolation(projectName)
      expect(location['_ProjectName']).to.eq(projectEnvName)
      assert.calledOnce(stub_stringUtil_toSnakeUpperCase)
      assert.calledWith(stub_stringUtil_toSnakeUpperCase, projectName)
    })
  })
  describe('__envName', () => {
    let spy_projectNameIsolation_projectName: any
    const location = new ProjectNameIsolation(projectName)
    beforeEach(() => {
      spy_projectNameIsolation_projectName = sinon.spy(ProjectNameIsolation.prototype, '_ProjectName' as any, ['get'])
    })
    afterEach(() => {
      sinon.restore()
    })
    it('should return upper snake case of a project env name', () => {
      const result = location['__envName'](dummyEnvKey)
      expect(result).to.eq(`${projectEnvName}_${dummyEnvKey}`)
      expect(spy_projectNameIsolation_projectName.get.calledOnce).to.be.true
    })
  })
  describe('getEnvStringValue', () => {
    const testProjectEvnLocation = new ProjectNameIsolation(projectName)
    let stub_simpleEnvLookup_getEnvStringValue: SinonStub
    let stub_projectNameIsolation_envName: SinonStub
    beforeEach(() => {
      stub_simpleEnvLookup_getEnvStringValue = sinon.stub(SimpleEnvLookup.prototype, 'getEnvStringValue')
      stub_projectNameIsolation_envName = sinon
        .stub(ProjectNameIsolation.prototype, '__envName' as any)
        .returns(`${projectEnvName}_${dummyEnvKey}`)
    })
    afterEach(() => {
      sinon.restore()
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
