setup:
	npm i

build:
	npm run build

.PHONY: test
test:
	npm test

resources:
	mkdir -p ./public/resources
	cp ../console/pokedex.db ./public/resources/pokedex.db
	cp -r ../generated/AppBundle ./public/
	chmod 644 ./public/AppBundle/mono-config.json
