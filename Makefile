
SHELL := /bin/bash
PATH  := ./node_modules/.bin:$(PATH)

SRC_FILES := $(wildcard src/**/*.ts)

lib: $(SRC_FILES) node_modules
	tsc -p tsconfig.json --outDir lib
	touch lib

.PHONY: bundle
bundle: lib
	browserify src/index-browser.ts --debug \
		--standalone ddpay --plugin tsify \
		--transform [ babelify --extensions .ts ] \
		| derequire > dist/ddpay.js
	uglifyjs dist/ddpay.js \
		--source-map "content=inline,url=ddpay.js.map,filename=dist/ddpay.js.map" \
		--compress "dead_code,collapse_vars,reduce_vars,keep_infinity,drop_console,passes=2" \
		--output dist/ddpay.js
	gzip --best --keep --force dist/ddpay.js

.PHONY: coverage
coverage: node_modules
	nyc -r html -r text -e .ts -i ts-node/register mocha --reporter nyan --require ts-node/register test/*.ts

.PHONY: test
test: node_modules
	mocha --require ts-node/register test/*.ts --grep '$(grep)'

.PHONY: ci-test
ci-test: node_modules
	tslint -p tsconfig.json -c tslint.json
	nyc -r lcov -e .ts -i ts-node/register mocha --reporter tap --require ts-node/register test/*.ts

.PHONY: lint
lint: node_modules
	tslint -p tsconfig.json -c tslint.json -t stylish --fix

node_modules:
	npm install

.PHONY: docs
docs: node_modules
	typedoc --gitRevision master --target ES6 --mode file --out docs src
	find docs -name "*.html" | xargs sed -i '' 's~$(shell pwd)~.~g'
	echo "Served at <https://dpays.github.io/ddpay/>" > docs/README.md

.PHONY: clean
clean:
	rm -rf lib/

.PHONY: distclean
distclean: clean
	rm -rf node_modules/
