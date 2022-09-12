// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

import { dotnet } from './dotnet.js'

const is_node = typeof process === 'object' && typeof process.versions === 'object' && typeof process.versions.node === 'string';
if (!is_node) throw new Error(`This file only supports nodejs`);

const { setModuleImports, getAssemblyExports, getConfig, runMainAndExit } = await dotnet
    .withDiagnosticTracing(false)
    .create();

setModuleImports("main.mjs", {
    sqlite: {
        connection: () => "Source=:memory:"
    }
});

const config = getConfig();
const exports = await getAssemblyExports(config.mainAssemblyName);
const text = await exports.MyClass.ConnectionTest();
console.log(text);

await runMainAndExit(config.mainAssemblyName, ["dotnet", "is", "great!"]);
