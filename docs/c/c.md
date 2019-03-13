# c

> c语言基础


## Tips

* 注意`声明和定义`的区别


## static关键字

### Resources

* c语言中static关键字用法详解 <https://blog.csdn.net/guotianqing/article/details/79828100>

### 使用场景

* `静态局部变量`，其存储在全局数据区，即使函数返回，其值也保持不变
* `静态全局变量`，限制全局变量只在`当前文件作用域内`可使用
* `静态函数`，限制函数只在`当前文件作用域内`可使用




## extern关键字

### Resources

* C语言中extern的用法 <https://www.cnblogs.com/mch0dm1n/p/5727667.html>
* extern关键字，C语言extern关键字用法详解 <http://c.biancheng.net/view/404.html>


### 使用场景

* 用在`变量或函数`的`声明`前，用来说明「此变量/函数是在`别处定义`的，要在此处引用」。
* 对于extern`修饰变量`的声明：
    1. 若`a.c`中需引用b.c中的变量`int v`，可以在`a.c`中声明`extern int v`，然后就可以引用变量v
    2. 需要注意的是，被引用的变量v的`链接属性`必须是`外链接(external)`的，也就是说a.c要引用到变量v，`不只是`取决于在a.c中`声明extern int v`，还取决于变量v`本身是能够被引用`到的
    3. 变量的作用域，能够被其他模块`以extern引用`到的变量通常是`全局变量`。
    4. 如果全局变量不在文件的开头定义，有效的作用范围将`只限于其定义处到文件结束`，此时可在定义前通过extern修饰，`提前使用该变量`
    4. `extern int v`可以放在a.c中的`任何地方`，比如可以在a.c中`函数func()定义的开头处`声明extern int v，然后就可以引用到变量v了，只不过这样`只能在func()作用域中引用变量v`
    5. 对于以上这一点来说，很多人使用时都心存顾虑，好像extern声明只能用于文件作用域似的
* 对于extern`修饰函数`的声明：
    1. 本质上讲，变量和函数没有区别
    2. 函数名是指向`函数二进制块`开头处的指针
    3. 如果文件a.c要引用b.c中的函数，比如在b.c中原型是int func(int m)，那么就可以在a.c中声明`extern int func(int m)`，然后就能使用func()来做任何事情
    4. 就像变量的声明一样，extern int func(int m)可以放在a.c中的`任何位置`，而不一定非要放在a.c的文件作用域的范围中
    5. 对其他模块中函数的引用，最常用的方法是`包含这些函数声明的头文件`
    6. 使用extern和包含头文件来引用函数的区别：extern的引用方式比包含头文件要直接得多
    7. extern的使用方法是直接了当的，想引用哪个函数就用extern声明哪个函数。这大概是kiss原则的一种体现。这样做的一个明显的好处是，会加速程序的编译(确切地说是预处理)的过程，节省时间。在大型C程序编译过程中，这种差异是非常明显的。
* 可用于指示C或者C++函数的`调用规范`。比如在`C++中调用C库函数`，就需要在C++程序中用`extern "C"`声明要引用的函数
* `extern "C"`是给链接器使用的，告诉链接器在链接的时候用`C函数规范`来链接。主要原因是C++和C程序编译完成后在`目标代码中命名规则不同`。



## time.h

参考：<http://www.cnblogs.com/emanlee/archive/2007/10/23/935356.html>


### 概念

UTC（世界标准时间），Calendar Time（日历时间），epoch（时间点），clock tick（时钟计时单元）


### 计时


    #ifndef _CLOCK_T_DEFINED 
    typedef long clock_t; 
    #define _CLOCK_T_DEFINED 
    #endif
    
    clock_t clock( void );


### tm & time_t

    #ifndef _TM_DEFINED 
    struct tm { 
        int tm_sec; /* 秒 – 取值区间为[0,59] */ 
        int tm_min; /* 分 - 取值区间为[0,59] */ 
        int tm_hour; /* 时 - 取值区间为[0,23] */ 
        int tm_mday; /* 一个月中的日期 - 取值区间为[1,31] */ 
        int tm_mon; /* 月份（从一月开始，0代表一月） - 取值区间为[0,11] */ 
        int tm_year; /* 年份，其值等于实际年份减去1900 */ 
        int tm_wday; /* 星期 – 取值区间为[0,6]，其中0代表星期天，1代表星期一，以此类推 */ 
        int tm_yday; /* 从每年的1月1日开始的天数 – 取值区间为[0,365]，其中0代表1月1日，1代表1月2日，以此类推 */ 
        int tm_isdst; /* 夏令时标识符，实行夏令时的时候，tm_isdst为正。不实行夏令时的进候，tm_isdst为0；不了解情况时，tm_isdst()为负。*/ 
    }; 
    #define _TM_DEFINED 
    #endif

    #ifndef _TIME_T_DEFINED 
    typedef long time_t; /* 时间值 */ 
    #define _TIME_T_DEFINED /* 避免重复定义 time_t */ 
    #endif


### 相关函数

    time_t time(time_t * timer);

    double difftime(time_t time1, time_t time0); 
    time_t mktime(struct tm * timeptr); 
    time_t time(time_t * timer); 
    char * asctime(const struct tm * timeptr); 
    char * ctime(const time_t *timer);

    struct tm * gmtime(const time_t *timer); 
    struct tm * localtime(const time_t * timer);

    size_t strftime( 
        char *strDest, 
        size_t maxsize, 
        const char *format, 
        const struct tm *timeptr 
    );

`strftime`的预定义`format`字符串：

    %a 星期几的简写 
    %A 星期几的全称 
    %b 月分的简写 
    %B 月份的全称 
    %c 标准的日期的时间串 
    %C 年份的后两位数字 
    %d 十进制表示的每月的第几天 
    %D 月/天/年 
    %e 在两字符域中，十进制表示的每月的第几天 
    %F 年-月-日 
    %g 年份的后两位数字，使用基于周的年 
    %G 年分，使用基于周的年 
    %h 简写的月份名 
    %H 24小时制的小时 
    %I 12小时制的小时 
    %j 十进制表示的每年的第几天 
    %m 十进制表示的月份 
    %M 十时制表示的分钟数 
    %n 新行符 
    %p 本地的AM或PM的等价显示 
    %r 12小时的时间 
    %R 显示小时和分钟：hh:mm 
    %S 十进制的秒数 
    %t 水平制表符 
    %T 显示时分秒：hh:mm:ss 
    %u 每周的第几天，星期一为第一天 （值从0到6，星期一为0） 
    %U 第年的第几周，把星期日做为第一天（值从0到53） 
    %V 每年的第几周，使用基于周的年 
    %w 十进制表示的星期几（值从0到6，星期天为0） 
    %W 每年的第几周，把星期一做为第一天（值从0到53） 
    %x 标准的日期串 
    %X 标准的时间串 
    %y 不带世纪的十进制年份（值从0到99） 
    %Y 带世纪部分的十进制年份 
    %z，%Z 时区名称，如果不能得到时区名称则返回空字符。 
    %% 百分号


### 示例-自定义时间格式

    #include "stdio.h" 
    #include "stdlib.h" 
    #include "time.h" 
    
    int main(void) { 
        struct tm *ptr; 
        time_t localTime; 
        char str[80]; 
        localTime = time(NULL); 
        ptr = localtime(&localTime); 
        strftime(str,100,"It is now %I %p\n",ptr); 
        printf(str); 
        return 0; 
    } 


    




