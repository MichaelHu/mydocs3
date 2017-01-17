# git


2017-1-11,
2016-12-02,
2016-11-05,
2016-07-28,
2016-03,
2015,
2014,
2013,
2012

<img src="./img/git.png" height="30">
<https://git-scm.com>

> Docs: <https://git-scm.com/doc>

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

    git checkout -f <new_branch> [<start_point>]
    git checkout -b <new_branch> [<start_point>]
    git checkout -B <new_branch> [<start_point>]
    git checkout master^
    git checkout master^^

例子：

    # 即使map存在，也强行reset
    git checkout -B map 41e86dec9d37b74e12b234fa5b95c35943f52932

    # 从develop分支fork出功能分支
    git checkout -b some-feature develop


## git diff

常用命令：

    # 当前文件与暂存区文件比较
    git diff <file>

    # 两次提交或两个分支HEAD之间的差异
    git diff <commit1> <commit2> <file>
    git diff <branch1> <branch2> <file>
    git diff <commit1>..<commit2> <file>
    git diff <branch1>..<branch2> <file>
    git diff <commit> -- <file>

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

    # 修改日志统计信息，包含文件名和概要
    git log --stat <file>

`commit log`按时间先后逆序排布，但是最近的commit不一定比较远的commit对应的代码包新，比如下图，`hangzhou1229-newlogo`分支是第二个commit，但是该分支是基于半个月前的master分支进行的一个patch。

 <img src="./img/git-log.png" height="500">






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



## git commit

    # 提交更新到本地仓库
    git commit -m "COMMENT MESSAGE"

    # 添加modifined的内容并提交到本地仓库
    git commit -am "COMMENT MESSAGE"

    # 更改上一次提交的日志
    git commit --amend -m "COMMENT MESSAGE"



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

    # 设置远程分支
    git push -u origin marys-feature
    git push --set-upstream origin marys-feature



## git init

    git init --bare /path/to/repo.git



## git reset

    git reset --hard <newbase>

`等同`于：

    git rebase --onto <newbase>




## git rebase

> 使不同功能的提交历史形成串式，通常在需要`往父分支合并前`进行rebase操作。

    # 从master fork出新分支
    git checkout -b some-feature master

    # 编辑提交
    git add
    git commit

    # 更新master
    git checkout master
    git pull origin master

    # some-feature的更新串接至master头部
    git rebase master topic

    # 合并some-feature分支，Fast-forward过程
    git merge topic



### 说明

> `git rebase master topic`

`普通rebase`，将topic分支的提交置于master分支顶部，形成串联提交。

          A---B---C topic                          A'--B'--C' topic
         /                   ->                   /
    D---E---F---G master             D---E---F---G master


若`master`分支中也有`同样`的历史`提交`，会进行`合并`。

         A---B---C topic                            B'---C' topic
        /                    ->                    /
    D---E---A'---F master            D---E---A'---F master       

对`topic`分支有`副作用`，执行rebase后，topic分支发生了变化。


### 常用命令

    git rebase <upstream> <branch>
    git rebase master topic
    git rebase --continue
    git rebase --skip
    git rebase --abort

命令`git rebase master topic`等同于( `master头部`接上`topic`的改动)：

    git checkout topic
    git rebase master

相关命令：

    git pull --rebase origin master



### 例子

