# Windows Shell 编程

hudamin 2010-11-01 ~ 2012-10-14 转载请注明出处

> Windows Shell编程入门


## 1. 如何设定运行的环境变量？

先敲入

    help

命令行界面会粗略列出批处理程序支持的各种命令。跟环境变量设置有关的是`set`命令。再输入命令

    help set

以具体了解set命令的语法。以下列出了set命令的语法：

    set [variable=[string]]

1.  vairable，指定的`环境变量名`，变量名`不能含有等号，不区分大小写`；string，字符串
2.  不带等号和任何参数时，set命令显示当前所有环境变量
3.  紧贴等号前后建议不要包含任何空白字符，string部分可以含有空白符。若紧贴等号前后含有空白符，等号前面的部分（包含空白符）都属于环境变量名部分，等号后面的部分（包含空白符）都属于字符串部分，也即环境变量名可以含空白符。比如：

        $ set t =abc
        $ echo %t %
        abc

        $ set t  = abc
        $ echo %t  %
        abc

        $ set t 1 = abcd
        $ echo %t 1 %
        abcd

        $ set t
        t =abc
        t = abc
        t 1 = abcd

        $ if %t 1 % == abcd echo ok
        ok

    以上语句分别定义了三个环境变量（若以下划线表示空格）分别为`t_，t__, t_1_`。虽然可以定义含有空白符的环境变量，但是可阅读性太差，不建议使用。

4.  命令

        $ set p

    显示所有以p为前缀的环境变量的值（会进行前缀匹配，并且不区分大小写）

5.  命令

        $ set p=

    清除环境变量p，这时如果输入set p，会提示环境变量p没有设定。

6.  获取一个未定义的环境变量，不进行任何解析，如下：

        $ set v=
        $ set m=%v%abc
        $ echo %m%
        %v%abc

7.  开关扩展`/a`

        set /a expression

    expression支持表达式格式，包括`算术运算符、逻辑运算符、位运算符、赋值操作符以及逗号表达式`等。
    expression里的环境变量名会以`数字格式`看待：

    * 如果环境变量未定义，则返回0，
    * 如果环境变量是数字，则返回对应数字，
    * 如果环境变量属于非数字，也返回0。

    这种情况下在表达式中引用另外一个环境变量，不使用%，直接使用变量名称即可，
    当然使用%的话，会被作为取模操作符。

        $ set /a 10*78/2
        390

        $ set /a t
        0

        $ set /a t=10/2
        5

        $ set /a t=abc
        0

        $ set /a t=12345
        12345

        $ set /a t_1=t
        12345

        $ set t
        t=12345
        t_1=12345

8.  开关扩展`/p`

        set /p variable=[prompString]

    按用户输入设置环境变量的值。variable的含义同上所述。
    promptString是可以自定义的提示字符串。等号不能省略，否则提示语法错误。

        $ set /p t=
        $ 34567
        $ set /a t
        34567

        $ set /p t=[input:]
        [input:]7890

        $ set /a t
        7890

9.  环境变量替换扩展

        %t:str1=str2%

    以上变量引用会将环境变量t内所有的str1替换成str2，并返回

        $ set t=utabcut
        utabcut

        $ echo %t:ut=mt%
        mtabcmt

        $ echo %t%
        utabcut

    再加一些特殊的环境变量替换：

        $ set t="ABC"
        $ echo %t:"=+%
        "ABC"

        rem 未启用延迟绑定
        $ set t=!kif!
        $ echo %t:!=+%
        +kif+

        rem 启用延时绑定
        $ set t=%kif%
        rem 百分号需要用两个
        $ echo !t:%%=+!
        +kif+

10. 环境变量子串值扩展

        %t:~10,5%

    以上变量引用会将环境变量t从第11个开始的5个字符返回。

        $ set t=12345abcdehello
        $ echo %t:~10,5%
        hello

        $ set /a t=%t:~0,5%
        12345

    索引值也支持负数，如下

        $ set t=12345
        $ rem t的除了最后两个字符的字串
        $ set t=%t:~0,-2%
        $ echo %t%
        123

