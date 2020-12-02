import { ProjectNameIsolation, VersionProjectNameIsolation } from '.'
import { expect } from 'chai'
import { SinonStub, assert, createSandbox } from 'sinon'

describe('location - VersionProjectNameIsolation', () => {
  const projectName = 'testProject'
  const projectNameSnakeUpperCase = 'TEST_PROJECT'
  const version = '1.0.1'
  const versionFormated = '1_0_1'
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
    const sandbox = createSandbox()
    let stub_projectNameIsolation_projectName: any
    let stub_versionProjectNameIsolation_version: any
    let location: VersionProjectNameIsolation
    beforeEach(() => {
      location = new VersionProjectNameIsolation({ projectName, version })
      stub_projectNameIsolation_projectName = sandbox.stub(ProjectNameIsolation.prototype, '_ProjectName' as any)
      stub_versionProjectNameIsolation_version = sandbox.stub(location, '__Version' as any)
    })
    afterEach(sandbox.restore)

    it('should return upper snake case of project name version and env', () => {
      const fake_version_get = sandbox.fake.returns(versionFormated)
      stub_versionProjectNameIsolation_version.get(fake_version_get)
      const fake_projectName_get = sandbox.fake.returns(projectNameSnakeUpperCase)
      stub_projectNameIsolation_projectName.get(fake_projectName_get)
      const result = location['__envProjectVersionName'](dummyEnvKey)
      expect(result).to.eq(`${versionProjectEnvName}_${dummyEnvKey}`)
      assert.calledOnce(fake_version_get)
      assert.calledOnce(fake_projectName_get)
    })
  })

  describe('getEnvStringValue', () => {
    const sandbox = createSandbox()
    const testVersionProjectEvnLocation = new VersionProjectNameIsolation({ projectName, version })
    let stub_projectNameIsolation_getEnvStringValue: SinonStub
    let stub_versionProjectNameIsolation_envProjectVersionName: SinonStub

    beforeEach(() => {
      stub_projectNameIsolation_getEnvStringValue = sandbox.stub(ProjectNameIsolation.prototype, 'getEnvStringValue')
      stub_versionProjectNameIsolation_envProjectVersionName = sandbox
        .stub(VersionProjectNameIsolation.prototype, '__envProjectVersionName' as any)
        .returns(`${versionProjectEnvName}_${dummyEnvKey}`)
    })
    afterEach(() => {
      sandbox.restore()
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
