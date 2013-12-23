
build: components lib/index.js
	@component build --dev

components: component.json
	@component install --dev

carry.js: components
	@component build --standalone carry --name carry --out .

clean:
	rm -fr build components template.js

test: build
	open test/index.html

.PHONY: clean carry.js test
