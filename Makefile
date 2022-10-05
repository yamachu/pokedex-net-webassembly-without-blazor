build:
	$(MAKE) _build/dotnet _build/console _build/frontend

test:
	$(MAKE) _test/dotnet _test/frontend

_build/dotnet:
	$(MAKE) -C dotnet setup publish

_build/console:
	$(MAKE) -C console setup build run

_build/frontend:
	$(MAKE) -C frontend setup resources build

_test/dotnet:
	$(MAKE) -C dotnet test

_test/frontend:
	$(MAKE) -C frontend test

__clean:
	git clean -xdf 
