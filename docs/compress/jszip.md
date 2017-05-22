# jszip

> A library for creating, reading and editing `.zip` files with Javascript, with a lovely and simple API.

* site: <https://stuk.github.io/jszip/>
* github: <https://github.com/Stuk/jszip>
* 底层使用`pako` <ref://./pako.md.html>
* `浏览器`中，用js来处理`.zip`文件
* 支持`全系浏览器`，低至IE6

## Installation

    npm install jszip
    bower install Stuk/jszip
    component install Stuk/jszip

手工方式，下载<http://github.com/Stuk/jszip/zipball/master>：
    
    dist/jszip.js
    dist/jszip.min.js


## Usage

    var zip = new JSZip();

    zip.file("Hello.txt", "Hello World\n");

    var img = zip.folder("images");
    img.file("smile.gif", imgData, {base64: true});

    zip.generateAsync({type:"blob"}).then(function(content) {
        // see FileSaver.js
        saveAs(content, "example.zip");
    });

    /*
    Results in a zip containing
    Hello.txt
    images/
        smile.gif
    */
