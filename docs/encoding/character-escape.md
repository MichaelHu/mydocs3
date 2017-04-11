# character escape

> 字符转义方式


## javascript

### js RegExp

    // Support: Android <=4.0 only
    // Make sure we trim BOM and NBSP
    rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g

模式匹配串引用：`$0-$9`

    if ( /[?&]name=([^&]*)/.test( location.href ) ) {
        return {
                key: 'name'  
            }; 
    }

模式引用：


### js escape

    console.log( escape( '百度' ) );
    %u767E%u5EA6

### js encodeURI

> URI encoding

    console.log( encodeURIComponent( '百度' ) );
    %E7%99%BE%E5%BA%A6





## awk regexp

    awk '/\x61/{print}'
    awk '/百/{print}'

貌似不支持`\uxxxx`




## vim magic

    \%d	match specified decimal character (eg \%d123)
    \%x	match specified hex character (eg \%x2a)
    \%o	match specified octal character (eg \%o040)
    \%u	match specified multibyte character (eg \%u20ac)
    \%U	match specified large multibyte character (eg




## sed

> 无码点转义序列，需要直接输入，只提供常用的特殊转义

    backslash          \\
    alert              \a
    form-feed          \f
    carriage-return    \r
    tab                \t
    vertical tab       \v

### s command

    [2addr]s/regular expression/replacement/flags

其中的`replacement`部分：
    
    &       匹配正则的整个字符串
    \1-\9   匹配正则子模式（序号为1-9）的字符串





## html entity

    &nbsp;
    &ensp;
    &emsp;
    &#8194;
    &#8195;
    &#12288;

## css

    font-family: "Hiragino Sans GB","Microsoft Yahei",'\5B8B\4F53';