> rebase后，commit的`时间`保持`不变`，但是在`显示顺序`上发生`变化`


	git checkout -b feature/watermark feature-watermark-170107
	# now we in branch feature/watermark
	git log

		commit 04dc2acd30f848c90cc4c1340c6ff21bafa3e53d
		Author: jixuecong <jixuecong@lvwan.com>
		Date:   Wed Jan 11 15:20:47 2017 +0800

			修改水印位置

	git add
	git commit -m "feature/watermark: add searchSelectedItem markType"
	git log
		commit a088e00d2bc2b167f46f40078113f9b740c08749
		Author: hudamin <hudamin@lvwan365.com>
		Date:   Thu Jan 12 16:05:40 2017 +0800

			feature/watermark: add searchSelectedItem markType

		commit 04dc2acd30f848c90cc4c1340c6ff21bafa3e53d
		Author: jixuecong <jixuecong@lvwan.com>
		Date:   Wed Jan 11 15:20:47 2017 +0800

			修改水印位置

	git checkout feature-watermark-170107
	git log

		commit 04dc2acd30f848c90cc4c1340c6ff21bafa3e53d
		Author: jixuecong <jixuecong@lvwan.com>
		Date:   Wed Jan 11 15:20:47 2017 +0800

			修改水印位置

	git add
	git commit -m "feature-watermark-170107: just for test"
	git log

		commit 9b4d99d5a7bb7b939ded3de521b2ec971e4bc3cb
		Author: hudamin <hudamin@lvwan365.com>
		Date:   Thu Jan 12 16:07:03 2017 +0800

			feature-watermark-170107: just for test

		commit 04dc2acd30f848c90cc4c1340c6ff21bafa3e53d
		Author: jixuecong <jixuecong@lvwan.com>
		Date:   Wed Jan 11 15:20:47 2017 +0800

			修改水印位置

	git checkout feature/watermark
	git rebase feature-watermark-170107
	git log

		commit 4ccc58d77f1c9d2d51d2e5278176edb756c00d8b
		Author: hudamin <hudamin@lvwan365.com>
		Date:   Thu Jan 12 16:05:40 2017 +0800

			feature/watermark: add searchSelectedItem markType

		commit 9b4d99d5a7bb7b939ded3de521b2ec971e4bc3cb
		Author: hudamin <hudamin@lvwan365.com>
		Date:   Thu Jan 12 16:07:03 2017 +0800

			feature-watermark-170107: just for test

		commit 04dc2acd30f848c90cc4c1340c6ff21bafa3e53d
		Author: jixuecong <jixuecong@lvwan.com>
		Date:   Wed Jan 11 15:20:47 2017 +0800

			修改水印位置




## git config

写在`.git/config`文件中：

    git config user.name MichaelHu
    git config user.email hdm258i@gmail.com

写在全局~/.gitconfig文件中：

    git config --global user.name MichaelHu
    git config --global user.email hdm258i@gmail.com

设置`ignorecase`选项，确保文件名大小写严格区分，`默认`的ignorecase是`true`，如果要区分大小写，需要显式设置：

    git config --get core.ignorecase
    git config core.ignorecase false

如果设置`全局`，则：

    git config --global core.ignorecase false



## git remote


### git remote add

添加`远程`origin`仓库`的`URL`：

    git remote add origin https://github.com/MichaelHu/fast-slides.git


### git remote rm

`删除`远程仓库`引用`：

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




## git pull

### 常用命令

    git pull origin master
    git pull origin master:master
    git pull origin master:abc
    git pull --rebase origin master

 <img src="./img/git-rebase.png" height="300">

`rebase`过程中，出现`合并冲突`，如下图所示：

 <img src="./img/git-rebase-continue.png" height="300">

可以通过`git status`查看冲突文件，并编辑冲突文件，然后继续进行rebase:

    git add 
    git rebase --continue

如果发现冲突无法解决，则可以通过

    git rebase --abort

回到`git pull --rebase origin master`命令执行前的状态。



### 问题

#### refusing

    fatal: refusing to merge unrelated histories

遇到以上问题，可能由于你操作过`git commit --amend`，最终导致无法merge，后续的push/pull都无法继续。
查看stackoverflow（<http://stackoverflow.com/questions/37937984/git-refusing-to-merge-unrelated-histories>），`git merge`有这样的说明：

"git merge" used to allow merging two branches that have no common base by default, which led to a brand new history of an existing project created and then get pulled by an unsuspecting maintainer, which allowed an unnecessary parallel history merged into the existing project. The command has been taught not to allow this by default, with an escape hatch "--allow-unrelated-histories" option to be used in a rare event that merges histories of two projects that started their lives independently.

