# VIM plugins

> VIM常用的plugins安装和配置






## 常用plugins

`2013`年左右，出现了针对vim plugins的管理工具：`vim-pathogen`，很靠谱。

* `vim-pathogen`：vim插件管理工具，插件统一放在`~/.vim/bundle`或`~/vimfiles`(windows)下，每个插件独立一个目录，互不影响。个人只需维护`.vimrc`文件，插件都通过github放至bundle目录下，更好支持独立更新。
* `nerdtree`：文件列表管理
* `neocomplcache & neosnippet`: 代码补全
* `syntastic`：语法检查

以上插件内容均在github上可以找到，在我的github starred里面可以找到。

适合我的`.vimrc`文件： 
<https://github.com/MichaelHu/myscripts/blob/master/vim/vimrc>




## 安装与配置

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




## neocompl*插件

* `neocomplcache`插件，配合`neosnippet`插件一起使用。可以不需要lua支持。
* `neocomplete`插件，可以独立使用，但需要vim编译时带上`lua`支持。是neocomplcache插件的新一代插件。