## 2. 命令扩展

命令扩展`默认启用`。开启或关闭命令扩展，使用cmd.exe的开关`/e:on或/e:off`。
启用命令扩展可以增强命令的功能，后续的命令说明中有时会添加“如果命令扩展被启用，则某些功能生效”，
意即这些功能生效的前提是启用了命令扩展。

## 3. 延迟环境变量扩展

    $ C:\Windows\System32\cmd.exe /v:on
    $ C:\Windows\System32\cmd.exe /v:off

延迟环境变量扩展，就是环境变量的`动态计算`，或者说是变量的`晚绑定（late binding）`。
默认情况下，该功能是`关闭`的，可以通过/v:on开关开启该功能。举例说明如下：

    set VAR=before

    if "%VAR%" == "before" (
        set VAR=after
        if "%VAR%" == "after" @echo If you see this, it worked
    )

以上代码，你不会看到”If you see this, it worked”，因为if作为一个`复合语句`，在执行之前，
环境变量一次性先替换成before，在执行的时候%VAR%的部分已经是before，永远不会等于after。再看下面的例子：

    rem 清除环境变量LIST
    set LIST=
    for %i in (*) do set LIST=%LIST% %i
    echo %LIST%

假设当前目录最后一个文件名为abc.dll，则以上脚本输出：

    %LIST% abc.dll

LIST不会不断拼接，因为复合语句for在执行之前，就已经进行了环境变量替换，
将%LIST%部分替换成对未定义环境变量的引用。若要达到预期的效果，可以使用
cmd.exe的/v:on开关打开，并用`叹号(!)替代百分号(%)`来引用环境变量的值。

以上两段代码可以写成：

    set VAR=before
    if "%VAR%" == "before" (
        set VAR=after
        if "!VAR!" == "after" @echo If you see this, it worked
    )

和

    rem 清除环境变量LIST
    set LIST=
    for %i in (*) do set LIST=!LIST! %i
    echo %LIST%


## 4. 特定环境变量

如果命令扩展被启用，以下`预定义环境变量`会被扩展，但是当你输入`set`时，不会作为环境变量显示：

* `%CD%` - 扩展到当前目录字符串。
* `%DATE%` - 用跟 DATE 命令同样的格式扩展到当前日期。
* `%TIME%` - 用跟 TIME 命令同样的格式扩展到当前时间。
* `%RANDOM%` - 扩展到 0 和 32767 之间的任意十进制数字。
* `%ERRORLEVEL%` - 扩展到当前 ERRORLEVEL 数值。
* `%CMDEXTVERSION%` - 扩展到当前命令处理器扩展版本号。
* `%CMDCMDLINE%` - 扩展到调用命令处理器的原始命令行。

在复合语句中，若需要使用以上环境变量的晚绑定的值，也需要打开延迟环境变量扩展，并使用叹号包含变量名。



## 5. 命令分隔符

若需要在同一行上放置多个命令，那么就需要用到命令分隔符了。比如以下语句：

    if abc == Abc (
        echo hello
        set b=ok
        echo , world !!
    ) else (echo okay !!)

若要在一行上完成，则可以使用命令分隔符，如下：

    if abc == Abc ( echo hello && set b=ok && echo “, world !!”) else (echo “okay !!”)

> 若要正常无忧地使用命令分隔符，请将命令的字符串都用双引号包围。

还有其他命令分隔符：`&`, `||`。

附带地注意一下，子句起始符`左括号”(”必须有前导空白符`。

## 6. @前缀

