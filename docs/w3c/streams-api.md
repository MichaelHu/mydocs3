# streams api

> Provides APIs for creating, composing, and consuming streams of data.

* Living: <https://streams.spec.whatwg.org/>
* Retired: <https://www.w3.org/TR/streams-api/> 

## Overview

* 三类Streams：`Readable Streams, Writable Streams, Transform Streams`
* 封装`低级I/O原语`，基于之可以构建高级的抽象，比如FileSystem或者Socket API
* Transform Streams Examples:
    * A GZIP compressor
    * A video decoder
    * A text decoder
    * A CSV-to-JSON converter



## Readable Streams

### pipeTo
    
A:

    readableStream.pipeTo(writableStream)
        .then(() => console.log("All data successfully written!"))
        .catch(e => console.error("Something went wrong!", e));


B:

    readableStream.pipeTo(new WritableStream({
        write(chunk) {
            console.log("Chunk received", chunk);
        },
        close() {
            console.log("All data successfully read!");
        },
        abort(e) {
            console.error("Something went wrong!", e);
        }
    }));

### getReader

A - `text`:

    const reader = readableStream.getReader();

    reader.read().then(
        ({ value, done }) => {
            if (done) {
                console.log("The stream was already closed!");
            } else {
                console.log(value);
            }
        },
        e => console.error("The stream became errored and cannot be read from!", e)
    );


B - `byob`: 

    const reader = readableStream.getReader({ mode: "byob" });

    let startingAB = new ArrayBuffer(1024);
    readInto(startingAB)
        .then(buffer => console.log("The first 1024 bytes:", buffer))
        .catch(e => console.error("Something went wrong!", e));

    function readInto(buffer, offset = 0) {
        if (offset === buffer.byteLength) {
            return Promise.resolve(buffer);
        }

        const view = new Uint8Array(buffer, offset, buffer.byteLength - offset);
        return reader.read(view).then(newView => {
            return readInto(newView.buffer, offset + newView.byteLength);
        });
    }





