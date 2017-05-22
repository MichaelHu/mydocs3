# lzw

> The Lempel-Ziv-Welch ( LZW ) algorithm provides loss-less data compression.

* site: <http://rosettacode.org/wiki/LZW_compression>
* 提供`48种`语言的代码实现方案
* `不支持`码点大于255的压缩
* js的实现：<http://rosettacode.org/wiki/LZW_compression#JavaScript>


## js实现方案

	//LZW Compression/Decompression for Strings
	var LZW = {
		compress: function (uncompressed) {
			"use strict";
			// Build the dictionary.
			var i,
				dictionary = {},
				c,
				wc,
				w = "",
				result = [],
				dictSize = 256;
			for (i = 0; i < 256; i += 1) {
				dictionary[String.fromCharCode(i)] = i;
			}
	 
			for (i = 0; i < uncompressed.length; i += 1) {
				c = uncompressed.charAt(i);
				wc = w + c;
				//Do not use dictionary[wc] because javascript arrays 
				//will return values for array['pop'], array['push'] etc
			   // if (dictionary[wc]) {
				if (dictionary.hasOwnProperty(wc)) {
					w = wc;
				} else {
					result.push(dictionary[w]);
					// Add wc to the dictionary.
					dictionary[wc] = dictSize++;
					w = String(c);
				}
			}
	 
			// Output the code for w.
			if (w !== "") {
				result.push(dictionary[w]);
			}
			return result;
		},
	 
	 
		decompress: function (compressed) {
			"use strict";
			// Build the dictionary.
			var i,
				dictionary = [],
				w,
				result,
				k,
				entry = "",
				dictSize = 256;
			for (i = 0; i < 256; i += 1) {
				dictionary[i] = String.fromCharCode(i);
			}
	 
			w = String.fromCharCode(compressed[0]);
			result = w;
			for (i = 1; i < compressed.length; i += 1) {
				k = compressed[i];
				if (dictionary[k]) {
					entry = dictionary[k];
				} else {
					if (k === dictSize) {
						entry = w + w.charAt(0);
					} else {
						return null;
					}
				}
	 
				result += entry;
	 
				// Add w+entry[0] to the dictionary.
				dictionary[dictSize++] = w + entry.charAt(0);
	 
				w = entry;
			}
			return result;
		}
	}, // For Test Purposes
		comp = LZW.compress("TOBEORNOTTOBEORTOBEORNOT"),
		decomp = LZW.decompress(comp);
	document.write(comp + '<br>' + decomp);

输出：

	84,79,66,69,79,82,78,79,84,256,258,260,265,259,261,263
	TOBEORNOTTOBEORTOBEORNOT


