# ECS配置记录



## 一、登录

配置ECS实例，选择Linux系统为Centos，可以ssh直接登录机器：

    ssh root@xxx.xxx.xxx.xxx

直接给root账号，可以自己添加普通账号和密码：

    # useradd -b /home irice
    # passwd irice
    # su irice
    $ cd
    $ id
    uid=500(irice) gid=500(irice) 组=500(irice)

很多时候需要有更多的权限，可以将irice用户添加到wheel组，并给wheel组添加sudo权限：

    # usermod -G wheel irice
    # su irice
    $ id
    uid=500(irice) gid=500(irice) 组=500(irice),10(wheel)
    # exit
    # vim /etc/sudoers

在文件中取消以下行的注释，作用为wheel组的用户可以使用`sudo`在输入密码后执行所有命令：

    %wheel        ALL=(ALL)       ALL

重新login后生效。






## 二、环境安装

### 2.1 安装PHP

    # yum search php
    # yum install php.x86_64

自动安装了Apache，并默认将php作为Apache的一个module，可以在Apache的modules目录下看到`libphp5.so`。

现可查看Apache和PHP配置：

    # httpd -V
    # php --ini

通过以上命令拿到默认配置项，可以进行相应配置。

配置好以后，就可以启动



### 2.2 fcgid模块安装

安装Apache的fcgid模块：

    # yum install mod_fcgid.x86_64

自动在`/etc/httpd/conf.d/`目录下添加fcgid.conf，该文件内容为：

    LoadModule fcgid_module modules/mod_fcgid.so

    # Use FastCGI to process .fcg .fcgi & .fpl scripts
    AddHandler fcgid-script fcg fcgi fpl

    # Sane place to put sockets and shared memory file
    FcgidIPCDir /var/run/mod_fcgid
    FcgidProcessTableFile /var/run/mod_fcgid/fcgid_shm


启动httpd，不报fastcgi错误，表示成功安装：

    /etc/init.d/httpd start



### 2.3 配置PHP-FCGI

配置php的fastcgi（可参考<http://httpd.apache.org/mod_fcgid/mod/mod_fcgid.html#examples>），在`/etc/httpd/conf.d/`目录下添加文件`fcgid.php.conf`，内容如下：

    Alias /phpapp/ /home/irice/phpapp/
    <Location /phpapp/>
    AddHandler fcgid-script .php
    Options +ExecCGI
    FcgidWrapper /usr/local/bin/php-wrapper .php

    # Customize the next two directives for your requirements.
    Order allow,deny
    Allow from all
    </Location>

同时添加文件`/usr/local/bin/php-wrapper`，是一个shell文件，内容如下：

    #!/bin/sh
    # Set desired PHP_FCGI_* environment variables.
    # Example:
    # PHP FastCGI processes exit after 500 requests by default.
    PHP_FCGI_MAX_REQUESTS=1000
    export PHP_FCGI_MAX_REQUESTS

    # Replace with the path to your FastCGI-enabled PHP executable
    exec /usr/local/bin/php-cgi

并设置php-wrapper文件的可执行属性：

    chmod +x /usr/local/bin/php-cgi 

在/home/irice/phpapp/目录下添加index.php文件：

    <?php
    phpinfo();

重新启动httpd：

    /etc/init.d/httpd restart 

访问：<http://123.56.89.145/phpapp/index.php>




### 2.4 配置GIT服务

安装git服务器，用于ECS机器和本地机器的数据传输，个人使用，只需基于ssh服务的访问就行。如果需要HTTP访问，可以通过配置Apache的DAV来完成，另有文章记录。

1. 第一步，确保ssh服务可用，当然ECS本来就是可用的，直接用就可以
2. 第二步，创建用于访问git服务的登录用户，需要root账户

        useradd git
        vim /etc/passwd

    修改

        git:x:501:501::/home/git:/bin/bash

    为

        git:x:501:501::/home/git:/usr/bin/git-shell
        
    这样git用户可以通过ssh访问服务器，但是无法使用shell，因为git-shell一登录就会退出。

3. 添加git仓库并初始化
    
        cd /home/git
        mkdir git-repos
        cd git-repos
        git init --bare --shared irice.git

    注意，`--shared`选项很重要，避免push操作的失败。
    另外避免目录权限问题，需要将git-repos目录的所有者改成git用户：

        chown -R git:git git-repos

4. 添加本机公钥到git服务器：

    * 本机生成SSH key

            ssh-keygen -t rsa

    * 将本机的公钥内容拷贝至服务器`/home/git/.ssh/auhorized_keys`文件中

5. OK了，可以直接使用了

        git clone git@123.56.89.145:/home/git/git-repos/irice.git




### 2.5 安装nodejs

    yum search nodejs
    yum install nodejs
    node -v


