# ssh

> ssh - OpenSSH SSH client ( remote login program )

> sshd - OpenSSH SSH daemon

> changelog: 1707, 1608

## ssh-keygen命令

本机生成key，按类型生成：

    $ ssh-keygen -t rsa1
    $ ssh-keygen -t rsa
    $ ssh-keygen -t dsa
    $ ssh-keygen -t ecdsa

默认情况下，在`~/.ssh`目录下生成相应文件，一般有`秘钥文件`和`公钥文件`（`.pub`后缀），成对出现。

    $ ssh-keygen -t TYPE -C "COMMENTS"

以上可以添加注释内容至钥匙文件中，一些`常用选项`如下：

    -P  提供密码
    -p  可以进行密码修改，命令行会提示

其他选项或功能，可以`man ssh-keygen`再行查看。




## known_hosts文件

> 记录其他主机的`公钥`，系统自动添加

文件内容格式如下：

    192.168.1.101 ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDF/fQJNWoQoepnB7LQtzn1kZatktQ6ZFkXLzuF7OZ9SL/kXJbE2dD7srB1z2Sx1U6Xn5vI9UgScTtOqlJ/XrXB0vNG0/yIbQZeNnxHh9zT7nlAqM5YlgXnHFMAh4ts5MgPuJAvzxdjNv1lKqVPa0SbFlT1qcHF7SL4QbhfXmmG3jKm6v85vOnZ+tMhB0RIHvC8Me+2ylsIY58rPGzpJ/YScQKXsWnRbq7LgbNBnzmFFZM/ow+P61FIPlB/Ur/AVWOwyZETRuI0mOpDBFz2OAPLei6bq0PQ7ZWJpfz0A74EZMsJq0Kps4yi4swFj8v4KhrpFqogzikAONpNSmwneBeX
    relay.258i.com,199.44.6.12 ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAIEA2KQaDFxCRHLGTmJujFC63bLU+dNom25+bS0XCByylI80LpXf22m2q6f6/r+KrW+c4DOnNOIYetxszdr+UM3kabhqFPmRADeeMbUQtW/4kaAhTkFytpUhaRJ+PKGbpVv0DceDxmjBZECPduOuJfRJ5SYK9O/O+Cu4NiCKqjEyTuE=




## authorized_keys

`信任`机器列表，将A机器的`id_rsa.pub`拷贝至B机器的`~/.ssh/authorized_keys`文件中，从而建立A到B的`免密`连接。

                     免密连接
           A         ========>          B
    [192.168.1.102]              [192.168.1.101]
     id_rsa.pub                 ~/.ssh/authorized_keys
          +------------------->     192.168.1.102 ....
              copy pub-key to
                                

注意建立目标机器上`~/.ssh/authorized_keys`文件的时候，文件`权限`有严格限制。限制如下：

> 必须保证目标机器上`当前用户`的`home`目录、`.ssh`目录，以及`authorized_keys`文件只有用户`本身`拥有`写权限`，否则`sshd`将不允许使用该文件。

假设B机器上的`admin`用户接受了A机器上`fe`用户的`免密`连接，则在A机器上的`fe`用户执行以下命令：

    ssh admin@192.168.1.101 

就可以直接登录B机器的`admin`账户。


## config文件

    vim ~/.ssh/config

    Host git.dispatch.258i.com
    User git
    IdentityFile /home/rice/.ssh/michael_rsa_258i

    Host git.web.258i.com
    HostName git.258i.web.258i.com
    User git
    IdentityFile /home/rice/.ssh/hdm_rsa_258i

    Host git.img.258i.com
    HostName git.258i.img.258i.com
    User git
    IdentityFile /home/rice/.ssh/hyy_rsa_258i




## ssh连接时的中文乱码问题

可参考<ref://../mycloud/mycloud.md.html>
