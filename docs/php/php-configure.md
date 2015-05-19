# PHP configure and install

> PHP编译安装选项说明


## 安装步骤

遵循通常的源码安装方式，本次以`php-5.5.24`为例：

    $ cd php-5.5.24
    $ ./configure --help
    $ ./configure [OPTION]... [VAR=VALUE]...
    $ make
    $ make install



## 安装选项说明

> `configure` configures this package to adapt to many kinds of systems.

通过`configure`能适配编译选项和平台。每次手动源码安装PHP的时候，经常会遇到依赖库不存在的问题，当然可以选择
包管理工具，比如mac的Homebrew，通常Linux系统上的yum。但是如果想对安装原理有一个比较全面认识的话，自己手动进行
编译安装，逐步解决缺失包，最终成功编译，会有更大的收获。


    $ ./configure [OPTION]... [VAR=VALUE]...

以上是configure的命令行语法。

### 1. 环境变量

设置环境变量，比如`CC, CFLAGS, ...`等，使用`VAR=VALUE`，以下是可配置的环境变量：

    CC          C compiler command
    CFLAGS      C compiler flags
    LDFLAGS     linker flags, e.g. -L<lib dir> if you have libraries in a
                nonstandard directory <lib dir>
    LIBS        libraries to pass to the linker, e.g. -l<library>
    CPPFLAGS    (Objective) C/C++ preprocessor flags, e.g. -I<include dir> if
                you have headers in a nonstandard directory <include dir>
    CPP         C preprocessor
    YACC        The `Yet Another Compiler Compiler' implementation to use.
                Defaults to the first program found out of: `bison -y', `byacc',
                `yacc'.
    YFLAGS      The list of arguments that will be passed by default to $YACC.
                This script will default YFLAGS to the empty string to avoid a
                default value of `-d' given by some make applications.
    CXX         C++ compiler command
    CXXFLAGS    C++ compiler flags
    CXXCPP      C++ preprocessor





> 提示：选项默认值在`[]`中给出






