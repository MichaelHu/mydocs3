# expect command

hudamin

> 与可交互程序进行`编程式对话`，使得命令行自动化

`expect [ -dDinN ] [ -c cmds ] [ [ -[f|b] ] cmdfile ] [ args ]`

可以用C或者C++编写，但最常用的还是Tcl语言编写脚本文件。


## 初阶例子

1. dialback

        spawn tip modem
        expect "connected"
        send "ATD$argv\r"
        # modem takes a while to connect
        set timeout 60
        expect "CONNECT"

2. todo 


## 初阶四个命令

1. spawn

    启动子进程

        spawn ssh username@host

2. expect

    多路expect例子：

        set timeout 30

        set username [lrange $argv 0 0]

        if { $username == "" } {
            spawn ssh relay.258i.com
        } else {
            spawn ssh $username@relay.258i.com
        }

        expect -re ".*ssl.*"
        send "ssh hudamin@sub0.258i.com\r"
        expect {
            -re ".*password:" {
                send "2ws\x24rf^yh\r"
            }
            -re ".*sub0\.258i\.com" {
                send ""
            }
        }
        interact 

3. send
    
        send [-flag] string

    * 如果string看起来像一个选项，可以在其前面添加`--`，告知send将其解析为一个字符串
    * `-h`选项，模拟人输入的速度来发送，但需要设置send_human变量

            set send_human {.1 .3 1 .05 2}
            send -h "I'm hungry.  Let's do lunch."

    * 关于转义，使用反斜线` \ `，比如`\x24, \044, \t, \r`等

            send "a\tb\tc\r" 
            # $转义，避免取未知变量的值，使用\x24或\044，如传送"ab$"
            send "ab\x24"
            send "ab\044"


4. interact

    将当前进程的控制权交给用户，使得键盘输入传送给当前进程，当前进程的stdout和stderr返回给用户。



## 其他命令

1. send_user


