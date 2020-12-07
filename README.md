[![Build Status](https://beecode.semaphoreci.com/badges/msh-node-env/branches/main.svg?style=shields)](https://beecode.semaphoreci.com/projects/msh-node-env)
[![codecov](https://codecov.io/gh/beecode-rs/msh-node-env/branch/main/graph/badge.svg)](https://codecov.io/gh/beecode-rs/msh-node-env)
[![GitHub license](https://img.shields.io/github/license/beecode-rs/msh-node-env)](https://github.com/beecode-rs/msh-node-env/blob/main/LICENSE)  
[![NPM](https://nodei.co/npm/@beecode/msh-node-env.png)](https://npmjs.org/package/@beecode/msh-node-env)

# msh-node-env

Micro-service helper: node environment

This project is intended to be used in typescript project to validate and add types to the project configuration

<!-- toc -->

- [Install](#install)
- [Usage](#usage)
- [MshNodeEnv options](#mshnodeenv-options)
- [Location Strategy](#location-strategy)
  * [SimpleEnvLookup](#simpleenvlookup)
  * [ProjectNameIsolation](#projectnameisolation)
  * [VersionProjectNameIsolation](#versionprojectnameisolation)
- [Logger Strategy](#logger-strategy)
  * [NoLogger](#nologger)
  * [ConsoleLogger](#consolelogger)

<!-- tocstop -->

## Install

`npm i @beecode/msh-node-env`

## Usage

```typescript
import MshNodeEnv from '@beecode/msh-node-env'
const env = MshNodeEnv()

export const config = Object.freeze({
  someRequiredString: env('SOME_REQUIRED_STRING').string.required,
  strWithDefaultValue: env('STR_WITH_DEFAULT_VALUE').string.default('default-value').required,
  optionalString: env('OPTIONAL_STRING').string.optional,
  defKeyName: env('ANY_KEY_NAME').string.required,
  someNumberValue: env('SOME_NUMBER_VALUE').number.required,
  someBooleanValue: env('SOME_BOOLEAN_VALUE').boolean.required,
  someJsonValue: env('SOME_JSON_VALUE').json().required,
})
```

## MshNodeEnv options

| Name                                   | Default               | Description                                                                                                                                                                                   |
| -------------------------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [locationStrategy](#location-strategy)? | new SimpleEnvLookup() | [Optional] Chose the strategy how the values are going to be loaded. Available: [SimpleEnvLookup](#simpleenvlookup), [ProjectNameIsolation](#projectnameisolation), [VersionProjectNameIsolation](#versionprojectnameisolation) |
| [loggerStrategy](#logger-strategy)?     | new NoLogger()        | [Optional] Chose the strategy how the logging is provided. Available: [NoLogger](#nologger), [ConsoleLogger](#consolelogger)                                                                                                 |

##

## Location Strategy

Location strategy is used to define the way we are getting the variables.

### SimpleEnvLookup

As the name implies this strategy is simply using the `env name` passed to `env()`.

`env('SOME_ENV_KEY')` => `process.env.SOME_ENV_KEY`

### ProjectNameIsolation

Usage:

```typescript
import MshNodeEnv, { location } from '@beecode/msh-node-env'

const projectName = 'SomeProject'
const env = MshNodeEnv({ locationStrategy: new location.ProjectNameIsolation(projectName) })
```

For this strategy we need to provide the project name. It tries to get the env with the `project name` (snake upper case) prefixed (project specific), and if it does not find it falls back to the simple env lookup strategy.

`env('SOME_ENV_KEY')` => `process.env.SOME_PROJECT_SOME_ENV_KEY || process.env.SOME_ENV_KEY`

### VersionProjectNameIsolation

Usage:

```typescript
import MshNodeEnv, { location } from '@beecode/msh-node-env'

const projectName = 'SomeProject'
const version = '1.0.1'
const env = MshNodeEnv({ locationStrategy: new location.VersionProjectNameIsolation(projectName, version) })
```

For this strategy we need to provide the project name and version. It tries to get the env with the `project name`+`version` (snake upper case) prefixed (project specific), and if it does not find it falls back to the project name isolation strategy.

`env('SOME_ENV_KEY')` => `process.env.SOME_PROJECT_1_0_1_SOME_ENV_KEY || process.env.SOME_PROJECT_SOME_ENV_KEY || process.env.SOME_ENV_KEY`

## Logger Strategy

Define how and if we are logging

### NoLogger

This is the default logging strategy, meaning the logging is ignored

### ConsoleLogger

This is a simple logging strategy, it outputs all logs to console with a prefix of the log level (`ERROR:`, `WARN:`, `INFO:`, `DEBUG:`)

```typescript
import MshNodeEnv, { logger } from '@beecode/msh-node-env'

const env = MshNodeEnv({ loggerStrategy: new logger.ConsoleLogger(logger.LogLevel.INFO) })
```