### 2. configure选项

    -h, --help              display this help and exit
        --help=short        display options specific to this package
        --help=recursive    display the short help of all the included packages
    -V, --version           display version information and exit
    -q, --quiet, --silent   do not print `checking ...' messages
        --cache-file=FILE   cache test results in FILE [disabled]
    -C, --config-cache      alias for `--cache-file=config.cache'
    -n, --no-create         do not create output files
        --srcdir=DIR        find the sources in DIR [configure dir or `..']





### 3. 安装目录

相关选项可以配置架构独立文件和架构依赖文件的安装目录。不做任何配置情况下文件会安装在`/usr/local`：

    /usr/local/bin
    /usr/local/lib

等目录，这时需要有root权限。如果没有root权限，可手动指定到当前用户目录下，进行无影响安装。

相关选项如下：

    --prefix=PREFIX         install architecture-independent files in PREFIX
                            [/usr/local]
    --exec-prefix=EPREFIX   install architecture-dependent files in EPREFIX
                            [PREFIX]

还可以使用以下选项，进行安装目录的精细控制：

    --bindir=DIR            user executables [EPREFIX/bin]
    --sbindir=DIR           system admin executables [EPREFIX/sbin]
    --libexecdir=DIR        program executables [EPREFIX/libexec]
    --sysconfdir=DIR        read-only single-machine data [PREFIX/etc]
    --sharedstatedir=DIR    modifiable architecture-independent data [PREFIX/com]
    --localstatedir=DIR     modifiable single-machine data [PREFIX/var]
    --libdir=DIR            object code libraries [EPREFIX/lib]
    --includedir=DIR        C header files [PREFIX/include]
    --oldincludedir=DIR     C header files for non-gcc [/usr/include]
    --datarootdir=DIR       read-only arch.-independent data root [PREFIX/share]
    --datadir=DIR           read-only architecture-independent data [DATAROOTDIR]
    --infodir=DIR           info documentation [DATAROOTDIR/info]
    --localedir=DIR         locale-dependent data [DATAROOTDIR/locale]
    --mandir=DIR            man documentation [DATAROOTDIR/man]
    --docdir=DIR            documentation root [DATAROOTDIR/doc/PACKAGE]
    --htmldir=DIR           html documentation [DOCDIR]
    --dvidir=DIR            dvi documentation [DOCDIR]
    --pdfdir=DIR            pdf documentation [DOCDIR]
    --psdir=DIR             ps documentation [DOCDIR]




### 4. 系统类型

交叉编译，编译标的配置。普通用户应该用不上。

    --build=BUILD     configure for building on BUILD [guessed]
    --host=HOST       cross-compile to build programs to run on HOST [BUILD]
    --target=TARGET   configure for building compilers for TARGET [HOST]






### 5. 可选特性和包

    --disable-option-checking  ignore unrecognized --enable/--with options
    --disable-FEATURE       do not include FEATURE (same as --enable-FEATURE=no)
    --enable-FEATURE[=ARG]  include FEATURE [ARG=yes]
    --with-PACKAGE[=ARG]    use PACKAGE [ARG=yes]
    --without-PACKAGE       do not use PACKAGE (same as --with-PACKAGE=no)
    --with-libdir=NAME      Look for libraries in .../NAME rather than .../lib
    --disable-rpath         Disable passing additional runtime library
                            search paths
    --enable-re2c-cgoto     Enable -g flag to re2c to use computed goto gcc extension




### 6. SAPI模块


    --with-aolserver=DIR    Specify path to the installed AOLserver
    --with-apxs=FILE        Build shared Apache 1.x module. FILE is the optional
                            pathname to the Apache apxs tool apxs
    --with-apache=DIR       Build Apache 1.x module. DIR is the top-level Apache
                            build directory /usr/local/apache
    --enable-mod-charset    APACHE: Enable transfer tables for mod_charset (Rus Apache)
    --with-apxs2filter=FILE
                            EXPERIMENTAL: Build shared Apache 2.0 Filter module. FILE is the optional
                            pathname to the Apache apxs tool apxs
    --with-apxs2=FILE       Build shared Apache 2.0 Handler module. FILE is the optional
                            pathname to the Apache apxs tool apxs
    --with-apache-hooks=FILE
                            EXPERIMENTAL: Build shared Apache 1.x module. FILE is the optional
                            pathname to the Apache apxs tool apxs
    --with-apache-hooks-static=DIR
                            EXPERIMENTAL: Build Apache 1.x module. DIR is the top-level Apache
                            build directory /usr/local/apache
    --enable-mod-charset    APACHE (hooks): Enable transfer tables for mod_charset (Rus Apache)
    --with-caudium=DIR      Build PHP as a Pike module for use with Caudium.
                            DIR is the Caudium server dir /usr/local/caudium/server
    --disable-cli           Disable building CLI version of PHP
                            (this forces --without-pear)
    --with-continuity=DIR   Build PHP as Continuity Server module.
                            DIR is path to the installed Continuity Server root
    --enable-embed=TYPE     EXPERIMENTAL: Enable building of embedded SAPI library
                            TYPE is either 'shared' or 'static'. TYPE=shared
    --enable-fpm            Enable building of the fpm SAPI executable
    --with-fpm-user=USER    Set the user for php-fpm to run as. (default: nobody)
    --with-fpm-group=GRP    Set the group for php-fpm to run as. For a system user, this
                            should usually be set to match the fpm username (default: nobody)
    --with-fpm-systemd      Activate systemd integration
    --with-isapi=DIR        Build PHP as an ISAPI module for use with Zeus
    --with-litespeed        Build PHP as litespeed module
    --with-milter=DIR       Build PHP as Milter application
    --with-nsapi=DIR        Build PHP as NSAPI module for Netscape/iPlanet/Sun Webserver
    --with-phttpd=DIR       Build PHP as phttpd module
    --with-pi3web=DIR       Build PHP as Pi3Web module
    --with-roxen=DIR        Build PHP as a Pike module. DIR is the base Roxen
                            directory, normally /usr/local/roxen/server
    --enable-roxen-zts      ROXEN: Build the Roxen module using Zend Thread Safety
    --with-thttpd=SRCDIR    Build PHP as thttpd module
    --with-tux=MODULEDIR    Build PHP as a TUX module (Linux only)
    --with-webjames=SRCDIR  Build PHP as a WebJames module (RISC OS only)
    --disable-cgi           Disable building CGI version of PHP




### 7. 通用配置

    --enable-gcov           Enable GCOV code coverage (requires LTP) - FOR DEVELOPERS ONLY!!
    --enable-debug          Compile with debugging symbols
    --with-layout=TYPE      Set how installed files will be laid out.  Type can
                            be either PHP or GNU [PHP]
    --with-config-file-path=PATH
                            Set the path in which to look for php.ini [PREFIX/lib]
    --with-config-file-scan-dir=PATH
                            Set the path where to scan for configuration files
    --enable-sigchild       Enable PHP's own SIGCHLD handler
    --enable-libgcc         Enable explicitly linking against libgcc
    --disable-short-tags    Disable the short-form <? start tag by default
    --enable-dmalloc        Enable dmalloc
    --disable-ipv6          Disable IPv6 support
    --enable-dtrace         Enable DTrace support
    --enable-fd-setsize     Set size of descriptor sets



### 8. 扩展(Extensions)

观察扩展选项列表，有一些初步结论：

1. 扩展中比较通用的依赖有：`libxml, zlib, libiconv, curl, pcre`等。
    关于这些基础依赖库的信息和安装，可以查看这篇文章：
    <a href="./php-dependencies.md.html">PHP的常用基础依赖库</a>

2. 同一个选项可能出现在多个地方，比如`--with-libxml-dir=DIR`：

        --with-libxml-dir=DIR   LIBXML: libxml2 install prefix
        --with-libxml-dir=DIR   DOM: libxml2 install prefix
        --with-libxml-dir=DIR   SimpleXML: libxml2 install prefix
        --with-libxml-dir=DIR   SOAP: libxml2 install prefix
        --with-libxml-dir=DIR   WDDX: libxml2 install prefix
        --with-libxml-dir=DIR   XML: libxml2 install prefix
        --with-libxml-dir=DIR   XMLReader: libxml2 install prefix
        --with-libxml-dir=DIR   XMLRPC-EPI: libxml2 install prefix
        --with-libxml-dir=DIR   XMLWriter: libxml2 install prefix

    又比如`--with-zlib`:

        --with-zlib=DIR         Include ZLIB support (requires zlib >= 1.0.9)
        --with-zlib-dir=<DIR>   Define the location of zlib install directory
        --with-zlib-dir=DIR     GD: Set the path to libz install prefix
        --with-zlib-dir=DIR     MySQL: Set the path to libz install prefix
        --with-zlib-dir=DIR     PDO_MySQL: Set the path to libz install prefix
        --with-zlib-dir=DIR     ZIP: Set the path to libz install prefix
        --with-zlib-dir=DIR     mysqlnd: Set the path to libz install prefix

    还有`--with-iconv`:

        --with-iconv-dir=DIR    XMLRPC-EPI: iconv dir for XMLRPC-EPI

    还有`--with-pcre`:

        --with-pcre-dir         FILTER: pcre install prefix
        --with-pcre-dir         ZIP: pcre install prefix


3. 有一些选项是默认启动的，如果需要按自己的想法精确指定启动与否，可以先使用`--disable-all`，然后再
    逐一通过相关选项开启。


`选项列表：`

    --with-EXTENSION=shared[,PATH]

      NOTE: Not all extensions can be build as 'shared'.

      Example: --with-foobar=shared,/usr/local/foobar/

        o Builds the foobar extension as shared extension.
        o foobar package install prefix is /usr/local/foobar/


    --disable-all           Disable all extensions which are enabled by default

    --with-regex=TYPE       Regex library type: system, php. TYPE=php
                            WARNING: Do NOT use unless you know what you are doing!
    --disable-libxml        Disable LIBXML support
    --with-libxml-dir=DIR   LIBXML: libxml2 install prefix
    --with-openssl=DIR      Include OpenSSL support (requires OpenSSL >= 0.9.6)
    --with-kerberos=DIR     OPENSSL: Include Kerberos support
    --with-pcre-regex=DIR   Include Perl Compatible Regular Expressions support.
                            DIR is the PCRE install prefix BUNDLED
    --without-sqlite3=DIR   Do not include SQLite3 support. DIR is the prefix to
                            SQLite3 installation directory.
    --with-zlib=DIR         Include ZLIB support (requires zlib >= 1.0.9)
    --with-zlib-dir=<DIR>   Define the location of zlib install directory
    --enable-bcmath         Enable bc style precision math functions
    --with-bz2=DIR          Include BZip2 support
    --enable-calendar       Enable support for calendar conversion
    --disable-ctype         Disable ctype functions
    --with-curl=DIR         Include cURL support
    --enable-dba            Build DBA with bundled modules. To build shared DBA
                            extension use --enable-dba=shared
    --with-qdbm=DIR         DBA: QDBM support
    --with-gdbm=DIR         DBA: GDBM support
    --with-ndbm=DIR         DBA: NDBM support
    --with-db4=DIR          DBA: Oracle Berkeley DB 4.x or 5.x support
    --with-db3=DIR          DBA: Oracle Berkeley DB 3.x support
    --with-db2=DIR          DBA: Oracle Berkeley DB 2.x support
    --with-db1=DIR          DBA: Oracle Berkeley DB 1.x support/emulation
    --with-dbm=DIR          DBA: DBM support
    --with-tcadb=DIR        DBA: Tokyo Cabinet abstract DB support
    --without-cdb=DIR       DBA: CDB support (bundled)
    --disable-inifile       DBA: INI support (bundled)
    --disable-flatfile      DBA: FlatFile support (bundled)
    --disable-dom           Disable DOM support
    --with-libxml-dir=DIR   DOM: libxml2 install prefix
    --with-enchant=DIR      Include enchant support.
                            GNU Aspell version 1.1.3 or higher required.
    --enable-exif           Enable EXIF (metadata from images) support
    --disable-fileinfo      Disable fileinfo support
    --disable-filter        Disable input filter support
    --with-pcre-dir         FILTER: pcre install prefix
    --enable-ftp            Enable FTP support
    --with-openssl-dir=DIR  FTP: openssl install prefix
    --with-gd=DIR           Include GD support.  DIR is the GD library base
                            install directory BUNDLED
    --with-vpx-dir=DIR      GD: Set the path to libvpx install prefix
    --with-jpeg-dir=DIR     GD: Set the path to libjpeg install prefix
    --with-png-dir=DIR      GD: Set the path to libpng install prefix
    --with-zlib-dir=DIR     GD: Set the path to libz install prefix
    --with-xpm-dir=DIR      GD: Set the path to libXpm install prefix
    --with-freetype-dir=DIR GD: Set the path to FreeType 2 install prefix
    --with-t1lib=DIR        GD: Include T1lib support. T1lib version >= 5.0.0 required
    --enable-gd-native-ttf  GD: Enable TrueType string function
    --enable-gd-jis-conv    GD: Enable JIS-mapped Japanese font support
    --with-gettext=DIR      Include GNU gettext support
    --with-gmp=DIR          Include GNU MP support
    --with-mhash=DIR        Include mhash support
    --disable-hash          Disable hash support
    --without-iconv=DIR     Exclude iconv support
    --with-imap=DIR         Include IMAP support. DIR is the c-client install prefix
    --with-kerberos=DIR     IMAP: Include Kerberos support. DIR is the Kerberos install prefix
    --with-imap-ssl=DIR     IMAP: Include SSL support. DIR is the OpenSSL install prefix
    --with-interbase=DIR    Include InterBase support.  DIR is the InterBase base
                            install directory /usr/interbase
    --enable-intl           Enable internationalization support
    --with-icu-dir=DIR      Specify where ICU libraries and headers can be found
    --disable-json          Disable JavaScript Object Serialization support
    --with-ldap=DIR         Include LDAP support
    --with-ldap-sasl=DIR    LDAP: Include Cyrus SASL support
    --enable-mbstring       Enable multibyte string support
    --disable-mbregex       MBSTRING: Disable multibyte regex support
    --disable-mbregex-backtrack
                            MBSTRING: Disable multibyte regex backtrack check
    --with-libmbfl=DIR      MBSTRING: Use external libmbfl.  DIR is the libmbfl base
                            install directory BUNDLED
    --with-onig=DIR         MBSTRING: Use external oniguruma. DIR is the oniguruma install prefix.
                            If DIR is not set, the bundled oniguruma will be used
    --with-mcrypt=DIR       Include mcrypt support
    --with-mssql=DIR        Include MSSQL-DB support.  DIR is the FreeTDS home
                            directory /usr/local/freetds
    --with-mysql=DIR        Include MySQL support.  DIR is the MySQL base
                            directory, if no DIR is passed or the value is
                            mysqlnd the MySQL native driver will be used
    --with-mysql-sock=SOCKPATH
                            MySQL/MySQLi/PDO_MYSQL: Location of the MySQL unix socket pointer.
                            If unspecified, the default locations are searched
    --with-zlib-dir=DIR     MySQL: Set the path to libz install prefix
    --with-mysqli=FILE      Include MySQLi support.  FILE is the path
                            to mysql_config.  If no value or mysqlnd is passed
                            as FILE, the MySQL native driver will be used
    --enable-embedded-mysqli
                            MYSQLi: Enable embedded support
                            Note: Does not work with MySQL native driver!
    --with-oci8=DIR         Include Oracle Database OCI8 support. DIR defaults to \$ORACLE_HOME.
                            Use --with-oci8=instantclient,/path/to/instant/client/lib
                            to use an Oracle Instant Client installation
    --with-odbcver=HEX      Force support for the passed ODBC version. A hex number is expected, default 0x0300.
                               Use the special value of 0 to prevent an explicit ODBCVER to be defined.
    --with-adabas=DIR       Include Adabas D support /usr/local
    --with-sapdb=DIR        Include SAP DB support /usr/local
    --with-solid=DIR        Include Solid support /usr/local/solid
    --with-ibm-db2=DIR      Include IBM DB2 support /home/db2inst1/sqllib
    --with-ODBCRouter=DIR   Include ODBCRouter.com support /usr
    --with-empress=DIR      Include Empress support \$EMPRESSPATH
                            (Empress Version >= 8.60 required)
    --with-empress-bcs=DIR
                            Include Empress Local Access support \$EMPRESSPATH
                            (Empress Version >= 8.60 required)
    --with-birdstep=DIR     Include Birdstep support /usr/local/birdstep
    --with-custom-odbc=DIR  Include user defined ODBC support. DIR is ODBC install base
                            directory /usr/local. Make sure to define CUSTOM_ODBC_LIBS and
                            have some odbc.h in your include dirs. f.e. you should define
                            following for Sybase SQL Anywhere 5.5.00 on QNX, prior to
                            running this configure script:
                              CPPFLAGS=\"-DODBC_QNX -DSQLANY_BUG\"
                              LDFLAGS=-lunix
                              CUSTOM_ODBC_LIBS=\"-ldblib -lodbc\"
    --with-iodbc=DIR        Include iODBC support /usr/local
    --with-esoob=DIR        Include Easysoft OOB support /usr/local/easysoft/oob/client
    --with-unixODBC=DIR     Include unixODBC support /usr/local
    --with-dbmaker=DIR      Include DBMaker support
    --enable-opcache        Enable Zend OPcache support
    --enable-pcntl          Enable pcntl support (CLI/CGI only)
    --disable-pdo           Disable PHP Data Objects support
    --with-pdo-dblib=DIR    PDO: DBLIB-DB support.  DIR is the FreeTDS home directory
    --with-pdo-firebird=DIR PDO: Firebird support.  DIR is the Firebird base
                            install directory /opt/firebird
    --with-pdo-mysql=DIR    PDO: MySQL support. DIR is the MySQL base directory
                            If no value or mysqlnd is passed as DIR, the
                            MySQL native driver will be used
    --with-zlib-dir=DIR     PDO_MySQL: Set the path to libz install prefix
    --with-pdo-oci=DIR      PDO: Oracle OCI support. DIR defaults to \$ORACLE_HOME.
                            Use --with-pdo-oci=instantclient,prefix,version
                            for an Oracle Instant Client SDK.
                            For example on Linux with 11.2 RPMs use:
                              --with-pdo-oci=instantclient,/usr,11.2
                            With 10.2 RPMs use:
                              --with-pdo-oci=instantclient,/usr,10.2.0.4
    --with-pdo-odbc=flavour,dir
                            PDO: Support for 'flavour' ODBC driver.
                include and lib dirs are looked for under 'dir'.

                'flavour' can be one of:  ibm-db2, iODBC, unixODBC, generic
                If ',dir' part is omitted, default for the flavour
                you have selected will be used. e.g.:

                  --with-pdo-odbc=unixODBC

                will check for unixODBC under /usr/local. You may attempt
                to use an otherwise unsupported driver using the \"generic\"
                flavour.  The syntax for generic ODBC support is:

                  --with-pdo-odbc=generic,dir,libname,ldflags,cflags

                When built as 'shared' the extension filename is always pdo_odbc.so
    --with-pdo-pgsql=DIR    PDO: PostgreSQL support.  DIR is the PostgreSQL base
                            install directory or the path to pg_config
    --without-pdo-sqlite=DIR
                            PDO: sqlite 3 support.  DIR is the sqlite base
                            install directory BUNDLED
    --with-pgsql=DIR        Include PostgreSQL support.  DIR is the PostgreSQL
                            base install directory or the path to pg_config
    --disable-phar          Disable phar support
    --disable-posix         Disable POSIX-like functions
    --with-pspell=DIR       Include PSPELL support.
                            GNU Aspell version 0.50.0 or higher required
    --with-libedit=DIR      Include libedit readline replacement (CLI/CGI only)
    --with-readline=DIR     Include readline support (CLI/CGI only)
    --with-recode=DIR       Include recode support
    --disable-session       Disable session support
    --with-mm=DIR           SESSION: Include mm support for session storage
    --enable-shmop          Enable shmop support
    --disable-simplexml     Disable SimpleXML support
    --with-libxml-dir=DIR   SimpleXML: libxml2 install prefix
    --with-snmp=DIR         Include SNMP support
    --with-openssl-dir=DIR  SNMP: openssl install prefix
    --enable-soap           Enable SOAP support
    --with-libxml-dir=DIR   SOAP: libxml2 install prefix
    --enable-sockets        Enable sockets support
    --with-sybase-ct=DIR    Include Sybase-CT support.  DIR is the Sybase home
                            directory /home/sybase
    --enable-sysvmsg        Enable sysvmsg support
    --enable-sysvsem        Enable System V semaphore support
    --enable-sysvshm        Enable the System V shared memory support
    --with-tidy=DIR         Include TIDY support
    --disable-tokenizer     Disable tokenizer support
    --enable-wddx           Enable WDDX support
    --with-libxml-dir=DIR   WDDX: libxml2 install prefix
    --with-libexpat-dir=DIR WDDX: libexpat dir for XMLRPC-EPI (deprecated)
    --disable-xml           Disable XML support
    --with-libxml-dir=DIR   XML: libxml2 install prefix
    --with-libexpat-dir=DIR XML: libexpat install prefix (deprecated)
    --disable-xmlreader     Disable XMLReader support
    --with-libxml-dir=DIR   XMLReader: libxml2 install prefix
    --with-xmlrpc=DIR       Include XMLRPC-EPI support
    --with-libxml-dir=DIR   XMLRPC-EPI: libxml2 install prefix
    --with-libexpat-dir=DIR XMLRPC-EPI: libexpat dir for XMLRPC-EPI (deprecated)
    --with-iconv-dir=DIR    XMLRPC-EPI: iconv dir for XMLRPC-EPI
    --disable-xmlwriter     Disable XMLWriter support
    --with-libxml-dir=DIR   XMLWriter: libxml2 install prefix
    --with-xsl=DIR          Include XSL support.  DIR is the libxslt base
                            install directory (libxslt >= 1.1.0 required)
    --enable-zip            Include Zip read/write support
    --with-zlib-dir=DIR     ZIP: Set the path to libz install prefix
    --with-pcre-dir         ZIP: pcre install prefix
    --enable-mysqlnd        Enable mysqlnd explicitly, will be done implicitly
                            when required by other extensions
    --disable-mysqlnd-compression-support
                            Disable support for the MySQL compressed protocol in mysqlnd
    --with-zlib-dir=DIR     mysqlnd: Set the path to libz install prefix





### 9. PEAR相关配置

    --with-pear=DIR         Install PEAR in DIR [PREFIX/lib/php]
    --without-pear          Do not install PEAR





### 10. Zend相关配置

    --with-zend-vm=TYPE     Set virtual machine dispatch method. Type is
                            one of "CALL", "SWITCH" or "GOTO" TYPE=CALL
    --enable-maintainer-zts Enable thread safety - for code maintainers only!!
    --disable-inline-optimization
                            If building zend_execute.lo fails, try this switch
    --enable-zend-signals   Use zend signal handling




### 11. TSRM相关配置


    --with-tsrm-pth=pth-config
                            Use GNU Pth
    --with-tsrm-st          Use SGI's State Threads
    --with-tsrm-pthreads    Use POSIX threads (default)


### 12. Libtool相关配置

    --enable-shared=PKGS    Build shared libraries default=yes
    --enable-static=PKGS    Build static libraries default=yes
    --enable-fast-install=PKGS
                            Optimize for fast installation default=yes
    --with-gnu-ld           Assume the C compiler uses GNU ld default=no
    --disable-libtool-lock  Avoid locking (might break parallel builds)
    --with-pic              Try to use only PIC/non-PIC objects default=use both
    --with-tags=TAGS        Include additional configurations automatic






## 配置举例


运行`./configure`命令的时候，可以将标准输出和错误管道至日志文件，比如：

    ./configure ... 2>&1 | tee configure.log

这样有利于查看哪些插件和基础依赖库的支持情况。


1. 在MacOS Yosemite 10.10.3上源码编译安装php-5.5.24，解决自带php-5.5.20不带php-cgi的问题。使用无污染安装。
    libiconv未安装情况下，确保通过检测，使用--without-iconv

        mkdir -p $HOME/softwares/php
        ./configure \
            --prefix=$HOME/softwares/php \
            --without-iconv \
            2>&1 | tee configure.log
        make
        make install

    当然，这种情况下，`iconv(...)`函数是不能用的。

2. 假设libiconv已经安装，安装方式查看
    <a href="./php-dependencies.md.html">php的常用基础依赖库</a>
    。由于已经安装libiconv，则通过--with-iconv=DIR选项指定libiconv库地址。

        mkdir -p $HOME/softwares/php
        ./configure \
            --prefix=$HOME/softwares/php \
            --with-iconv=$HOME/softwares/libiconv \
            2>&1 | tee configure.log
        make
        make install

    注意，--with-iconv=DIR选项并没有出现在./configure --help中，但确实可用。
    
    同时由于libcurl在mac os上默认未安装，以上两种方式安装的php无法使用`curl_init(...)`等函数。

3. 假设libcurl已经安装，安装方式同样查看
    <a href="./php-dependencies.md.html">php的常用基础依赖库</a>
    。由于已经安装libcurl，则通过--with-curl=DIR选项指定libcurl库地址。

        mkdir -p $HOME/softwares/php
        ./configure \
            --prefix=$HOME/softwares/php \
            --with-iconv=$HOME/softwares/libiconv \
            --with-curl=$HOME/softwares/curl \
            2>&1 | tee configure.log
        make
        make install

    同时由于zlib在mac os上默认未安装，以上两种方式安装的php无法使用`zlib_encode(...)`等函数。


4. 假设zlib已经安装，安装方式同样查看
    <a href="./php-dependencies.md.html">php的常用基础依赖库</a>
    。由于已经安装zlib，则通过--with-zlib=DIR选项指定zlib库地址。

        mkdir -p $HOME/softwares/php
        ./configure \
            --prefix=$HOME/softwares/php \
            --with-iconv=$HOME/softwares/libiconv \
            --with-curl=$HOME/softwares/curl \
            --with-zlib=$HOME/softwares/zlib \
            2>&1 | tee configure.log
        make
        make install







