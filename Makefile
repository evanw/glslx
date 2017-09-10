WATCH = node_modules/.bin/watch src
BUILD = node_modules/.bin/skewc src/core/*.sk src/lib/*.sk --target=js --verbose

default: debug

debug: | node_modules
	$(BUILD) src/exports/*.sk --output-file=www/glslx.js --inline-functions

release: | node_modules
	$(BUILD) src/exports/*.sk --output-file=www/glslx.js --release

test: | node_modules
	$(BUILD) src/test/*.sk --output-file=test.js --js-source-map
	node test.js
	rm -f test.js test.js.map

watch-debug:
	$(WATCH) 'clear && make debug'

watch-release:
	$(WATCH) 'clear && make release'

watch-test:
	$(WATCH) 'clear && make test'

publish: test release
	rm -f npm/index.js
	cp www/glslx.js npm/index.js
	sh -c 'cd npm && npm version patch && npm publish'

node_modules:
	npm install
