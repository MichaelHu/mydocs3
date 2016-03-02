# crontab Memo


## 2 crontab file格式

### 2.1 行格式：

    M H D m d cmd 

### 2.2 说明：

* `M`: 分钟（0-59） 
* `H`：小时（0-23） 
* `D`：天（1-31） 
* `m`: 月（1-12） 
* `d`: 一星期内的天（0~6，0为星期日） 
* `cmd`: 要运行的程序，程序被送入sh执行，这个shell只有USER,HOME,SHELL这三个环境变量

### 2.3 例子：

每晚的21:30重启apache

    30 21 * * * /usr/local/etc/rc.d/lighttpd restart 

每一小时重启apache

    * */1 * * * /usr/local/etc/rc.d/lighttpd restart 

每天18 : 00至23 : 00之间每隔30分钟重启apache

    0,30 18-23 * * * /usr/local/etc/rc.d/lighttpd restart

晚上11点到早上7点之间，每隔一小时重启apache

    * 23-7/1 * * * /usr/local/etc/rc.d/lighttpd restart 


### 2.4 文件格式

一定注意，如果使用`crontab crontab-file`形式，其中的`crontab-file文件必须是unix类型的文件`。

