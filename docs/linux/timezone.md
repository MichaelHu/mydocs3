# timezone

## 时钟设置文件

    cat /etc/sysconfig/clock
    ZONE="Asia/Shanghai"
    UTC=false
    ARC=false

## 交互式时区选择

    tsselect

选择好时区后，可以通过`TZ`环境变量使之生效。

    TZ='Africa/Algiers'; export TZ
