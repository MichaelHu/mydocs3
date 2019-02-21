# GNU make

## Tips

* Archive文件：linux的`*.a`对应windows的`*.lib`
* 中间目标文件：linux的`*.o`对应windows的`*.obj`
* `make`执行时需要`Makefile`文件
* windows提供类似工具`nmake`。`Cygwin`可以执行标准unix的Makefile

## Makefile

> Makefile(s) are text files written in a certain prescribed syntax.  Together with Make Utility, it helps build a software from its source files, a way to organize code, and its compilation and linking.

大部分情况下，Makefile作用就是告诉`make`如何`编译和链接`一个程序。

### Resources

* `reference: `<https://www.gnu.org/software/make/manual/make.html#Introduction>


### Syntax

> 规则格式

    target: prerequisites ... 
    [tab] recipe
    ...


### Tips

* makefile文件由一到多条规则组成，每条规则如上格式
* `target`通常是一个目标文件名，可以是Object File，也可以是可执行文件。还可以是一个标签（Label）
* `prerequisites`为生成那个target所`依赖`的文件或目标
* `prerequisites`可能为空
* `recipe`为make需要执行的命令，可以是任意shell命令
* recipe的前置符号默认为`制表符`，也可以通过设置特殊变量`.RECIPEPREFIX`来自定义
* `prerequisites`中如果有一个及以上的文件比target文件要新的话，command所定义的命令就会被执行
* 太长的行，可以通过在行`末尾添加反斜线`，达到换行效果
* 注释使用`#`，如果要使用字符`#`，可用`\#`转义
* 支持`变量定义及引用`

        # 变量定义
        objects = main.o kbd.o command.o display.o \
                insert.o search.o files.o utils.o

        # 变量引用
        edit: $(objects)

* 变量引用与shell的变量`命令替换`类似，不要搞混
* 第一个target是`默认目标`，所以clean不要放在第一个target位置
* 文件名，可以是`Makefile`（推荐），也可以是`makefile`。还可以是`GNUmakefile`（GMUMake专用）
* `复合下标规则`，比如`.c.o`
        .c.o:
            $(CC) -c $(CFLAGS) $(CPPFLAGS) -o $@ $<


### 特殊变量

    .RECIPEPREFIX


### 自动变量

> <https://www.gnu.org/software/make/manual/make.html#Automatic-Variables>

    格式    说明
    ============================================================================================
    $@      target文件名
    $%      todo，例如target为foo.a(bar.o)，那么$%为bar.o，$@为foo.a
    $<      第一个依赖
    $?      所有新于target的依赖组成的列表，用空格分隔
    $^      所有target的依赖组成的列表，用空格分隔，列表中的依赖会进行去重
    $+      所有target的依赖组成的列表，用空格分隔，列表中的依赖不进行去重，这在link中有用
    $|      todo: order-only
    $*      todo: target为dir/a.foo.b，target pattern为a.%.b，那么$*为dir/foo


    ===========================================================================================
    '$(@D)'     target名称的目录部分
    '$(@F)'     target名称的文件部分
    ...




### 隐式规则

    





### examples 1

Makefile:

    edit : main.o kbd.o command.o display.o 
        cc -o edit main.o kbd.o command.o display.o
     
    main.o : main.c defs.h
        cc -c main.c
    kbd.o : kbd.c defs.h command.h
        cc -c kbd.c
    command.o : command.c defs.h command.h
        cc -c command.c
    display.o : display.c defs.h
        cc -c display.c
     
    clean :
         rm edit main.o kbd.o command.o display.o


编译并链接，生成可执行文件`edit`，命令行中输入：

    $ make

删除可执行文件以及中间目标文件，命令行中输入：

    $ make clean






### examples 2

长行使用`反斜线`作为行分隔符。

Makefile: 

    edit : main.o kbd.o command.o display.o \
        insert.o search.o files.o utils.o
        cc -o edit main.o kbd.o command.o display.o \
            insert.o search.o files.o utils.o

    main.o : main.c defs.h
        cc -c main.c
    kbd.o : kbd.c defs.h command.h
        cc -c kbd.c
    command.o : command.c defs.h command.h
        cc -c command.c
    display.o : display.c defs.h buffer.h
        cc -c display.c
    insert.o : insert.c defs.h buffer.h
        cc -c insert.c
    search.o : search.c defs.h buffer.h
        cc -c search.c
    files.o : files.c defs.h buffer.h command.h
        cc -c files.c
    utils.o : utils.c defs.h
        cc -c utils.c

    clean :
        rm edit main.o kbd.o command.o display.o \
           insert.o search.o files.o utils.o




### example 3

变量使用，可以使Makefile变得更简单。

定义变量：

    objects = ...
    
使用变量：

    $(objects)

Makefile: 

    objects = main.o kbd.o command.o display.o \
              insert.o search.o files.o utils.o

    edit : $(objects)
            cc -o edit $(objects)
    main.o : main.c defs.h
            cc -c main.c
    kbd.o : kbd.c defs.h command.h
            cc -c kbd.c
    command.o : command.c defs.h command.h
            cc -c command.c
    display.o : display.c defs.h buffer.h
            cc -c display.c
    insert.o : insert.c defs.h buffer.h
            cc -c insert.c
    search.o : search.c defs.h buffer.h
            cc -c search.c
    files.o : files.c defs.h buffer.h command.h
            cc -c files.c
    utils.o : utils.c defs.h
            cc -c utils.c
    clean :
            rm edit $(objects)




### example 4

在dependencies中省略`.c`文件

Makefile: 

    objects = main.o kbd.o command.o display.o \
              insert.o search.o files.o utils.o

    edit : $(objects)
            cc -o edit $(objects)
    main.o : defs.h
    kbd.o : defs.h command.h
    command.o : defs.h command.h
    display.o : defs.h buffer.h
    insert.o : defs.h buffer.h
    search.o : defs.h buffer.h
    files.o : defs.h buffer.h command.h
    utils.o : defs.h

    clean :
            rm edit $(objects)





### example 5

以dependencies分组，将相同dependencies的target合并。稍显别扭。

Makefile: 

    objects = main.o kbd.o command.o display.o \
              insert.o search.o files.o utils.o

    edit : $(objects)
            cc -o edit $(objects)

    $(objects) : defs.h
    kbd.o command.o files.o : command.h
    display.o insert.o search.o files.o : buffer.h

    clean :
            rm edit $(objects)

