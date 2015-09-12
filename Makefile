WATCH = node_modules/.bin/watch src
BUILD = node_modules/.bin/skewc src/*.sk --target=js --output-file=www/compiled.js

default: debug

debug: node_modules
	$(BUILD) --inline-functions

release: node_modules
	$(BUILD) --release

watch-debug:
	$(WATCH) 'clear && make debug'

watch-release:
	$(WATCH) 'clear && make release'

node_modules: package.json
	npm install
