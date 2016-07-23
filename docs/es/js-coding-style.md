# js coding style




## var

### 单行

    var a = 1;

### 多行

    var b = 2
        , c = 3
        , d = 4
        , e, f
        ;




## if-else

### 单分支

    if ( expr ) {
        ...
    }


### 两分支

    if ( expr ) {
        ...
    }
    else {
        ...
    }

### 多分支

    if ( expr ) {
        ...
    }
    else if ( expr2 ) {
        ...
    }
    else {
        ...
    }



## boolean

    if ( a >= b && a <= c ) {
        ...
    }

    if ( 

        a >= b && a <= c 
        || d % 5 == 0
        || e < 200
        
        ) {
        ...
    }

    if ( 

        (
            a >= b 
                && a <= c 
                && b > 25
            || d % 5 == 0
        )
        && e < 200

        ) {
        ...
    }



## for

    for ( var i = 0; i < len; i++ ) {
        ...
    }


## while

    while ( i < len ) {
        ...
    }



## function

    function foo(param1, param2) {
        ...
    }

    foo(a, b);

    $el.on('click', function() {
        ...
    });

    (function(params) {
        ...
    })(p);



## object

    var config = { key1: 'value1', key2: 'value2' };

    var config = {
            type: 1
            , key1: 'value1'
            , key2: 'value2'
        };

    var config1 = {
            type: 1
            , key1: 'value1'
            , key2: 'value2'
        }
        , config2 = {
            type: 2
            , key1: 'value1'
            , key2: 'value2'
        }
        ;


## array

    var arr = [ 1, 2, 3 ];
    var arr1 = [ new A(), new B() ];
    var arr2 = [
            { type: 1, key1: 'value1' }
            , { type: 1, key1: 'value1' }
        ];


## ternary expression 

    expr ? a : b

    expr
    ? a
    : b
    
    ( expr )
    ? ( a )
    : ( b )

    ( 
        expr 
    )
    ? ( 
        a 
    )
    : ( 
        b 
    )


