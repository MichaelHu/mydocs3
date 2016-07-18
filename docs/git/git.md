# git



> 参考图文教程： <http://pcottle.github.io/learnGitBranching/?demo>



## ssh访问

1. 本地机器上生成SSH Key

    1. 先查看是否存在`~/.ssh`，该目录下存在两个文件
            
            id_rsa
            id_rsa.pub

        一个秘钥，一个公钥。如果已经存在，直接进入第二步，否则运行以下命令：

            $ ssh-keygen -t rsa

2. 将生成的公钥`id_rsa.pub`的内容复制到github上的用户设置之`SSH keys`
3. 测试是否添加成功：

        $ ssh -T git@github.com
        The authenticity of host 'github.com (192.30.252.128)' can't be established.
        RSA key fingerprint is 16:22:ac:a5:76:88:2d:36:63:1b:56:4d:eb:df:a2:48.
        Are you sure you want to continue connecting (yes/no)? yes
        Warning: Permanently added 'github.com,192.30.252.128' (RSA) to the list of known hosts.
        Hi MichaelHu! You've successfully authenticated, but GitHub does not provide shell access.

    以上显示已经添加成功


windows机器上添加sshkey，可以使用`git bash`来生成。




## git checkout


常用命令：

    git checkout -b abc
    git checkout master^
    git checkout master^^



## git diff

常用命令：

    # 当前文件与暂存区文件比较
    git diff <file>

    # 两次提交或两个分支HEAD之间的差异
    git diff <commit1> <commit2> <file>
    git diff <branch1> <branch2> <file>
    git diff <commit1>..<commit2> <file>
    git diff <branch1>..<branch2> <file>

    # 两次提交的公共merge祖先与commit2的比较，两次commit需遵从历史先后关系
    git diff <commit1>...<commit2> <file>
    git diff <branch1>...<branch2> <file>

    # 暂存区与版本库差异
    git diff --staged <file>
    git diff --cached <file>

其他options：

    --stat 显示统计信息

以上<file>可以是文件，也可以是目录。




## git log

常用命令：

    # 最近n次修改日志
    git log -n <file>

    # 详细修改日志
    git log -p <file>

    # 最近n次详细修改日志
    git log -p -n <file>

    # 修改日志统计信息
    git log --stat <file>




## git add

常用命令：

    # 添加当前目录下的所有文件
    git add .

    # 添加当前目录下已有文件的更新
    git add -u .

    # 添加整个目录树下已有文件的更新 
    git add -u

    # 根据当前工作目录树来添加、修改或者移除索引 
    git add --all .

    # 根据整个工作目录树来添加、修改或者移除索引 
    git add --all



## git push

常用命令：

    # 上传本地分支至远程分支
    git push origin master:master

    # 上传tags
    git push --tags

    # 上传git push本身包含的内容之外，还包含tags
    git push --follow-tags

    # 上传所有分支
    git push --all

    # 镜像同步远程仓库，包括branch、tag等，
    # 本地存在、远程不存在的会上传；本地删除、远程存在的会在远程删除
    git push --mirror




## git rebase

常用命令：

    git rebase master topic




## git config

写在`.git/config`文件中：

    git config user.name MichaelHu
    git config user.email hdm258i@gmail.com

写在全局~/.gitconfig文件中：

    git config --global user.name MichaelHu
    git config --global user.email hdm258i@gmail.com




## git remote


### git remote add

添加远程origin仓库的URL：

    git remote add origin https://github.com/MichaelHu/fast-slides.git


### git remote rm

删除：

    git remote rm origin


### push问题

问题解决：在某些机器（比如测试机或机房机器）使用git时，可以正常clone、fetch，但是`push`的时候出现以下错误提示：

    [irice@iZ25o3dvl9aZ fast-slides]$ git push origin master
    error: The requested URL returned error: 403 Forbidden while accessing https://MichaelHu@github.com/MichaelHu/fast-slides.git/info/refs

    fatal: HTTP request failed

命令过程也`没有`提示输入密码，所以有错误提示也是正常的。`靠谱`的解决办法是：

    git remote set-url origin https://MichaelHu@github.com/MichaelHu/fast-slides.git

关键在于`username@`这一部分的添加。设置好以后，再次push的时候，就会提示输入密码。

另外按网上的方案通过`git config [--global] user.name ...`和`git config [--global] user.email ...`来设置用户名和邮箱，也不行（至少我这里没有试成功）。

这时，运行`git remote show origin`，得到如下信息：

    [irice@iZ25o3dvl9aZ fast-slides]$ git remote show origin
    * remote origin
      Fetch URL: https://github.com/MichaelHu/fast-slides.git
      Push  URL: https://MichaelHu@github.com/MichaelHu/fast-slides.git
      HEAD branch: master
      Remote branch:
        master tracked
      Local branch configured for 'git pull':
        master merges with remote master
      Local ref configured for 'git push':
        master pushes to master (fast-forwardable)

Push URL需要`身份验证`。




## git stash





