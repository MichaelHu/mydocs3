# brunch备忘

> Brunch is an ultra-fast HTML5 build tool。又一前端工程化构建工具。
> 官网： http://brunch.io




## 第一印象

1. 和FIS最像的构建工具，因为其引入了项目规范，比如目录规范
2. 减少了grunt file的复杂，但需要知道其隐含的规范
3. 提供skeleton，也就是脚手架方式，这个和yeoman相似


介绍文章：http://alxhill.com/blog/articles/brunch-coffeescript-angular/



## 使用

安装

    npm install -g brunch --verbose


三个常用命令：

    brunch new 
    brunch watch
    brunch build


常用skeleton：http://brunch.io/skeletons.html

    gh:Anonyfox/node-webkit-hipster-seed
    gh:paulmillr/brunch-with-chaplin
    gh:scotch/angular-brunch-seed

基于skeleton创建：

    brunch new gh:Anonyfox/node-webkit-hipster-seed ./new-project
    