所以，使用`--allow-unrelated-histories`选项能解决问题，副作用就是两个不同历史的分支会合并。


#### rejected

	hudamin@local SophonWeb $ git pull origin master:release/watermark
	From 172.22.1.88:sophon/SophonWeb
	 ! [rejected]        master     -> release/watermark  (non-fast-forward)
	   b6a5fa3..43a1843  master     -> origin/master

`non-fast-forward`，master本来就是`release/watermark`已经合并过的。
另外，如果`develop`刚从`master` fork下来的时候，执行`git pull`，也会出同样的提示`![rejected]`。


## git branch

### 分支列表

    # 列出本地分支
    git branch

    # 列出远程分支
    git branch -r

    # 本地&远程都列出
    git branch -a


### 创建分支

    # 创建和当前分支一样的新分支
    git branch <branchname>

    # 创建和当前分支一样的新分支，新分支track当前分支
    git branch --track <branchname> 
    # 同上
    git branch --set-upstream <branchname> 

`<branchname>`所指分支是`新建`分支，当前不存在。

设置track后的`git status`:

    hudamin@local SophonWeb $ git status
    On branch ddd
    Your branch is up-to-date with 'map'.
    nothing to commit, working directory clean
    hudamin@local SophonWeb $ git status -sb
    ## ddd...map


### 更改分支upstream

    git branch -u <upstream> <branchname> 
    git branch --set-upstream-to <upstream> <branchname> 
    git branch --unset-upstream <branchname> 

`<branchname>`所指分支是`已存在`分支。

设置track后的`git status`:

    hudamin@local SophonWeb $ git checkout map
    Switched to branch 'map'
    Your branch is up-to-date with 'origin/master'.
    hudamin@local SophonWeb $ git status -sb
    ## map...origin/master


### 删除分支

    # 删除本地分支（不能是当前分支）
    git branch -d <branchname>
    # 同上，但支持强行删除
    git branch -D <branchname>

    # 删除远程分支
    git branch -rd <branchname>
    # 同上，但支持强行删除
    git branch -rD <branchname>

注：远程分支的删除属于`伪删除`，它的作用在于删除以后，通过`git branch -r`不再列出。
`真删除`远程分支，需要使用`git push <repo> :<branchname>`。


### 重命名分支

    git branch -m <oldbranch> <newbranch>
    git branch -M <oldbranch> <newbranch>





## git merge

### 命令

    $ git branch
      map
    * map-snapshot
    $ git checkout map
    $ git merge map-snapshot
    Merge made by the 'recursive' strategy.
     src/components/graphHistory/index.js | 8 ++++++++
      1 file changed, 8 insertions(+)

    # 不自动提交一个commit，或希望自己添加commit说明时
    $ git merge --no-commit maint

`recursive` strategy

### 例子

> `merge`按`时间先后顺序`合并不同分支上的提交。注意与`rebase`的区别。

