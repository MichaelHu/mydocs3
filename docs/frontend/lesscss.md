# lesscss备忘


> @[style="color:green;font-size:18px"]Leaner CSS

`github`: <https://github.com/less/less.js>

`docs`: <http://lesscss.org>

Less是一个CSS预处理器，扩展了CSS语言，添加了新的特性：允许变量、mixin、
函数以及其他使得css更加容易维护和扩展的技术。

## 安装和使用

1. nodejs命令行方式
        
        > npm install -g less
        > lessc style.less > style.css
    
    如若需要压缩格式：

        > lessc -x style.less > style.css

    如若需要压缩得更干净：

        > lessc --clean-css style.less > style.css

2. 第三方工具使用，比如nodejs

        var less = require('less');

        less.render('.class { width: (1 + 1) }', function (e, css) {
          console.log(css);
        });

3. 浏览器中使用，不推荐用于产品

        <head>
            <link rel="stylesheet/less" type="text/css" href="styles.less" />
            <script src="less.js" type="text/javascript"></script>
        </head>        

    编译选项通过设置全局`less`变量，该设置需要在`less.js`调用前：

        <script>
          less = {
            env: "development",
            async: false,
            fileAsync: false,
            poll: 1000,
            functions: {},
            dumpLineNumbers: "comments",
            relativeUrls: false,
            rootpath: ":/a.com/"
          };
        </script>
        <script src="less.js"></script>

    `小贴士：`
    * `link`标签需要在`script`标签前
    * 多个less文件的编译是独立的，它们之间的变量，函数等不能共享

## Functions



### Misc Functions


#### color

`color("#aaa")` => `#aaa`



#### convert

    convert(9s, "ms")
    convert(14cm, mm)
    convert(8, mm) // incompatible unit types

输出：

    9000ms
    140mm
    8


#### data-uri

`不指定MIME`：

    data-uri('../data/image.jpg');

第三方或命令行输出：

    url('data:image/jpeg;base64,bm90IGFjdHVhbGx5IGEganBlZyBmaWxlCg==');

浏览器输出：

    url('../data/image.jpg');

`指定MIME`：

    data-uri('image/jpeg;base64', '../data/image.jpg');

输出：

    url('data:image/jpeg;base64,bm90IGFjdHVhbGx5IGEganBlZyBmaWxlCg==');


#### default

> Available `only` inside guard conditions and returns `true` 
> only if no other `mixin` matches, false otherwise.

    .x {
      .m(red)                                    {case-1: darkred}
      .m(blue)                                   {case-2: darkblue}
      .m(@x) when (iscolor(@x)) and (default())  {default-color: @x}
      .m('foo')                                  {case-1: I am 'foo'}
      .m('bar')                                  {case-2: I am 'bar'}
      .m(@x) when (isstring(@x)) and (default()) {default-string: and I am the default}

      &-blue  {.m(blue)}
      &-green {.m(green)}
      &-foo   {.m('foo')}
      &-baz   {.m('baz')}
    }

输出：

    .x-blue {
      case-2: #00008b;
    }
    .x-green {
      default-color: #008000;
    }
    .x-foo {
      case-1: I am 'foo';
    }
    .x-baz {
      default-string: and I am the default;
    }

#### unit

> Remove or change the unit of a dimension

`unit(5, px)`  => `5px`

`unit(5em)`    => `5`



#### get-unit

> Returns units of a number.

`get-unit(5px)` => `5`

`get-unit(5)` => `//nothing`



#### svg-gradient

> Generates multi-stop svg gradients.

    div {
        background-image: svg-gradient(to right, red, green 30%, blue);
    }

输出：

    div {
        background-image: url('data:image/svg+xml;base64,....')
    }


`direction参数`：必须为以下值之一，
* `to bottom`
* `to right`
* `to bottom right`
* `to top right`
* `ellipse`
* `ellipse at center`








### 字符串函数

#### escape

`escape('a=1')` => `a%3D1`


#### e

> CSS escaping, replaced with `~"value"` syntax. Returned string 
> is an escaped string, `without quotes`.

    filter: e("ms:alwaysHasItsOwnSyntax.For.Stuff()");

输出：

    filter: ms:alwaysHasItsOwnSyntax.For.Stuff();


#### % format

> Thr function `%(string, arguments, ...)` formats a string.

    format-a-d: %("repetitions: %a file: %d", 1 + 2, "directory/file.less");
    format-a-d-upper: %('repetitions: %A file: %D', 1 + 2, "directory/file.less");
    format-s: %("repetitions: %s file: %s", 1 + 2, "directory/file.less");
    format-s-upper: %('repetitions: %S file: %S', 1 + 2, "directory/file.less");

Output:

    format-a-d: "repetitions: 3 file: "directory/file.less"";
    format-a-d-upper: "repetitions: 3 file: %22directory%2Ffile.less%22";
    format-s: "repetitions: 3 file: directory/file.less";
    format-s-upper: "repetitions: 3 file: directory%2Ffile.less";

#### replace

