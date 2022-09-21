CONFIGURATION := Release
DOTNET := dotnet
JAVASCRIPT_TEST_PROJECT :=./src/JavaScript/test
.PHONY: publish

setup:
	$(MAKE) -C $(JAVASCRIPT_TEST_PROJECT) setup

build: 
	$(DOTNET) $@ -c $(CONFIGURATION)

publish:
	$(DOTNET) $@ -c $(CONFIGURATION)

test: test/dotnet test/javascript

test/dotnet:
	$(DOTNET) test

test/javascript:
	$(MAKE) -C $(JAVASCRIPT_TEST_PROJECT) test
