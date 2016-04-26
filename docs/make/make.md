# GNU make


* Archive文件：linux的.a对应windows的.lib
* 中间目标文件：linux的.o对应windows的.obj

`make`执行时需要`Makefile`文件

windows提供类似工具`nmake`。`Cygwin`可以执行标准unix的Makefile


## Makefile

> Makefile(s) are text files written in a certain prescribed syntax. 
> Together with Make Utility, it helps build a software from its source files, 
> a way to organize code, and its compilation and linking.

大部分情况下，Makefile作用就是告诉`make`如何`编译和链接`一个程序。

    target: dependencies 
    [tab] system command(s)
    ...

* target是一个目标文件，可以是Object File，也可以是可执行文件。还可以是一个标签（Label）。
* dependencies为生成那个target所需要的文件或目标。
* command为make需要执行的命令，可以是任意shell命令。

dependencies中如果有一个及以上的文件比target文件要新的话，command所定义的命令就会被执行。

`reference: `<https://www.gnu.org/software/make/manual/make.html#Introduction>

1. 第一个target是默认目标，所以clean不要放在第一个target位置
2. 文件名，可以是`Makefile`（推荐），也可以是`makefile`。还可以是`GNUmakefile`（GMUMake专用）
3. 注释，以`#`开头


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