另外，merge如果不添加`--no-commit`选项的话，会出现一个没啥意义的`Merge branch ...` commit

	git checkout -b feature/watermark1
	# we now in feature/watermark1 branch
	git add
	git commit -m "feature/watermark1: just for test2"
	git log
	
		commit 15bc60a9f86c9f63baad9e8418c3b891a713ecb4
		Author: hudamin <hudamin@lvwan365.com>
		Date:   Thu Jan 12 16:24:38 2017 +0800
	
			feature/watermark1: just for test2
	
		commit 4ccc58d77f1c9d2d51d2e5278176edb756c00d8b
		Author: hudamin <hudamin@lvwan365.com>
		Date:   Thu Jan 12 16:05:40 2017 +0800
	
			....	
	
	
	git checkout feature-watermark-170107
	git add
	git commit -m "feature-watermark-170107: remove just for test"
	git log
	
		commit 30754f379de39fc9bee5d36279e61c6df54f8dc0
		Author: hudamin <hudamin@lvwan365.com>
		Date:   Thu Jan 12 16:25:36 2017 +0800
	
			feature-watermark-170107: remove just for test
	
		commit 4ccc58d77f1c9d2d51d2e5278176edb756c00d8b
		Author: hudamin <hudamin@lvwan365.com>
		Date:   Thu Jan 12 16:05:40 2017 +0800
	
			....	
	
	
	git checkout feature/watermark1
	git merge feature-watermark-170107
	git log
	
		commit 89b50bea2059c7c937557f934401d57d59277c2b
		Merge: 15bc60a 30754f3
		Author: hudamin <hudamin@lvwan365.com>
		Date:   Thu Jan 12 16:32:00 2017 +0800
	
			Merge branch 'feature-watermark-170107' into feature/watermark1
	
		commit 30754f379de39fc9bee5d36279e61c6df54f8dc0
		Author: hudamin <hudamin@lvwan365.com>
		Date:   Thu Jan 12 16:25:36 2017 +0800
	
			feature-watermark-170107: remove just for test
	
		commit 15bc60a9f86c9f63baad9e8418c3b891a713ecb4
		Author: hudamin <hudamin@lvwan365.com>
		Date:   Thu Jan 12 16:24:38 2017 +0800
	
			feature/watermark1: just for test2



## git stash

> 将针对当前工作目录的改动`暂存`，相比新建branch更加`轻量`。

### stash列表

    git stash list

### 创建stash

    git stash 
    git stash save <message>

### 应用stash

    git stash pop
    git stash apply

### 删除stash

    git stash drop <stashname>




## git rev-parse

    git rev-parse master
    802bc153526bdb7ab1aa07e5b8b694906d52e907

    git rev-parse HEAD
    802bc153526bdb7ab1aa07e5b8b694906d52e907

    git rev-parse --short HEAD
    802bc15

    git rev-parse --all
    c981e44a3eb090eb7f27504953733cb343f0800f
    802bc153526bdb7ab1aa07e5b8b694906d52e907
    c981e44a3eb090eb7f27504953733cb343f0800f
    eb9a30eafae1d9bb5b579460d326adaf2154c231
    33b0546012b182c2c8eccd6a89499975ab9f28a0

    git rev-parse --show-toplevel
    /home/Users/hudamin/git/mydocs

    git rev-parse --symbolic --all
    refs/heads/develop
    refs/heads/master

    git rev-parse --git-dir


## git rev-list

    git rev-list --all

    git rev-list --timestamp --max-count=5 --all
    1480420721 802bc153526bdb7ab1aa07e5b8b694906d52e907
    1480420243 c53d12cecddd194925dcba1d79fe4bf362a71a24
    1480419586 94a92415050bc95e3764e9b5dd80672784f00ac9
    1480419039 f9699aef7ec77a4ad3aa67ff0e4e49307074dadb
    1480418999 aeabcc2deca6e6f2a7608d1411d5a53565a5e328



## git file mode

* refer: <http://stackoverflow.com/questions/1580596/how-do-i-make-git-ignore-file-mode-chmod-changes>

文件内容未变，但是`pull`的时候发现以下`diff`信息：

	mode change 100644 => 100755 build/favicon.ico
	mode change 100644 => 100755 build/index.html
	mode change 100644 => 100755 build/js/1.7dfac55a.js
	mode change 100644 => 100755 build/js/10.9a21928a.js

原因是文件模式发生了变化。可以通过`git config`设置忽略此种信息。

	git config core.filemode false
	git config --global core.filemode false

但默认情况下，该配置是`true`。所以还是得尽量避免这种文件模式更新的改动。

### core.fileMode

	core.fileMode 

       If false, the executable bit differences between the index and the
       working copy are ignored; useful on broken filesystems like FAT.
       See git-update-index(1). True by default.

但实际上，这种`非常规变化`也是不能接受的，会给项目组其他成员带来困惑，最好恢复回去。

一个规避方法，`不要忽略提交前的diff信息`。



