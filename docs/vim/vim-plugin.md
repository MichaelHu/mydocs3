# VIM plugins

> VIM常用的plugins安装和配置

## 插件管理工具

### vim-pathogen

* github: <https://github.com/tpope/vim-pathogen> <iframe src="http://258i.com/gbtn.html?user=tpope&repo=vim-pathogen&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
* vim插件管理工具，插件统一放在`~/.vim/bundle`或`~/vimfiles`(windows)下，每个插件独立一个目录，互不影响。个人只需维护`.vimrc`文件，插件都通过`git clone`放至bundle目录下，更好支持独立更新。`2008`年左右发布第一版  
* 提供规范手动安装

### Vundle.vim

* github: <https://github.com/VundleVim/Vundle.vim> <iframe src="http://258i.com/gbtn.html?user=VundleVim&repo=Vundle.vim&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe> 
* 2010年发布第一版
* 提供规范自动安装
* 在`.vimrc`文件中使用`Plugin`指令配置插件获取位置，支持github/local／submodule等
* 插件安装自动化：启动vim后，`:PluginInstall`；或者`vim +PluginInstall +qall`
* 可以列出已配置的插件列表： `PluginList`
* 可以在线搜索可用插件： `:PluginSearch foo`
* 可以自动清除不用插件： `:PluginClean`


### apt-vim

* github: <https://github.com/egalpin/apt-vim> <iframe src="http://258i.com/gbtn.html?user=egalpin&repo=apt-vim&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
* 安装麻烦一些，但安装好以后，可以通过命令行来安装插件


## 常用插件

* `nerdtree`：文件列表管理
* `neocomplcache & neosnippet`: 代码补全
* `syntastic`：语法检查

以上插件内容均在github上可以找到，在我的github starred里面可以找到。


## .vimrc文件

### 我的.vimrc文件

适合我的`.vimrc`文件： 
<https://github.com/MichaelHu/myscripts/blob/master/vim/vimrc>

### 君毅的.vimrc

使用Vundle.vim管理插件：<https://github.com/zhaojy1025/Note/blob/master/vim/vimrc>

### sensible.vim

一个Vundle.vim插件：<https://github.com/tpope/vim-sensible/blob/master/plugin/sensible.vim> <iframe src="http://258i.com/gbtn.html?user=tpope&repo=vim-sensible&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>


## pathogen安装与配置

1. 首先安装`pathogen`，手动安装到
    `~/.vim/autoload/pathogen.vim` 或者运行以下命令：

        mkdir -p ~/.vim/autoload ~/.vim/bundle \
            && curl -LSso ~/.vim/autoload/pathogen.vim https://tpo.pe/pathogen.vim

    然后在`.vimrc`顶部添加以下代码：

        execute pathogen#infect()



2. 其他插件的安装，都按`统一方式`，比如安装nerdtree

        cd ~/.vim/bundle
        git clone https://github.com/scrooloose/nerdtree.git 
        cd nerdtree/doc

    重新打开vim，运行命令行命令(Command-line command)：
        
        :Helptags 
        :help NERD_tree.txt 

    完成tags建立和帮助文档建立。


## Vundle.vim安装与配置

> 参考：<https://github.com/VundleVim/Vundle.vim>

    $ git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
    $ vim .vimrc
    ...



## neocompl*插件

* `neocomplcache`插件，配合`neosnippet`插件一起使用。可以不需要lua支持。
* `neocomplete`插件，可以独立使用，但需要vim编译时带上`lua`支持。是neocomplcache插件的新一代插件。



