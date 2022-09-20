# Pokedex Shared Library

## Required

- .NET 7 rc1 >=

## Build

You can build the application from Visual Studio or by dotnet cli

```
dotnet build -c Debug/Release ./src/JavaScript/src
```

After building the application, the result is in the `../AppBundle` directory.

## Run

You can build the application from Visual Studio or by dotnet cli
Before running test connection application, you must modify dotnet.csproj

```diff
     <!-- libraryとしてexportしたい場合はカスタムしたpackage.jsonを指定する -->
-    <WasmMainJSPath>package.json</WasmMainJSPath>
+    <!-- <WasmMainJSPath>package.json</WasmMainJSPath> -->
     <!-- このprojectでmain.mjsを実行したい場合は、WasmMainJSPathにmain.mjsを指定する -->
-    <!-- <WasmMainJSPath>main.mjs</WasmMainJSPath> -->
+    <WasmMainJSPath>main.mjs</WasmMainJSPath>
```

```
dotnet run -c Debug/Release --project ./src/JavaScript/src
```

Or you can start any static file server from the AppBundle directory

```
node ../AppBundle/main.mjs
```