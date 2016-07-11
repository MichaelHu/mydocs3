# Sublime


## 安装Package Control

`Sublime3`安装Package Control

`Ctrl+\``调出命令行，在命令行中输入以下代码，并回车。安装好以后，重启。

    import urllib.request,os; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ','%20')).read())

以下是Sublime2的命令行：

    import urllib2,os; pf='Package Control.sublime-package'; ipp = sublime.installed_packages_path(); os.makedirs( ipp ) if not os.path.exists(ipp) else None; urllib2.install_opener( urllib2.build_opener( urllib2.ProxyHandler( ))); open( os.path.join( ipp, pf), 'wb' ).write( urllib2.urlopen( 'http://sublime.wbond.net/' +pf.replace( ' ','%20' )).read()); print( 'Please restart Sublime Text to finish installation')

查看下菜单栏，如果存在Preference -> Package Settings，则表明已经安装成功。




## 安装GIT和SVN

1. `Ctrl+Command+P`
2. 输入`install`，回车
3. 输入`git`，选中列表中GIT插件，回车，进入安装

SVN同GIT安装，只需输入`svn`后回车安装。



