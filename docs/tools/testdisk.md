# testdisk

> 一款`开源`的`免费`数据恢复软件

1. site: <http://www.cgsecurity.org/wiki/TestDisk>
1. docs: <ref://./pdf/testdisk.pdf>

另一带界面的收费专业恢复工具参考<ref://./easy-recovery.md.html>

## Overview

* 数据恢复软件
* `不支持U盘`等外接存储介质的数据`恢复`
* 开源软件，GNU - GPL v2+
* 针对`rm *`等不能从回收站恢复的情况
* 如果要提高恢复数据的成功率，需要`尽快停止`操作然后关机
* 数据恢复的原理是为当前硬盘创建一个`镜像盘`，所以恢复时最好用一个`不小于当前盘大小`的盘来创建镜像盘，创建好之后可在镜像里面找到恢复的文件。



## 能做什么
* Fix partition table, recover deleted partition
* Recover FAT32 boot sector from its backup
* Rebuild FAT12/FAT16/FAT32 boot sector
* Fix FAT tables
* Rebuild NTFS boot sector
* Recover NTFS boot sector from its backup
* Fix MFT using MFT mirror
* Locate ext2/ext3/ext4 Backup SuperBlock
* `Undelete files from FAT, exFAT, NTFS and ext2 filesystem`
* Copy files from deleted FAT, exFAT, NTFS and ext2/ext3/ext4 partitions.



## 支持的系统
* DOS (either real or in a Windows 9x DOS-box),
* Windows (NT4, 2000, XP, 2003, Vista, 2008, Windows 7 (x86 & x64), Windows 10
* Linux,
* FreeBSD, NetBSD, OpenBSD,
* SunOS and
* MacOS X


