# macos sierra all sources

> 升级到`macos sierra`以后，安全性与隐私里面的`应用来源`默认去除了`任何来源`选项，如何打开？

新版OS应该是处于安全考虑，默认把任何来源选项去除，确保用户在无意识情况下打开不安全的应用，比如`破解版的app`（ sketch app ）。不过有些时候不想花大价钱购买正版app，转而使用破解版本软件的时候，就需要将这个选项打开。

打开后，当前应用会记录到信任列表中，出于安全考虑，最好将该选项关闭。

## 方法

参考链接：<http://www.orsoon.com/news/168373.html>

使用命令行方式打开：

    sudo spctl --master-disable

输入管理员密码后，该选项就打开了。打开相关应用后，可以通过以下命令恢复保护状态：

    sudo spctl --master-enable

