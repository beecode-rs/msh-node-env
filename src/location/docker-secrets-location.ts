import { LocationStrategy } from '.'
import fs from 'fs'
import util from 'util'

export class DockerSecretsLocation implements LocationStrategy {
  public getValueByName(name: string): string | undefined {
    try {
      return fs.readFileSync(util.format('/run/secrets/%s', name), 'utf8').trim()
    } catch (e) {
      return undefined
    }
  }
}