命令前加上@，可以关闭该命令的回显信息。

    # rem echo前未加@
    # for %i in (*) do echo %i
    > a.txt
    > C:\Windows\System32>echo devmgr.dll
    > devmgr.dll
    > 
    > C:\Windows\System32>echo devobj.dll
    > devobj.dll

    # rem echo前添加@前缀
    # for %i in (*) do @echo %i
    > devmgr.dll
    > devobj.dll

若要关闭整个子句的回显信息，可以在子句前面添加@。
    # for %i in (*) do @(if %i == zipfldr.dll echo ok)
    > ok

若要关闭所有命令的回显信息，使用echo的off开关。

    # rem 关闭所有命令的回显
    # echo off

恢复命令回显，使用on开关

    # rem 打开所有命令的回显
    # echo on









## 7 判断语句

### 7.1 if子句

    IF [NOT] ERRORLEVEL number command
    IF [NOT] string1==string2 command
    IF [NOT] EXIST filename command

1.  `not`，逻辑取非
2.  `errorlevel number`，上一个命令的退出代码`不小于`指定数字number则为true
3.  `string1==string2`，判断两个字符串是否相等，相等则true，否则为false。
    若string内部含有的空白符会破坏语句结构，则在前后添加双引号（”），使其成为一个整体。
    建议字符串最好以`双引号包围`，避免破环复合语句结构。当然，等号（==）前后是可以包含空白符的。比如：

        # set t=abc
        # rem 环境变量t的值内部不含空白符，可以直接比较
        # if %t%==abc echo ok
        > ok

        # set t=ab c
        # rem if语句执行前，会进行t环境变量的替换，
        # rem 替换后成为if ab c == abc echo ok，破坏了if语句结构，解析器报错
        # if %t% == abc echo ok
        > 此时不应有c

    正确的做法应该是添加双引号，

        # set t=ab c
        # if "%t%" == "ab c" echo ok
        > ok

    举个例子，判断目录中是否含有指定文件zipfldr.dll，可以这么写：

        # for %i in (*) do @(if %i == zipfldr.dll echo ok)
        > ok

    or

        # for %i in (*) do @(if "%i" == "zipfldr.dll" echo ok)
        > ok

    当然，这是不取巧的方法，因为这个功能一个语句就可以搞定，请看后面。

4.  `exist filename`，判断指定文件是否存在，若存在则为true，否则为false。例如以上功能可以写成：

        # if exist zipfldr.dll echo ok
        > ok

    如果命令扩展启用，if语句还支持以下格式的语法：

        IF [/I] string1 compare-op string2 command
        IF CMDEXTVERSION number command
        IF DEFINED variable command

    第一种格式，进行字符串比较，`/i`表示`case insensitive`。compare-op支持的操作包括：

        EQU equal
        NEQ not equal
        LSS less than
        LEQ less than and equal
        GTR greater than
        GEQ greater than and equal

    以上比较操作实际是通用比较，`如果string1和string2都是数字，两者都会先转换成数字，再进行比较`。例如：

        # if 1a lss 2a (echo less) else (echo big)
        > less

        # if 123a lss 2a (echo less) else (echo big)
        > less

        # if 123 lss 23 (echo less) else (echo big)
        > big


### 7.2 else子句

else子句`必须出现在if子句结束的同一行上面`。

    rem 第一种写法，都在同一行
    if exist zipfldr.dll @( echo ok) else (echo no)

    rem 第二种写法，else部分用子句方式
    if exist zipfldr.dll @( echo ok) else (
        echo no
    )

    rem 第三种写法，if部分用子句方式
    if exist zipfldr.dll @(
        echo ok
    ) else (echo no)

    rem 第四写法，if和else部分都用子句方式
    if exist zipfldr.dll @(
        echo ok
    ) else (
        echo no
    )

以下方式的写法是`错误的`。

    rem 第一种错误写法，第一个echo后面的部分都会作为echo的参数
    if exist zipfldr.dll @echo ok else echo no

    rem 第二这错误写法，else没有放在if子句结束的同一行上面
    if exist zipfldr.dll echo ok
    else echo no

    rem 第三种错误写法，else仍然没有同if子句的结束在同一行上
    if exist zipfldr.dll (
        echo ok
    )
    else echo


