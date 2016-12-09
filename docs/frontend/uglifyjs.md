# uglifyjs

> JavaScript parser / mangler / compressor / beautifier library for NodeJS.

* <http://marijn.haverbeke.nl/uglifyjs>
* <https://github.com/mishoo/UglifyJS>
* <https://github.com/mishoo/UglifyJS2>
* API Refs: <https://github.com/mishoo/UglifyJS2#api-reference>
* compress options: <http://lisperator.net/uglifyjs/compress>
* outpit options: <http://lisperator.net/uglifyjs/codegen>


## install

    npm install uglify-js
    npm install uglify-js@1


## CLI usage

	uglifyjs /home/doe/work/foo/src/js/file1.js \
			 /home/doe/work/foo/src/js/file2.js \
			 -o foo.min.js \
			 --source-map foo.min.js.map \
			 --source-map-root http://foo.com/src \
			 -p 5 -c -m


## API usage

	var UglifyJS = require( 'uglify-js' );

	var result = UglifyJS.minify(
		[ './src/sigma.utils.layoutNew.js' ]
		, {
			output: {
				"comments": /@license/
			}
		}
	);

	console.log( result.code );


