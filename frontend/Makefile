setup:
	npm i

build:
	npm run build

resources:
	mkdir -p ./public/resources
	cp ../console/pokedex.db ./public/resources/pokedex.db
	cp -r ../generated/AppBundle ./public/AppBundle
	chmod 644 ./public/AppBundle/mono-config.json