### 7.3 判断语句FAQ

1. 多个条件表达式如何表示？

    http://stackoverflow.com/questions/2143187/logical-operators-and-or-in-dos-batch

    DOS的if语句`不支持and 和 or的逻辑表达式，只能用嵌套if来模拟`。

    比如与、或等条件表达式。



## 8. 循环语句

### 8.1 基本含义

> 针对集合中的每个文件，执行特定的命令。

    FOR %variable IN (set) DO command [command-parameters]

1.  `%variable`，声明变量。variable为变量名，合法的变量名为单个英文字母，区分大小写。因此，最多同时可以定义52个不同的变量。
2.  `命令行`中的写法，指定变量使用`%variable`。`批处理文件`（a.bat）中的写法，指定变量使用`%%variable`。

        rem 命令行的写法
        for %i in (*) do @echo %i

        rem 批处理文件中的写法
        for %%i in (*) do @echo %%i

3.  `(set)`，定义一个集合。变量%variable每次循环时，取集合内的一个值。集合可以使用`通配符`。也可以是`空白符或逗号分隔的字符串`，如果字符串含有空白符或逗号，使用`双引号`括住。

        # for %i in (1 3.4,7+9) do @echo %i
        > 1
        > 3.4
        > 7+9

4.  command [command-parameters]，特定命令及命令行参数。



### 8.2 扩展含义

> 如果命令行扩展启用，以下命令有效。


#### 8.2.1 D（irectory）扩展

    FOR /D %variable IN (set) DO command [command-parameters]

设定`/D开关`，指定与目录匹配，也即循环过程中，%variable变量取集合中的目录名。通配符表示当前目录的所有一级子目录。

#### 8.2.2 R（ecursive）扩展

    FOR /R [[drive:]path] %variable IN (set) DO command [command-parameters]

`/R开关`，设定递归根路径。若设定当前根路径，使用点号(.)或者不设置根路径参数。含义为递归所有目录及其子目录下的文件集合，执行command命令。

    for /R . %j in (a,b) do echo %j

针对当前目录及其所有子目录下的a和b文件，执行command命令。

#### 8.2.3 L扩展

    FOR /L %variable IN (start,step,end) DO command [command-parameters]

`数字序列扩展`。按增量形式生成以start为初始值，end为结束值，步长为step的数字序列，并以该数字序列为集合。

    (1,1,6) (1,2,3,4,5,6)
    (1,2,6) (1,3,5)


#### 8.2.4 F扩展

`最强大`的扩展。支持以下格式：

    FOR /F ["options"] %variable IN (file-set) DO command [command-parameters]
    FOR /F ["options"] %variable IN ("string") DO command [command-parameters]
    FOR /F ["options"] %variable IN ('command') DO command [command-parameters]

1.  `(file-set)方式`：变量赋值来自解析文件内容。针对集合中的每个文件，打开并解析该文件，
    按某种解析方式给变量赋值，再运行后面的循环体。可以使用通配符，*表示当前目录下所有文件。
2.  `("string")方式`：变量赋值来自字符串的解析。
3.  `('command')方式`（单引号方式，而不是back-tick）：变量赋值来自命令输出的解析。
4.  `"options"`，提供/F扩展的`文本行解析方式`。选项使用双引号包围，选项内部的子选项使用空格分隔。

    包含以下子选项：

    * `eol=c`   指定行注释符，解析时会略过以字符c开头的行
    * `skip=n`  配置解析时，跳过文件起始的n行
    * `delims=xxx`  指定分隔符集，支持多个字符组成的字符串作为分隔符
    * `tokens=x,y,m-n`  指定：

        * 第x个子串对应第一个变量
        * 第y个子串对应第二个变量
        * 第m个子串对应第n个变量

        最后一个字符还可以是`星号(*)`，含义是星号之前的变量解析完以后，`行内剩余部分`（不管
        是否包含delimis）都将作为最后一个变量的值。

    * `usebackq`，开关项，使用该值

        1.  对于command：本来使用单引号包含的命令，可以使用backtick。这时，单引号作为普通字符处理
        2.  对于fileset：文件名可以使用双引号包围，保证含有空格的文件名也能被识别
        3.  对于string： string内部的文本被解析为`文件名`而不是按分隔符分隔的`字符串`。


