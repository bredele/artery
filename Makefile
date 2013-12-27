
build: components lib/index.js
	@component build --dev

components: component.json
	@component install --dev

artery.js: components
	@component build --standalone artery --name artery --out .

clean:
	rm -fr build components template.js

test: build
	open test/index.html

.PHONY: clean artery.js test
