# node api 


## Resources

* `API docs`: <https://nodejs.org/api/>
* <http://nodeapi.ucdok.com/api/index.html>


## Changelog 

> `releases`: <https://nodejs.org/download/release/>

* 2017-12-08 v9.3.0
* ...
* 2017-11-01 v9.0.0
* ...
* 2017-08-15 v8.4.0                                            
* 2017-08-15 v8.4.0                                            
* 2017-08-10 v8.3.0                                            
* 2017-07-28 v8.2.1                                            
* 2017-07-20 v8.2.0                                            
* 2017-07-11 v8.1.4                                            
* 2017-06-29 v8.1.3                                            
* 2017-06-22 v8.1.2                                            
* 2017-06-13 v8.1.1                                            
* 2017-06-09 v8.1.0                                            
* 2017-06-13 Version 8.1.1 Stable
* 2017-04-11 v7.9.0
* 2017-03-29 v7.8.0
* 2017-03-21 `v6.10.1`
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

    const fs = require( 'fs' );
    fs.
        access( path[, mode], callback )
        accessSync( path[, mode] )
        appendFile( file, data[, options], callback )
        appendFileSync( file, data[, options] )
        chmod( path, mode, callback )
        chmodSync( path, mode )

        chown( path, uid, gid, callback )
        chownSync( ... )
        close( fd, callback )
        closeSync( fd )
        constants
        createReadStream( path[, options] )
        createWriteStream( path[, options] )
        exists( path, callback )
        ...



## Globals

    Class:Buffer        // Used to handle binary data
    __dirname
    __filename
    clearImmediate( immediateObject )
    clearInterval( intervalObject )
    clearTimeout( timeoutObject )
    console
    exports
    global
    module
    process
        process.argv                            <string []>
            $ node --harmony script.js --version
            ['/usr/local/bin/node', 'script.js', '--version']
        process.chdir( directory )
        process.config
        process.cpuUsage( [previousValue] )
        process.cwd()
        process.env                             <Object>
        process.execArgv                        <string []>
            $ node --harmony script.js --version
            ['--harmony']
        process.execPath
        process.exit( [code] )
        process.getgid()
        process.getgroups()
        process.getuid()
        process.kill( pid[, signal] )
        process.memoryUsage()
        process.nextTick( callback[, ...args])

    require()
        require.cache
        require.resolve()
    setImmediate( callback[, ...args] )
    setInterval( callback, delay[, ...args] )
    setTimeout( callback, delay[, ...args] )


## HTTP
## HTTPS
## Modules
## Net
## OS
## Path
> <https://nodejs.org/api/path.html>

标准化路径，解析`//, .., .`等
    path.normalize( path )

解析成标准化的`绝对路径`，包含标准化的过程
    path.resolve( [...paths] )

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





