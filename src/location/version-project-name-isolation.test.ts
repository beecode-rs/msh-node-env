import { ProjectNameIsolation, VersionProjectNameIsolation } from './'
import { expect } from 'chai'
import sinon, { SinonStub, assert } from 'sinon'

describe('VersionProjectNameIsolation', () => {
  const projectName = 'testProject'
  const version = '1.0.1'
  const versionProjectEnvName = 'TEST_PROJECT_1_0_1'
  const dummyEnvKey = 'DUMMY_ENV_KEY'
  const dummyProjectEnvValue = 'Some project env value'
  const dummyVersionEnvValue = 'Some version specific env value'

  describe('constructor', () => {
    it('should set project name', () => {
      const location = new VersionProjectNameIsolation({ projectName, version })
      expect(location['_version']).to.eq(version)
    })
  })

  describe('__Version', () => {
    it('should convert dots int underscores', () => {
      const location = new VersionProjectNameIsolation({ projectName, version })
      expect(location['__Version']).to.eq('1_0_1')
    })
  })

  describe('__envProjectVersionName', () => {
    let spy_projectNameIsolation_projectName: any
    let spy_versionProjectNameIsolation_version: any
    const location = new VersionProjectNameIsolation({ projectName, version })
    beforeEach(() => {
      spy_projectNameIsolation_projectName = sinon.spy(ProjectNameIsolation.prototype, '_ProjectName' as any, ['get'])
      spy_versionProjectNameIsolation_version = sinon.spy(VersionProjectNameIsolation.prototype, '__Version' as any, ['get'])
    })
    afterEach(() => {
      sinon.restore()
    })

    it('should return upper snake case of project name version and env', () => {
      const result = location['__envProjectVersionName'](dummyEnvKey)
      expect(result).to.eq(`${versionProjectEnvName}_${dummyEnvKey}`)
      expect(spy_projectNameIsolation_projectName.get.calledOnce).to.be.true
      expect(spy_versionProjectNameIsolation_version.get.calledOnce).to.be.true
    })
  })

  describe('getEnvStringValue', () => {
    const testVersionProjectEvnLocation = new VersionProjectNameIsolation({ projectName, version })
    let stub_projectNameIsolation_getEnvStringValue: SinonStub
    let stub_versionProjectNameIsolation_envProjectVersionName: SinonStub

    beforeEach(() => {
      stub_projectNameIsolation_getEnvStringValue = sinon.stub(ProjectNameIsolation.prototype, 'getEnvStringValue')
      stub_versionProjectNameIsolation_envProjectVersionName = sinon
        .stub(VersionProjectNameIsolation.prototype, '__envProjectVersionName' as any)
        .returns(`${versionProjectEnvName}_${dummyEnvKey}`)
    })
    afterEach(() => {
      sinon.restore()
      delete process.env[`${versionProjectEnvName}_${dummyEnvKey}`]
    })

    it('should return undefined if no env exists', () => {
      const result = testVersionProjectEvnLocation.getEnvStringValue(dummyEnvKey)

      assert.calledOnce(stub_projectNameIsolation_getEnvStringValue)
      assert.calledWith(stub_projectNameIsolation_getEnvStringValue, dummyEnvKey)
      assert.calledOnce(stub_versionProjectNameIsolation_envProjectVersionName)
      assert.calledWith(stub_versionProjectNameIsolation_envProjectVersionName, dummyEnvKey)
      expect(result).to.be.undefined
    })
    it('should return project env if version specific does not exists', () => {
      stub_projectNameIsolation_getEnvStringValue.returns(dummyProjectEnvValue)
      const result = testVersionProjectEvnLocation.getEnvStringValue(dummyEnvKey)
      assert.calledOnce(stub_projectNameIsolation_getEnvStringValue)
      assert.calledWith(stub_projectNameIsolation_getEnvStringValue, dummyEnvKey)
      assert.calledOnce(stub_versionProjectNameIsolation_envProjectVersionName)
      assert.calledWith(stub_versionProjectNameIsolation_envProjectVersionName, dummyEnvKey)
      expect(result).to.equal(dummyProjectEnvValue)
    })
    it('should return version specific env without checking project env', () => {
      process.env[`${versionProjectEnvName}_${dummyEnvKey}`] = dummyVersionEnvValue
      const result = testVersionProjectEvnLocation.getEnvStringValue(dummyEnvKey)
      assert.notCalled(stub_projectNameIsolation_getEnvStringValue)
      assert.calledOnce(stub_versionProjectNameIsolation_envProjectVersionName)
      assert.calledWith(stub_versionProjectNameIsolation_envProjectVersionName, dummyEnvKey)
      expect(result).to.equal(dummyVersionEnvValue)
    })
  })
})
