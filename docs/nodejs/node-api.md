# node api 


<http://nodeapi.ucdok.com/api/index.html>

<https://nodejs.org/api/>

Changelog: <https://github.com/nodejs/node/blob/v4.4.5/CHANGELOG.md>
* 2015-10-05 Version 4.1.2 Stable
* 2015-09-08 Version 4.0.0 Stable
* 2015-07-09 Version 0.12.7 Stable ， 对应 npm 2.11.3


## Assertion Testing
## Modules
## Exports
## Child Processes

### child_precess模块

    const spawn = require( 'child_process' ).spawn;

### .exec

`exec( command[, options][, callback] )`

    const exec = require( 'child_process' ).exec;
    exec( 'cat *.js bad_file | wc -l', ( error, stdout, stderr ) => {
        if ( error ) {
            console.error( `exec error: ${error}` );
            return;
        }
        console.log( `stdout: ${stdout}` );
        console.log( `stderr: ${stderr}` );
    } );


### .execFile

`execFile( file[, args][, options][, callback] )`

    const execFile = require( 'child_precess' ).execFile;
    const child = execFile( 'node', [ '--version' ], ( error, stdout, stderr ) => {
        if ( error ) {
            throw error;
        }
        console.log( stdout );
    } );

### .fork
### .spawn
### .execSync
### .execFileSync
### .spawnSync

## Buffer

> The Buffer class is a global type for dealing with binary data directly. It can be constructed in a variety of ways.

1. 用于直接处理二进制数据
2. 多种方式构建

### .toString() 

`.toString( [encoding[, start[, end]]] )`


## VM
## Cluster
## Console
## Crypto
## Debugger
## DNS
## Domain
## Events
## File System
## Globals
## HTTP
## HTTPS
## Modules
## Net
## OS
## Path
## Process

> The process object is a `global` that provides information about, and control over, the current Node.js process.

1. `global`，不需要require
2. 当前node进程相关信息和控制入口
3. 无`.argc`，因为`.argv`本身是一个数组，隐含`.argc`

### .argv, .argv0

> .argv0 >= 6.4.0


### .env, .pid 

### .arch, .platform 

### .cwd(), .chdir()

### ...


## Punycode
## Query Strings
## Readline
## REPL
## Smalloc
## Stream
## String Decoder
## Timers
## TLS/SSL
## TTY
## UDP/Datagram
## URL
## Utilities
## VM
## ZLIB




