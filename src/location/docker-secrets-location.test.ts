import { DockerSecretsLocation } from './docker-secrets-location'
import { expect } from 'chai'
import fs from 'fs'
import { SinonStub, assert, createSandbox } from 'sinon'
import util from 'util'

describe('location - DockerSecretsLocation', () => {
  describe('getValueByName', () => {
    const sandbox = createSandbox()
    let stub_fs_readFileSync: SinonStub
    let stub_util_format: SinonStub
    beforeEach(() => {
      stub_fs_readFileSync = sandbox.stub(fs, 'readFileSync')
      stub_util_format = sandbox.stub(util, 'format')
    })
    afterEach(sandbox.restore)

    it('should call fs and util', () => {
      const fsResult = 'fs-result'
      const utilResult = 'util-result'
      const envName = 'test'
      stub_fs_readFileSync.returns(fsResult)
      stub_util_format.returns(utilResult)
      const dockerSecretsLocation = new DockerSecretsLocation()
      const result = dockerSecretsLocation.getValueByName(envName)
      assert.calledOnce(stub_util_format)
      assert.calledWith(stub_util_format, '/run/secrets/%s', envName)
      assert.calledOnce(stub_fs_readFileSync)
      assert.calledWith(stub_fs_readFileSync, utilResult)
      expect(result).to.equal(fsResult)
    })

    it('should return undefined if util throws an error', () => {
      stub_util_format.throws(new Error('boom'))
      const dockerSecretsLocation = new DockerSecretsLocation()
      const result = dockerSecretsLocation.getValueByName('test')
      expect(result).to.be.undefined
    })
    it('should return undefined if ts throws an error', () => {
      stub_fs_readFileSync.throws(new Error('boom'))
      const dockerSecretsLocation = new DockerSecretsLocation()
      const result = dockerSecretsLocation.getValueByName('test')
      expect(result).to.be.undefined
    })
  })
})
