# gdb

> The GNU Project Debugger

## Resources

* site: <http://www.gnu.org/software/gdb/>
* docs: 
    1. debug with gdb <ref://./docs/gdb/index.html>
    2. gdb annotate <ref://./docs/gdb-annotate/index.html>
* 推荐书籍：`Using GDB: A Guide to the GNU Source-Level Debugger`, by Richard M. Stallman and Roland H. Pesch.



## Features

* 允许你在其它程序运行时，查看其内部发生了什么；或者查看程序奔溃时，其做了什么
* 主要能做四种事情：
    1. 启动程序，设置任何可能影响其行为的参数
    2. 使程序在特定条件下暂停运行
    3. 当程序暂停运行使，查看发生了什么 
    4. 改变程序，调试bug
* GDB支持的`平台`：UNIX/Windows/Mac OS X
* GDB支持的`语言`：Ada, Assembly, C, C++, D, Fortran, Go, Objective-C, OpenCL, Modula-2, Pascal, Rust


## Tips

* gdb命令行格式：

        gdb [options] [executable-file [core-file or process-id]]
        gdb [options] --args executable-file [inferior-arguments ...]

* 在调试程序时，可以指定`core文件`或者`进程id`
* 若要给可执行程序同时提供运行参数列表，需要使用`--args`选项。也可以进入gdb交互命令模式后，使用`run [arguments]`来运行程序。



## Installation

### homebrew

> macos mojave下总出现`During startup program terminated with signal ?, Unknown signal.`问题，暂无法解决

    $ brew install gdb


### 源码编译安装

* 获取最新代码：<ftp://sourceware.org/pub/gdb/snapshots/current/gdb-weekly-8.2.50.20190212.tar.xz>，也可以从以下获取：

        git clone git://sourceware.org/git/binutils-gdb.git

* 源码安装：

        ./configure
        make
        make install



## Mac平台问题

* [ 171112 ] MAC上使用gdb(完美解决) <https://blog.csdn.net/github_33873969/article/details/78511733>
* mac上使用`brew`安装gdb，会有以下提示：

        gdb requires special privileges to access Mach ports.
        You will need to codesign the binary. For instructions, see:

          https://sourceware.org/gdb/wiki/BuildingOnDarwin

        On 10.12 (Sierra) or later with SIP, you need to run this:

          echo "set startup-with-shell off" >> ~/.gdbinit

    需要对gdb程序进行`代码签名`，具体参考：<https://sourceware.org/gdb/wiki/BuildingOnDarwin> 及 <https://sourceware.org/gdb/wiki/PermissionsDarwin>

* 未进行gdb程序代码签名前，执行gbd程序进行其他程序调试，会有以下提示：

        Starting program: /Users/hudamin/projects/git/markdown-slides/src/markdown.out ../test/api.md
        Unable to find Mach task port for process-id 33994: (os/kern) failure (0x5).
         (please check gdb is codesigned - see taskgated(8))



## Versions

* 8.1


## Usage

    This is the GNU debugger.  Usage:

        gdb [options] [executable-file [core-file or process-id]]
        gdb [options] --args executable-file [inferior-arguments ...]

    Selection of debuggee and its files:

      --args             Arguments after executable-file are passed to inferior
      --core=COREFILE    Analyze the core dump COREFILE.
      --exec=EXECFILE    Use EXECFILE as the executable.
      --pid=PID          Attach to running process PID.
      --directory=DIR    Search for source files in DIR.
      --se=FILE          Use FILE as symbol file and executable file.
      --symbols=SYMFILE  Read symbols from SYMFILE.
      --readnow          Fully read symbol files on first access.
      --readnever        Do not read symbol files.
      --write            Set writing into executable and core files.

    Initial commands and command files:

      --command=FILE, -x Execute GDB commands from FILE.
      --init-command=FILE, -ix
                         Like -x but execute commands before loading inferior.
      --eval-command=COMMAND, -ex
                         Execute a single GDB command.
                         May be used multiple times and in conjunction
                         with --command.
      --init-eval-command=COMMAND, -iex
                         Like -ex but before loading inferior.
      --nh               Do not read ~/.gdbinit.
      --nx               Do not read any .gdbinit files in any directory.

    Output and user interface control:

      --fullname         Output information used by emacs-GDB interface.
      --interpreter=INTERP
                         Select a specific interpreter / user interface
      --tty=TTY          Use TTY for input/output by the program being debugged.
      -w                 Use the GUI interface.
      --nw               Do not use the GUI interface.
      --tui              Use a terminal user interface.
      --dbx              DBX compatibility mode.
      -q, --quiet, --silent
                         Do not print version number on startup.

    Operating modes:

      --batch            Exit after processing options.
      --batch-silent     Like --batch, but suppress all gdb stdout output.
      --return-child-result
                         GDB exit code will be the child's exit code.
      --configuration    Print details about GDB configuration and then exit.
      --help             Print this message and then exit.
      --version          Print version information and then exit.

    Remote debugging options:

      -b BAUDRATE        Set serial port baud rate used for remote debugging.
      -l TIMEOUT         Set timeout in seconds for remote debugging.

    Other options:

      --cd=DIR           Change current directory to DIR.
      --data-directory=DIR, -D
                         Set GDB's data-directory to DIR.

    At startup, GDB reads the following init files and executes their commands:

    For more information, type "help" from within GDB, or consult the
    GDB manual (available as on-line info or a printed manual).
    Report bugs to "<http://www.gnu.org/software/gdb/bugs/>".


## Commands

    break [file:]function
        Set a breakpoint at function (in file).
 
    run [arglist]
        Start your program (with arglist, if specified).
 
    bt  Backtrace: display the program stack.
 
    print expr
        Display the value of an expression.
 
    c   Continue running your program (after stopping, e.g. at a breakpoint).
 
    next
        Execute next program line (after stopping); step over any function calls in the line.
 
    edit [file:]function
        look at the program line where it is presently stopped.
 
    list [file:]function
        type the text of the program in the vicinity of where it is presently stopped.
 
    step
        Execute next program line (after stopping); step into any function calls in the line.
 
    help [name]
        Show information about GDB command name, or general information about using GDB.
 
    quit
        Exit from GDB.








