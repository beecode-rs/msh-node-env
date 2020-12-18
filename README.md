[![Build Status](https://beecode.semaphoreci.com/badges/msh-node-env/branches/main.svg?style=shields)](https://beecode.semaphoreci.com/projects/msh-node-env)
[![codecov](https://codecov.io/gh/beecode-rs/msh-node-env/branch/main/graph/badge.svg?token=fHc0YaxEiB)](https://codecov.io/gh/beecode-rs/msh-node-env)
[![GitHub license](https://img.shields.io/github/license/beecode-rs/msh-node-env)](https://github.com/beecode-rs/msh-node-env/blob/main/LICENSE)  
[![NPM](https://nodei.co/npm/@beecode/msh-node-env.png)](https://nodei.co/npm/@beecode/msh-node-env)

# msh-node-env

Micro-service helper: node environment

This project is intended to be used in typescript project to validate and add types to the project configuration.

<!-- toc -->

- [Install](#install)
- [Usage](#usage)
- [MshNodeEnv options](#mshnodeenv-options)
- [Location Strategy](#location-strategy)
  - [EnvironmentLocation](#environmentlocation)
  - [DockerSecretsLocation](#dockersecretslocation)
- [Naming Strategy](#naming-strategy)
  - [SimpleName](#simplename)
  - [PrefixName](#prefixname)
  - [SuffixName](#suffixname)
- [Logger Strategy](#logger-strategy)
  - [NoLogger](#nologger)
  - [ConsoleLogger](#consolelogger)

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

| Name                                     | Default                   | Description                                                                                                                                              |
| ---------------------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [locationStrategy](#location-strategy)[] | [ new SimpleEnvLookup() ] | [Optional] Define how are we getting env values. Available: [EnvironmentLocation](#environmentlocation), [DockerSecretsLocation](#dockersecretslocation) |
| [namingStrategy](#naming-strategy)[]     | [ new SimpleName() ]      | [Optional] Define how are we checking for env names. Available: [SimpleName](#simplename), [PrefixName](#prefixname), [SuffixName](#suffixname)          |
| [loggerStrategy](#logger-strategy)       | new NoLogger()            | [Optional] Define how the logging is provided. Available: [NoLogger](#nologger), [ConsoleLogger](#consolelogger)                                         |

##

## Location Strategy

Location strategy is used to define the way we are getting the variables. We can combine multiple location strategies. The env is
going to look through all chosen locations in the order that they are defined, and it will stop as soon as the env value is found.

### EnvironmentLocation

We are simple checking the process.env for the env name.

`env('SOME_ENV_KEY')` => `process.env.SOME_ENV_KEY`

### DockerSecretsLocation

We are looking in docker swarm secrets.

Usage:

```typescript
import MshNodeEnv, { location } from '@beecode/msh-node-env'

const env = MshNodeEnv({ locationStrategy: [new location.DockerSecretsLocation()] })
```

## Naming Strategy

We are using naming strategy to give us flexibility to introduce isolated env values.  
Idea: If we are using docker-compose and have one .env file with the database credentials that multiple containers.  
Something like:

```dotenv
#.env
DB_USER=user
DB_PASS=pass
DB_NAME=db_name
```

If we wanted to change the database name for just one container, we can use [PrefixName](#prefixname) strategy and create name
isolation, and we can set name of the container as prefix.

```typescript
import MshNodeEnv, { naming } from '@beecode/msh-node-env'

const env = MshNodeEnv({ namingStrategy: [new naming.PrefixName({ prefix: 'SOME_APP' })] })
```

Then we can add another env value prefixed with that container name.

```dotenv
#.env
DB_USER=user
DB_PASS=pass
DB_NAME=db_name
SOME_APP_DB_NAME=db_different_name
```

### SimpleName

Simple name strategy is just a placeholder, the default strategy. It is not doing anything. :)

### PrefixName

Prefix strategy is adding prefix to the existing name. There are two arguments available (prefix, joinChar).

Usage:

```typescript
import MshNodeEnv, { naming } from '@beecode/msh-node-env'

const env = MshNodeEnv({ namingStrategy: [new naming.PrefixName({ prefix: 'FOO' }), new naming.PrefixName({ prefix: 'BAR' })] })
const test = env('TEST').string.required // env look up in this order 1) BAR_FOO_TEST, 2) FOO_TEST, 3) TEST
```

### SuffixName

Suffix strategy is adding suffix to the existing name. there are two arguments available (suffix, joinChar).

Usage:

```typescript
import MshNodeEnv, { naming } from '@beecode/msh-node-env'

const env = MshNodeEnv({ namingStrategy: [new naming.SuffixName({ prefix: 'FOO' }), new naming.SuffixName({ prefix: 'BAR' })] })
const test = env('TEST').string.required // env look up in this order 1) TEST_FOO_BAR, 2) TEST_FOO, 3) TEST
```

## Logger Strategy

Define how and if we are logging.

### NoLogger

This is the default logging strategy, meaning the logging is ignored.

### ConsoleLogger

This is a simple logging strategy, it outputs all logs to console with a prefix of the log level (`ERROR:`, `WARN:`, `INFO:`
, `DEBUG:`).

```typescript
import MshNodeEnv, { logger } from '@beecode/msh-node-env'

const env = MshNodeEnv({ loggerStrategy: new logger.ConsoleLogger(logger.LogLevel.INFO) })
```
