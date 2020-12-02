import { SinonSandbox, SinonStub } from 'sinon'

export abstract class BaseSandbox {
  protected readonly _sandbox: SinonSandbox
  protected constructor(sandbox: SinonSandbox) {
    this._sandbox = sandbox
  }
}

export type MockServerResult = { [k: string]: SinonStub }

export const MockService = <T extends { [k: string]: any }>(serviceObject: T, sandbox: SinonSandbox): MockServerResult => {
  return Object.keys(serviceObject)
    .map((key: string) => {
      return { [key]: sandbox.stub(serviceObject, key) }
    })
    .reduce((acc, cur) => {
      Object.assign(acc, cur)
      return acc
    }, {} as T)
}
