src = js/src/validator.js
out = public/validator.js
min = public/validator.min.js

all:
	cp ${src} ${out}
	curl -s \
		-d compilation_level=SIMPLE_OPTIMIZATIONS \
		-d output_format=text \
		-d output_info=compiled_code \
	 --data-urlencode "js_code@${out}" \
	 http://closure-compiler.appspot.com/compile > ${min}
