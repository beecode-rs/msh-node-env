import { expect } from 'chai'
import sinon, { assert, SinonStub } from 'sinon'
import { EnvJSON } from './env-json'

describe('EnvJson', () => {
  describe('_convertValue', () => {
    const dummyValue = 'dummyValue'
    let stub_console_warn: SinonStub
    beforeEach(() => {
      stub_console_warn = sinon.stub(console, 'warn')
    })
    afterEach(sinon.restore)

    it('should return default value if passed undefined', () => {
      const envJson = new EnvJSON({} as any)
      envJson['_defaultValue'] = dummyValue
      const result = envJson['_convertValue'](undefined)
      assert.notCalled(stub_console_warn)
      expect(result).to.equal(dummyValue)
    })
    it('should return default value if passed empty string', () => {
      const envJson = new EnvJSON({} as any)
      envJson['_defaultValue'] = dummyValue
      const result = envJson['_convertValue']('')
      assert.notCalled(stub_console_warn)
      expect(result).to.equal(dummyValue)
    })
    it('should return default a warn if non json string passed', () => {
      const envJson = new EnvJSON({} as any)
      envJson['_defaultValue'] = dummyValue
      const result = envJson['_convertValue']('not jsons')
      assert.calledOnce(stub_console_warn)
      assert.calledWith(stub_console_warn, 'Unexpected token o in JSON at position 1')
      expect(result).to.equal(dummyValue)
    })
    it('should return object parsed from string', () => {
      const jsonObject = { test: 'some test value' }
      const envJson = new EnvJSON({} as any)
      const result = envJson['_convertValue'](JSON.stringify(jsonObject))
      assert.notCalled(stub_console_warn)
      expect(result).not.to.equal(jsonObject)
      expect(result).to.deep.equal(jsonObject)
    })
  })
})
