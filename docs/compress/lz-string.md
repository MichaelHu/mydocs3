# lz-string

> Javascript compression, fast!

* 设计目标：支持在`localStorage`中存储大数据量，一种字符串压缩
* site: <http://pieroxy.net/blog/pages/lz-string/index.html>
* github: <https://github.com/pieroxy/lz-string/>
* demo: <http://pieroxy.net/blog/pages/lz-string/demo.html>
* 比较库：LZW, LZMA, GZip

## 性能

For performace comparison, I use LZMA level 1 as a comparison point.

* For strings smaller than 750 characters, this program is 10x faster than LZMA level 1. It produces smaller output.
* For strings smaller than 100 000 characters, this program is 10x faster than LZMA level 1. It produces bigger output.
* For strings bigger than 750 000 characters, this program is slower than LZMA level 1. It produces bigger output.


## 其他语言实现

### Java实现
> 只支持lz-string 1.3.3版本
* Diogo Duailibe did an implementation in Java:
	<https://github.com/diogoduailibe/lzstring4j>
* Another implementation in Java, with base64 support and better performances by rufushuang
	<https://github.com/rufushuang/lz-string4java>

### C#实现
* Jawa-the-Hutt did an implementation in C#:
	<https://github.com/jawa-the-hutt/lz-string-csharp>
* kreudom did another implementation in C#, more up to date:
	<https://github.com/kreudom/lz-string-csharp>

### PHP实现
* nullpunkt released a php version:
	<https://github.com/nullpunkt/lz-string-php>

### Python 3实现
* eduardtomasek did an implementation in python 3:
	<https://github.com/eduardtomasek/lz-string-python>

### Go实现
* I helped a friend to write a Go implementation of the decompression algorithm:
	<https://github.com/pieroxy/lz-string-go>

### Elixir实现
* Here is an Elixir version, by Michael Shapiro:
	<https://github.com/koudelka/elixir-lz-string>

### C++实现
* Here is a C++/Qt version, by AmiArt:
	<https://github.com/AmiArt/qt-lzstring>

