# Pokedex Frontend

## Required

- Node v16 >

## Development

```sh
$ npm i
$ npm run build
```

If preview

```sh
$ npm run preview
```

### Resources are on Local

This application requires dotnet runtime and pokedex.db, so before running this application, you must prepare these files.

```sh
$ cp -r ../AppBundle ./public/AppBundle
$ cp ../consonle/pokedex.db ./public/resources/pokedex.db
```

To generate `AppBundle`

```sh
$ make -C ../dotnet build
```

To generate pokedex.db

```sh
$ pushd ../console
$ npm i
$ npm run build; npm run run
```

### Resources are on Remote (WIP)

You can change AppBundle and pokedex.db path by using environment variables.

|environment variable name|default value|
|-|-|
|POKEDEX_DOTNET_RUNTIME|"/AppBundle/dotnet.js"|
|POKEDEX_DICT_PATH|"/resources/pokedex.db"|