以下例子可能用到的文本文件，`musics.txt`，其内容如下：
 
另外一个文件名为`musics 1.txt`的文件，其内容同musics.txt，只是文件名含有空格。

还有一个`files.txt`文件，其内容如下：

    musics.txt
    musics 1.txt



`例子1：解析特定字符串`

获取邮箱字符串的username和hostname名称。

    # for /f "delims=@ tokens=1,2" %i in ("hdm0571@163.com") do @echo username: %i && echo hostname: %j
    > username: hdm0571
    > hostname: 163.com



`例子2：解析命令输出`

todo：细化

    for /f %i in ('dir') do echo %i

或者

    for /f "usebackq" %i in (`dir`) do echo %i




`例子3：for命令的嵌套`

由files.txt文件每行包含了一个文本文件名，需要对这些文本文件的每一行都进行处理，并且输出第一个字段。

    for /f "tokens=*" %f in (files.txt) do (for /f "usebackq tokens=1,2" %i in ("%f") do echo %i %j)

1. 先解析files.txt文件，再以每行文本作为文件名(注意`usebackq选项`)，解析新的文本文件，
    并输出第一个字段。涉及双重循环，bat的for语句是支持这种嵌套的。
2. 为了确保含有空格的文件名也能被正确处理，内部for循环使用了`usebackq子选项`，并用双引号将文件名包含起来。





`例子4：按行读取文件内容，忽略空行`

读取musics 1.txt文件的每一行（忽略空行），并输出：

    D:\Personal\WinShell> for /f "usebackq tokens=*" %i in ("musics 1.txt") do @echo %i

    # MP3列表
    ## 英文歌
    "the mass.mp3","http://blogfile.chinaunix.net/music2/39746_070526041657.mp3"
    "it's my life.mp3","http://www.xseries.cz/kubajs/bonjovi.mp3"
    "the dawn.mp3","http://www.melodic-metal.com/mass/Dreamtale_01-intro.mp3"
    ## 中文歌
    "即使知道要见面 — sara","http://www.sdmm.org.cn/mp3/Sara.mp3"

1.  忽略空行，不能简单使用more等命令，但可以使用`/f扩展的忽略空行特性`
2.  文件名含有空格，需要使用`usebackq子选项`
3.  整行读取，忽略默认或指定的delims，可以使用`星号（*）`子选项


`例子5：按行解析文件内容`

musics.txt文件每行包含两个字符串（歌名和URL），行内字符串使用逗号分隔；
以”#”开头的行作为注释，不需要解析。现在需要按以下格式输出：
 
1.  需要略过一些特定格式的行，可以使用`eol=c子选项`，指明”#”开头的行不需解析
2.  序号打印是一个问题，无法在/f扩展里直接使用，不过这里可以使用`启用延迟扩展的环境变量`。
3.  文件行解析可以使用for语句的/f扩展，以`逗号为分隔符`。

可以编写以下命令并保存成list.bat文件，注意在.bat文件中，变量的引用以`”%%”`开头：

    set M=1
    for /f "eol=# delims=, tokens=1,2,*" %%i in (musics.txt) do echo !M! && echo name: %%i && echo URL: %%j %%k && set /a M=!M!+1

运行时，需要启用环境变量延迟扩展。如下调用：

    cmd /v:on /c "for.bat"

