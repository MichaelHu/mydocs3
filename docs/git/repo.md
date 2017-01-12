# repo

## tips

* `gitflow`
* 标准git开发过程： 编辑、暂存( Stage )、提交( Commit )
* 5种分支：`master`, `hotfix`, `release`, `develop`, `feature`
* 分支命名使用目录形式或减号间隔形式
* gitflow对分支的定位很明确
* `commit log`的格式：`分支名: comment content`
* 阶段性分支或发布分支及时合并到相关分支，无用分支及时删除 
* 冲突解决办法，谁负责谁解决，多人负责多人协同解决
* 避免合并提交，`git pull --rebase origin master`
* 每个阶段常用命令以及`SourceTree`操作过程
* 现有项目迁移方式


## branches

### jQuery

* 1.12-stable
* 2.2-stable
* killphp
* master

分析：
* 对应多个并行稳定版本


### jest

* 0.4.x
* 0.5.x
* gaearon-patch-1
* gh-pages
* hramos-placeholders
* master
* new-docs
* thymikee-patch-1


### vim

> 仅一个分支，CI典范

* master


### d3-queue

* cancel
* linked-list
* master
* promise
* sans-closure
* status


### react-redux

* 3.x
* 4.x
* master


### leaflet

> 非常多，对应不同功能点的开发，有点像是没有及时清理的感觉

* 0.7
* api-symlinks
* as-feature-collection
* attribution-on-all-layers
* blog-foss4g
* boundszoom-inside
* bubbly-option
* cache-mouse-pos
* canvas-click-single-layer
* canvas-improvements
* canvas-reset-2
* canvas-reset
* control-extension-docs
* control-layers-comparelayers
* control-layers-eachlayer
* correct-geojson-docs
* domevent-once
* drag-cancel-click
* dump-tils-to-canvas
* dup-if
* event-refactor-round-2
* ffcfcc1
* fix-removing-all-listeners
* geojson-round-trip-test
* gh-pages-custom-crs
* gh-pages-extending
* grid-layer-docs
* gridlayer-margin
* group-panes
* infinite-tile-errors
* insecure-geolocation
* layer-id-public
* layers-max-zoom
* linearzoom2
* master
* mobile-setview
* move-latlng-equals-to-crs
* mutation-observer
* path-drag
* path-events-refactor
* popup-animzoom
* pr/5202
* ...




### webpack

> 目录形式，分`feature`和`bugfix`等


* 0.8
* 0.9
* 0.10
* 0.11
* 1.0
* Kovensky-patch-1
* bugfix/fix_stats_when_passed_array
* bugfix/watch-error-handling
* bugfix/watch-mode
* cla-check-branch
* feature/jsonp-to-push
* feature/refactor_es6_named_modules_plugins
* feature/refactor_es6_use_strict
* feature/travis_yarn_command
* feature/webpack_options_apply_converage_increase
* inline
* master
* test/flanky-stable
* test/loader-error-warning
* upgrade-eslint
* upgrade-memory-fs
* webpack-1



### gephi

> 版本号来做分支名，有明确的版本计划


* 0.8.1
* 0.8.2
* 0.9.0
* 0.9.1
* datalab
* gh-pages
* master
* mvn-thirdparty-repo
* new-vizengine



### react

0.3-stable
0.4-stable
0.5-stable
0.6-stable
0.8-stable
0.9-stable
0.10-stable
0.11-stable
0.12-stable
0.13-stable
0.14-stable
15-stable
15-dev
15.0.2-dev
15.0.3-dev
15.1.0-dev
Daniel15-patch-1
facts
fiberchildren
fiberpurecomponent
gaearon-patch-1
gh-pages
master
math
new-docs
release-manager
render-callbacks
revert-6461-autofocus-warning
revert-6661-master
revert-6921-remove-set-props-and-replace-props
revert-8584-fiberhostrootupdatequeue
sebmarkbage-patch-1
...






## tags

* 都是3段版本号


### jQuery

* 3.1.1
* ...
* 3.0.0-rc1
* 3.0.0-beta1
* 3.0.0-alpha1
* 3.0.0-alpha1+compat
* 2.2.4
* ...

### jest

* v18.1.0
* v18.0.0
* v17.0.3
* ...


### vim 

小版本号是4位数，更新非常快，应该使用了CI，有完备的单元测试

* 8.0.0134
* 8.0.0133
* 8.0.0132
* 8.0.0131
* ...
* 8.0.0036
* 8.0.0035



### d3-queue

* v3.0.3
* v3.0.2
* ...



### react-redux

* v5.0.1
* v5.0.0
* v5.0.0-rc.2
* v5.0.0-rc.1
* v5.0.0-beta.3
* v5.0.0-beta.2
* v4.4.6
* ...



### leaflet

* v1.0.1
* v1.0.0
* v1.0.0-rc.3
* v1.0.0-rc.2
* v1.0.0-rc.1
* v1.0.0-beta.2
* v1.0.0-beta.1
* v0.7.7
* v0.7.5
* ...



### webpack

* v2.2.0-rc.3
* v2.2.0-rc.2
* v2.2.0-rc.1
* v2.2.0-rc.0
* v2.1.0-beta.28
* v2.1.0-beta.27
* v2.1.0-beta.26
* v2.1.0-beta.25
* ...
* v2.1.0-beta.0
* v2.0.7-beta
* v2.0.6-beta
* ...
* v2.0.0-beta
* v1.14.0
* v1.13.3
* ...
* v1.7.0



### gephi

* v0.9.1
* v0.9.0
* v0.8.2
* v0.8.1
* v0.8.0
* v0.8.0-alpha
* v0.7.0
* v0.7.0-alpha4
* v0.7.0-alpha3
* v0.7.0-alpha2
* v0.7.0-alpha



### react

* v15.4.1
* v15.4.0
* v15.4.0-rc.3
* v15.3.2
* v15.3.1
* ...



