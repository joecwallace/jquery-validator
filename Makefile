in = public/validator.js
out = public/validator.min.js	

all:
	curl -s \
		-d compilation_level=SIMPLE_OPTIMIZATIONS \
		-d output_format=text \
		-d output_info=compiled_code \
	 --data-urlencode "js_code@${in}" \
	 http://closure-compiler.appspot.com/compile > ${out}