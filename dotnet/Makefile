CONFIGURATION := Release
DOTNET := dotnet
JAVASCRIPT_PROJECT := ./src/JavaScript/src/dotnet.csproj

.PHONY: publish

build: 
	$(DOTNET) $@ -c $(CONFIGURATION) $(JAVASCRIPT_PROJECT)

publish:
	$(DOTNET) $@ -c $(CONFIGURATION) $(JAVASCRIPT_PROJECT)
