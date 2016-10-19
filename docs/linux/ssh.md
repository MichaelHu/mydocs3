# ssh

> ssh - OpenSSH SSH client (remote login program)

> sshd - OpenSSH SSH daemon



## ssh-keygen命令

本机生成key，按类型生成：

    $ ssh-keygen -t rsa1
    $ ssh-keygen -t rsa
    $ ssh-keygen -t dsa
    $ ssh-keygen -t ecdsa

默认情况下，在`~/.ssh`目录下生成相应文件，一般有`秘钥文件和公钥文件（.pub后缀）`，成对出现。

    $ ssh-keygen -t TYPE -C "COMMENTS"

以上可以添加注释内容至钥匙文件中。

`-P`选项，提供密码，`-p`选项，可以进行密码修改，命令行会提示。

其他选项或功能，可以`man ssh-keygen`再行查看。




## known_hosts文件

> 记录其他主机的公钥

文件内容格式如下：

    192.168.1.101 ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDF/fQJNWoQoepnB7LQtzn1kZatktQ6ZFkXLzuF7OZ9SL/kXJbE2dD7srB1z2Sx1U6Xn5vI9UgScTtOqlJ/XrXB0vNG0/yIbQZeNnxHh9zT7nlAqM5YlgXnHFMAh4ts5MgPuJAvzxdjNv1lKqVPa0SbFlT1qcHF7SL4QbhfXmmG3jKm6v85vOnZ+tMhB0RIHvC8Me+2ylsIY58rPGzpJ/YScQKXsWnRbq7LgbNBnzmFFZM/ow+P61FIPlB/Ur/AVWOwyZETRuI0mOpDBFz2OAPLei6bq0PQ7ZWJpfz0A74EZMsJq0Kps4yi4swFj8v4KhrpFqogzikAONpNSmwneBeX
    relay.258i.com,199.44.6.12 ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAIEA2KQaDFxCRHLGTmJujFC63bLU+dNom25+bS0XCByylI80LpXf22m2q6f6/r+KrW+c4DOnNOIYetxszdr+UM3kabhqFPmRADeeMbUQtW/4kaAhTkFytpUhaRJ+PKGbpVv0DceDxmjBZECPduOuJfRJ5SYK9O/O+Cu4NiCKqjEyTuE=




## authorized_keys

信任机器列表，将A机器的`id_rsa.pub`拷贝至B机器的`~/.ssh/authorized_keys`文件中，从而建立A到B的`免密`连接。

注意建立`authorized_keys`文件的时候，文件权限有严格限制，必须保证用户的home目录、.ssh目录，以及authorized_keys文件`只有用户本身`拥有`写权限`，否则`sshd`将不允许使用该文件。



