#!/bin/bash

vision --projectRootPath=../../.. --tsConfig=../../../tsconfig.json --destName=vision  --printIgnoreExternal --printIgnorePaths=src/util,src/test,src/__mocks__,src/env/__mocks__,src/convert/__mocks__,src/naming/__mocks__,src/location/__mocks__
