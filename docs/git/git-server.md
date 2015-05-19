# Git服务器搭建

> HTTP访问，支持pull和push的GIT服务器

## Apache Server


### 1. httpd.conf配置


1. 配置Alias，使得`/git_repost/`可以通过网络访问：

        <IfModule alias_module>
            Alias /git_repos/ /home/xiaoju/fe/git_repos/
        </IfModule>

2. 添加Directory，提供文件系统目录的可访问性：

        <Directory "/home/xiaoju/fe/git_repos">
            Options Indexes FollowSymLinks
            AllowOverride None
            Require all granted
        </Directory>        

    注意apache2.4的新写法。


3. 添加dav相关module

        LoadModule dav_module modules/mod_dav.so
        LoadModule dav_fs_module modules/mod_dav_fs.so

4. 添加dav lock文件路径配置（路径可自定义 ， 但必须提供）

    DAVLockDB "/home/work/apache2.4.2/tmp/DAV.lock"

5. 配置需要DAV支持的Location

        <Location /git_repos/>
            DAV on
        </Location>




### 2. 建立git仓库

    cd /home/xiaoju/fe/git_repos
    mkdir test
    cd test
    git init
    cp -r .git ../abc.git
    cd ../abc.git
    git update-server-info

`git update-server-info`非常关键，会在abc.git/info/下生成refs



### 3. 使用

在本地机器： 

    git clone http://path/to/server/git_repos/abc.git abc

不出意外，已经可以clone出一个empty的仓库了，以下再试试push功能，向服务器提交数据。

    cd abc
    vim test.md
    git add test.md
    git commit -m "master: add test.md"
    git push origin master