或者在代码中添加以下命令：

    setlocal enabledelayedexpansion





`例子6：MP3文件下载`

详见D:\Personal\iPhone3GS\Musics\bin目录下的两个批处理文件：

    get_all.bat
    get_musics.bat

双击get_all.bat文件，可以进行MP3文件下载。
D:\Personal\iPhone3GS\Musics\bin\conf目录下的list.txt是MP3下载文件列表。


1.  使用了for循环嵌套
2.  使用了环境变量延时加载




`例子7：局域网网速监测`

查看Samples\network_ratio_detect\network_ratio_detect.bat文件，用于监测网络速度是否低于某个阈值，并给出报警。


`例子8：批量生成diff文件`

    svn st > review.lst
    vim review.lst
    for /f %i in ('type review.lst') do ( svn diff %i >> m.diff )




#### 8.2.5 for变量扩展

如果命令扩展被启用，以下变量替换可用：

<table>
<tr><th> 扩展 </th><th>含义</th></tr>
<tr><td> `%~I`  </td><td>删除任何引号(")，扩展 %I</td></tr>
<tr><td> %~fI </td><td>将 %I 扩展到一个完全合格的路径名</td></tr>
<tr><td> %~dI </td><td>仅将 %I 扩展到一个驱动器号</td></tr>
<tr><td> %~pI </td><td>仅将 %I 扩展到一个路径</td></tr>
<tr><td> %~nI </td><td>仅将 %I 扩展到一个文件名</td></tr>
<tr><td> %~xI </td><td>仅将 %I 扩展到一个文件扩展名</td></tr>
<tr><td> %~sI </td><td>扩展的路径只含有短名</td></tr>
<tr><td> %~aI </td><td>将 %I 扩展到文件的文件属性</td></tr>
<tr><td> %~tI </td><td>将 %I 扩展到文件的日期/时间</td></tr>
<tr><td> %~zI </td><td>将 %I 扩展到文件的大小</td></tr>
<tr><td> %~$PATH:I </td><td>查找列在路径环境变量的目录，并将 %I 扩展到找到的第一个完全合格的名称。如果环境变量名未被定义，或者没有找到文件，此组合键会扩展到空字符串</td></tr>
</table>


> 以上命令扩展可以组合使用，比如`%~fI`等价于`%~dpnxI`，还有其他的扩展，如下：

<table>
<tr><th>扩展格式</th><th>    含义</th></tr>
<tr><td>%~dpI</td><td>   仅将 %I 扩展到一个驱动器号和路径</td></tr>
<tr><td>%~nxI</td><td>   仅将 %I 扩展到一个文件名和扩展名</td></tr>
<tr><td>%~dp$PATH:I</td><td> 搜索列在路径环境变量的目录，并将 %I 扩展到找到的第一个驱动器号和路径。</td></tr>
<tr><td>%~ftzaI</td><td> 将 %I 扩展到类似输出线路的 DIR</td></tr>
</table>




### 8.3 for循环的退出

for语句支持嵌套，但是循环退出会存在一些问题。比如以下语句：

    for /l %%i in (1,1,3) do ( 
        for /l %%j in (10,2,16) do (
            if %%j==10 (
                echo %%i-%%j 
            ) else (
                echo "i want to exit inner loop"
                rem goto :eof
            )
        )
    )


语句的期望是内层循环需要在else子句部分退出循环，继续外层循环，这时会遇到麻烦。

1.  使用`goto`，只能全部退出。（个人理解：标签标识一个新的子例程，goto语句执行
    是需要退出当前例程，也即当前的嵌套循环语句）。
2.  `没有`类似其他语言的`break或continue`等循环控制机制
3.  你会说，这里用的是`:eof扩展`，意即跳至文件末尾，当然是跳出整个循环了。
    实际上在此处没啥差别。你不能在外层for循环体的底部定义一个label，然后跳至该处，
    因为这种写法是非法的，label必须单起一行用冒号打头，且不在任何语句体内部。既然这样，
    标签要么定义在for语句前，要么在后，显然在前面定义一个label，会构成死循环，
    所以只能是在后面定义一个label，这和:eof是等价的。
4.  `解决方法`通常是使用`子例程替换嵌套for循环`，子例程的for循环为单层。如下：

        for /l %%i in (2,1,4) do ( 
            call:abc %%i
        )

        rem 结束程序
        goto :eof

        rem 子例程定义
        :abc

        for /l %%j in (10,2,16) do (
            if %%j==10 (
                rem 子例程参数使用单个%标识，而不是两个%
                echo %1-%%j 
            ) else (
                echo "i want to exit inner loop"
                goto :eof
            )
        )

    注意，.bat文件中`子例程对调用参数`的引用不同于其他变量，使用的是`单个%`，而不是两个%。
    关于call命令的说明，参考本文对应章节。

`例子，显示目录中扩展名为.png的所有系统文件名：`

    for /f "tokens=3 delims=\t" %i in ('dir /s') do @(if "%~xi" == ".png" echo %~xi)







## 9. call命令

> 允许一个批处理程序调用另一个批处理程序。

    CALL [drive:][path]filename [batch-parameters]

> 命令扩展启用以后，可以在同一个批处理程序中调用子例程：

    call:label arguments


### 9.1 批处理参数

#### 9.1.1 批处理程序获取命令行参数

.bat文件获取命令行参数，使用`%0%, %1%, ...`

包括两种方式的调用：一是直接调用.bat文件；二是使用call命令调用。

    rem 直接调用.bat文件
    #a.bat arg1 arg2
    
    rem 使用call命令
    #call a.bat arg1 arg2

#### 9.1.2 标签子例程获取命令行参数

被调用的标签子例程，其下文由call语句传递的arguments决定，引用参数使用`%0, %1, ...`，
分别对应当前批处理程序名称（或子例程标签）和传递的参数。

`%*代表参数串`，%1,%2,...

    #call :build arg1 arg2

`与其他local变量不同的是`，即使在.bat文件中，对批处理参数的引用还是使用单个%，而不是两个%。

> 实际上，到目前为止，你会发现，批处理程序（包括.bat和子例程）接收外传参数时，可以使用%1, %2, ...，也可以使用%1%, %2%, ...


### 9.2 批处理参数扩展

同for循环的参数扩展。不同之处在于使用%还是%%。

### 9.3 两次exit问题

todo





## 10 dir命令

> 显示目录中的文件和子目录的信息。

命令语法：

DIR [drive:][path][filename] [/A[[:]attributes]] [/B] [/C] [/D] [/L] [/N]  [/O[[:]sortorder]] [/P] [/Q] [/R] [/S] [/T[[:]timefield]] [/W] [/X] [/4]

1.  不带任何参数，只输dir，默认情况下该命令会列出当前目录(.)下的所有文件和子目录的信息，包括文件时间、大小、名称等信息。还有一些标题和其他统计信息。
2.  /c参数，指示显示文件size的时候，用千分位的逗号，若不用千分位的逗号，使用/-c参数。

        C:\Windows\System32>dir /c sound.drv
         驱动器 C 中的卷是 System
         卷的序列号是 E2E5-42E5

         C:\Windows\System32 的目录

        2009/07/14  05:41             1,744 sound.drv
                       1 个文件          1,744 字节
                       0 个目录  3,988,815,872 可用字节

3.  /4，用4位数显示年份。
4.  /a[[:]attributes]，显示特定属性的文件或目录。d为目录，r为只读文件，h为隐藏文件，a为准备存档的文件，s为系统文件，i为无内容索引文件，l为解析点（？）

        rem 列出目录
        dir /a:d
        或
        dir /ad


## 11. del命令

`文件（不包含目录）`删除命令，同erase。

    DEL [/P] [/F] [/S] [/Q] [/A[[:]attributes]] names
    ERASE [/P] [/F] [/S] [/Q] [/A[[:]attributes]] names

强制删除只读文件。

    del /f


## 12. findstr命令

先恶作剧一下，进入到c:\windows\system32目录，输入以下命令：

    $ findstr a *

嘀嘀声还不错吧，哈哈。千万别在这么大的目录下做这种事情，findstr会循环打开各种文件（包括二进制文件），

而且a这种字符太常见了，这时，很有可能你的cmd变成未响应状态，而且还kill不掉。

当然只是命令行不响应，其他程序仍然正常使用，也可以新开一个命令行。如果等不了，可以重启电脑。

进入正题，findstr用于从文件中查找指定字符串，有以下格式：

    FINDSTR [/B] [/E] [/L] [/R] [/S] [/I] [/X] [/V] [/N] [/M] [/O] [/P] [/F:file] [/C:string] [/G:file] [/D:dir list] [/A:color attributes] [/OFF[LINE]] strings [[drive:][path]filename[ ...]]

1.  查找文件中以四个数字开头的行。

        $ findstr /n "^[0-9][0-9][0-9][0-9]" *

    * 正则表达式需用`双引号括起来`，否则行首限定符`"^"`不起作用；
    * 行首开始查找，还可以使用`/b开关`

2. todo


## 13. setlocal

todo

    setlocal enabledelayedexpansion



## 14. type命令

    $ type file_name

将file_name文件的内容输出到标准输出，类似于Linux下的cat命令。





## 15. shell字符串处理

一些特殊字符：

1.  第一类：`^, |, &, &&, ||`，如果放在引号外，需要用`^`转义；否则不需要转义
2.  第二类：`%, "`，在引号内，需要进行转义。转义方式为`%%, ""`。
    
    
    
    
    

## 16. 编程建议

1.  参数传递时，如果参数内部含有空白符，记得添加引号，避免解析失败
2.  todo





## 17. 如何编写子例程

### 17.1 子例程结构

`goto :eof`的使用
todo

### 17.2 参数传递

如果传递的`参数内部含有双引号`，会导致脚本解析器出错。这种情况下，要么手动去掉双引号，要么使用变量的扩展特性。

* 环境变量可以使用子串替换扩展
* 普通变量可以使用`%~I`扩展

举例如下：

    set LogInfo="%WGET%" --referer="%~3" -o %WGET_LOG_FILE% -O "..\%~1" "%~2"

    rem 使用环境变量替换扩展，将双引号替换成单引号，再作为参数传递
    call:log "!LogInfo:"='!" 2 1



## 18. 如何输出空行

echo后面紧跟一个ASCII实心点号。

`
echo.
`

## 19. 关于mshta

todo

    $ mshta javascript:alert(1)

    $ mshta javascript:encodeURIComponent('百度')

    $ mshta javascript:"<input type='text' value='笃行天下'>"

    $ mshta javascript:alert(0xa0fe-0x8140)


# 20. 右键菜单添加命令行通道

1. 新建一个`.reg`文件，内容如下：

        Windows Registry Editor Version 5.00

        [HKEY_CLASSES_ROOT\folder\shell\cmd]
        @="DOS Prompt"

        [HKEY_CLASSES_ROOT\folder\shell\cmd\command]
        @="cmd.exe /k cd %1" 

2. 保存，双击运行即可。

以上动作会在资源管理器文件夹的右键菜单新建一个子菜单项，点击以后打开命令行，并以当前文件夹为工作目录。
在Windows XP和Windows 7测试通过。

另外，Windows 7下本身提供类似功能，只需`按住shift键再右键点击`，可以调出命令行功能。所以Windows 7不需要人为添加了。

## 21. 建议

1.  命令不区分大小写，包括命令名、变量名、开关选项名。
2.  好习惯：字符串都用双引号包围。


