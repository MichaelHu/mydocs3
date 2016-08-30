# ssh

> ssh - OpenSSH SSH client (remote login program)

> sshd - OpenSSH SSH daemon



## authorized_keys

信任机器列表，将A机器的`id_rsa.pub`拷贝至B机器的`~/.ssh/authorized_keys`文件中，从而建立A到B的`免密`连接。

注意建立`authorized_keys`文件的时候，文件权限有严格限制，必须保证用户的home目录、.ssh目录，以及authorized_keys文件`只有用户本身`拥有`写权限`，否则`sshd`将不允许使用该文件。



