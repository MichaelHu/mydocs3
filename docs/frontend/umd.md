# umd

> 同时支持`commonjs、amd以及全局对象（或当前上下文对象）`三种方式的`模块构建方式`。

## Resources

* `amd`: <ref://./amd.md.html>
* `commonjs`: <ref://./commonjs.md.html>


## umd style

    ( function( root, factory ) {
        // commonjs
        if( typeof exports === 'object' && typeof module === 'object' )
            module.exports = factory();
        // amd
        else if( typeof define === 'function' && define.amd )
            define( [], factory );
        // global或当前上下文对象
        else {
            var a = factory();
            for( var i in a ) 
                ( typeof exports === 'object' ? exports : root )[i] = a[i];
        }
    } )( this, function() { ... } );

