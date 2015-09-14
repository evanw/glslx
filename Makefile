WATCH = node_modules/.bin/watch src
BUILD = node_modules/.bin/skewc src/core/*.sk src/lib/*.sk --target=js --verbose

default: debug

debug: node_modules
	$(BUILD) src/exports/*.sk --output-file=www/compiled.js --inline-functions

release: node_modules
	$(BUILD) src/exports/*.sk --output-file=www/compiled.js --release

test: node_modules
	$(BUILD) src/test/*.sk --output-file=test.js --release
	node test.js
	rm -f test.js

watch-debug:
	$(WATCH) 'clear && make debug'

watch-release:
	$(WATCH) 'clear && make release'

watch-test:
	$(WATCH) 'clear && make test'

npm: test release
	rm -f npm/glslx
	echo '#!/usr/bin/env node' > npm/glslx
	cat www/compiled.js >> npm/glslx
	chmod +x npm/glslx

node_modules: package.json
	npm install
