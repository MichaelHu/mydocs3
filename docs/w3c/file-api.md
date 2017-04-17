# file-api

* File API: <https://www.w3.org/TR/FileAPI/>
* `FileList, Blob, File, FileReader, URL scheme`

File继承自Blob


## Blob

### IDL

    [Constructor,
        Constructor(sequence<(ArrayBuffer or ArrayBufferView or Blob or DOMString)> blobParts, optional BlobPropertyBag options), Exposed=Window,Worker]
    interface Blob {

        readonly attribute unsigned long long size;
        readonly attribute DOMString type;
        readonly attribute boolean isClosed;

        // slice Blob into byte-ranged chunks

        Blob slice([Clamp] optional long long start,
                 [Clamp] optional long long end,
                 optional DOMString contentType);
        void close();

    };

    dictionary BlobPropertyBag {

        DOMString type = "";

    };

### Examples

    // Create a new Blob object

    var a = new Blob();

    // Create a 1024-byte ArrayBuffer
    // buffer could also come from reading a File

    var buffer = new ArrayBuffer(1024);

    // Create ArrayBufferView objects based on buffer

    var shorts = new Uint16Array(buffer, 512, 128);
    var bytes = new Uint8Array(buffer, shorts.byteOffset + shorts.byteLength);

    var b = new Blob(["foobarbazetcetc" + "birdiebirdieboo"], {type: "text/plain;charset=UTF-8"});

    var c = new Blob([b, shorts]);

    var a = new Blob([b, c, bytes]);

    var d = new Blob([buffer, b, c, bytes]);


    
## File

> inherits Blob

### IDL


### Exanples

    // obtain input element through DOM

    var file = document.getElementById('file').files[0];
    if(file)
    {
        // create an identical copy of file
        // the two calls below are equivalent

        var fileClone = file.slice();
        var fileClone2 = file.slice(0, file.size);

        // slice file into 1/2 chunk starting at middle of file
        // Note the use of negative number

        var fileChunkFromEnd = file.slice(-(Math.round(file.size/2)));

        // slice file into 1/2 chunk starting at beginning of file

        var fileChunkFromStart = file.slice(0, Math.round(file.size/2));

        // slice file from beginning till 150 bytes before end

        var fileNoMetadata = file.slice(0, -150, "application/experimental");
    }



## FileList

### IDL

    [Exposed=Window,Worker] interface FileList {
        getter File? item(unsigned long index);
        readonly attribute unsigned long length;
    };

### Examples

    // uploadData is a form element
    // fileChooser is input element of type 'file'
    var file = document.forms['uploadData']['fileChooser'].files[0];

    // alternative syntax can be
    // var file = document.forms['uploadData']['fileChooser'].files.item(0);

    if(file)
    {
        // Perform file ops
    }



## FileReader

### IDL

    [Constructor, Exposed=Window,Worker]
      interface FileReader: EventTarget {

        // async read methods
        void readAsArrayBuffer(Blob blob);
        void readAsText(Blob blob, optional DOMString label);
        void readAsDataURL(Blob blob);

        void abort();

        // states
        const unsigned short EMPTY = 0;
        const unsigned short LOADING = 1;
        const unsigned short DONE = 2;


        readonly attribute unsigned short readyState;

        // File or Blob data
        readonly attribute (DOMString or ArrayBuffer)? result;

        readonly attribute DOMError? error;

        // event handler attributes
        attribute EventHandler onloadstart;
        attribute EventHandler onprogress;
        attribute EventHandler onload;
        attribute EventHandler onabort;
        attribute EventHandler onerror;
        attribute EventHandler onloadend;

    };

### Examples





## FileReaderSync

### IDL

    [Constructor, Exposed=Worker]
    interface FileReaderSync {

        // Synchronously return strings

        ArrayBuffer readAsArrayBuffer(Blob blob); 
        DOMString readAsText(Blob blob, optional DOMString label);
        DOMString readAsDataURL(Blob blob);
    };



## Blob URL

### ABNF

    blob = scheme ":" origin "/" UUID [fragIdentifier]

    scheme = "blob"

    ; scheme is always "blob"

    ; origin is a string representation of the Blob URL's origin.
    ; UUID is as defined in [RFC4122]
    ; fragIdentifier is optional and as defined in [RFC3986]

### partial URL interface

    partial interface URL {

        static DOMString createObjectURL(Blob blob);
        static DOMString createFor(Blob blob);
        static void revokeObjectURL(DOMString url);

    };

`URL API`: <ref://./URL.md.html>，以上partial interface与URL API是相互独立的，ECMAScript User Agent可以只实现其中一个，如果只实现了partial interface而没有实现URL API，那么User Agents必须确保URL.prototype是不可用的。


### Examples

`场景1`：虽然拿不到File的本地文件路径，但是可以读取其内容，用图片展示出来。

    var file = document.getElementById('file').files[0];
    if(file){
        blobURLref = window.URL.createObjectURL(file);
        myimg.src = blobURLref;

        ....

    }


<div id="test_URL_createObjectURL" class="test">
<div class="test-container">

    @[data-script="javascript"](function(){

        var s = fly.createShow('#test_URL_createObjectURL');
        s.show(1);
        s.append_show(2);

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



`场景2`：打开一个HTML文件，并定位到某个锚点，使用`URL.createFor`：

    // file is an HTML file
    // One of the anchor identifiers in file is "#applicationInfo"

    var blobURLAnchorRef = URL.createFor(file) + "#applicationInfo";

    // openPopup is an utility function to open a small informational window

    var windowRef = openPopup(blobURLAnchorRef, "Application Info");


    ....
