#!/bin/bash

DOTNET=${DOTNET:=../../try-net7-dotnet-webassembly/runtime/nightly/dotnet}
${DOTNET} $*
