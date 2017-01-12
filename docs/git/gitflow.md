# gitflow

> git开发工作流，一种适用于`「大型团队」`的代码管理方法。

* Getting Git Right: <https://www.atlassian.com/git/>
* Learn git: <https://www.atlassian.com/git/tutorials/learn-git-with-bitbucket-cloud>
* gitflow: <https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow>
* 译文： <http://blog.jobbole.com/76867/>


## overview

`gitflow`工作流，为每个`功能分支`分配`具体角色`，主要有`5种`类型的分支：`master`, `develop`, `release`, `feature`, `hotfix`

 <img src="./img/gitflow-branches.png" height="500">


### master分支

* 存储正式发布的历史
* 包含部分历史

### develop分支

* 作为功能的`集成`分支
* 包含全部历史
* 至少是能跑起来的可测试的版本

### feature分支

* 只从develop分支fork
* 开发完以后合并回develop分支
* 不直接与master分支发生关系

### release分支

* 用于发布循环过程
* 从develop分支fork，完成发布循环后合并至`master`和`develop`

### hotfix分支

* 用于为master分支上的版本`打补丁`
* 只从master分支fork，完成后合并至`master`和`develop`






## Atlassian

> Tools for teams, from startup to enterprise.

@[style="background-color:#205081; padding:5px;"]<img src="./img/atlassian-logo.svg"> 

* site: <https://www.atlassian.com>
* JIRA, Bitbucket, HipChat, Bamboo, StatusPage, Confluence, SourceTree 
* 定位IT企业的各类工具


