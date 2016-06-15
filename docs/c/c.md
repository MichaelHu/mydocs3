# c

> c语言基础


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


    