> `replace(string, pattern, replacement, flags)`

    replace("Hello, Mars?", "Mars\?", "Earth!");
    replace("One + one = 4", "one", "2", "gi");
    replace('This is a string.', "(string)\.$", "new $1.");
    replace(~"bar-1", '1', '2');

Output:

    "Hello, Earth!";
    "2 + 2 = 4";
    'This is a new string.';
    bar-2;

<b></b>





### List Functions

#### length

`参数`: 逗号或者空格分隔的列表。

`length(1px solid #0080ff);`  =>  `3`

    @list: "banana", "tomato", "potato", "peach";
    n: length(@list);

Output:

    n: 4;

#### extract

> Returns the value at a specified position in a list.

`extract(8px dotted red, 2);`   =>  `dotted`

    @list: apple, pear, coconut, orange;
    value: extract(@list, 3);

Output:

    value: coconut;






### Math Functions

* `ceil(number)`
* `floor(number)` 
* `percentage(number)` 
* `round(number)` 
* `sqrt(number)` 
* `abs(number)` 
* `sin(number)` 
* `asin(number)` 
* `cos(number)` 

        cos(1) // cosine of 1 radian
        cos(1deg) // cosine of 1 degree
        cos(1grad) // cosine of 1 gradian

    Output:

        0.5403023058681398 // cosine of 1 radian
        0.9998476951563913 // cosine of 1 degree
        0.9998766324816606 // cosine of 1 gradian

* `acos(number)` 
* `tan(number)` 
* `atan(number)` 
* `pi()` 
* `pow(base, exponent)` 

        pow(0cm, 0px)
        pow(25, -2)
        pow(25, 0.5)
        pow(-25, 0.5)
        pow(-25%, -0.5)

    Output:

        1cm
        0.0016
        5
        NaN
        NaN%



* `mod(a, b)` 

        mod(0cm, 0px)
        mod(11cm, 6px);
        mod(-26%, -5);

    Output:

        NaNcm;
        5cm
        -1%;

* `min(arguments, ...)` 

        min(3px, 42px, 1px, 16px);

    Output:

        1px

* `max(arguments, ...)` 






### Type Functions

* `isnumber(value)`

        isnumber(#ff0);     // false
        isnumber(blue);     // false
        isnumber("string"); // false
        isnumber(1234);     // true
        isnumber(56px);     // true
        isnumber(7.8%);     // true
        isnumber(keyword);  // false
        isnumber(url(...)); // false

* `isstring(value)`
* `iscolor(value)`
* `iskeyword(value)`
* `isurl(value)`

        isurl(#ff0);     // false
        isurl(blue);     // false
        isurl("string"); // false
        isurl(1234);     // false
        isurl(56px);     // false
        isurl(7.8%);     // false
        isurl(keyword);  // false
        isurl(url(...)); // true

* `ispixel(value)`
* `isem(value)`
* `ispercentage(value)`
* `isunit(value)`






### Color Definition Functions

#### rgb

`rgb(90, 129, 32)` => `#5a8120`

`rgb(90%, 29%, 32%)` => todo


#### rgba

`rgba(90, 129, 32, 0.5)` => `rgba(90, 129, 32, 0.5)` 


#### argb

> Creates a hex representation of a color in `#AARRGGBB` format (NOT `#RRGGBBAA`!).

    argb(rgba(90, 23, 148, 0.5));

Output: 

    #805a1794

#### hsl

> Creates an opaque color object from `hue(色调), saturation(饱和度) 
> and lightness(亮度)(HSL)` values.

`hsl(90, 100%, 50%)` => `#80ff00`

这个很有用，如果你想基于一个颜色的色道创建新的颜色，比如：

    @new: hsl(hue(@old), 45%, 90%);

@new拥有@old的hue值，但有自己独特的saturation和lightness。


#### hsla

> Creates an transparent color object from `hue, saturation, lightness and alpha(HSLA)` values.

    hsla(90, 100%, 50%, 0.5)

Output: 

    rgba(128, 255, 0, 0.5)

#### hsv

> Creates an opaque color object from `hue, saturation and value(HSV)` values. 

    hsv(90, 100%, 50%)

Output: 

    #408000

#### hsva

> Creates an transparent color object from `hue, saturation, value and alpha(HSVA)` values. 

    hsva(90, 100%, 50%, 0.5)

Output: 

    rgba(64, 128, 0, 0.5)

### Color Channel Functions

#### hue

    hue(hsl(90, 100%, 50%))

Output: 

    90

#### saturation

    saturation(hsl(90, 100%, 50%))

Output: 

    100%

#### lightness

    lightness(hsl(90, 100%, 50%))

Output: 

    50%

#### hsvhue
#### hsvsaturation
#### hsvvalue
#### red
#### green
#### blue
#### alpha
#### luma
#### luminance



### Color Operation Functions

#### saturate
#### desaturate
#### lighten
#### darken
#### faden
#### spin
#### mix
#### greyscale
#### contrast



### Color Blending Functions

#### multiply 
#### screen 
#### overlay 
#### softlight 
#### hardlight 
#### exclusion 
#### average 
#### negation 

