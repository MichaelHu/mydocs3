# rsync

## Features

* 替换`rcp`命令
* 快速进行文件目录的同步，特别对于`增量同步`过程有很好的性能，其使用一种高效算法进行diff计算
* 支持两种方式：基于`SSH`或者直接基于`TCP`


## Resources

* `lrzsz` - <ref://./lrzsz.md.html>
* `nc` - <ref://./nc.md.html>


## Syntax

    rsync [OPTION]... SRC [SRC]... DEST
    rsync [OPTION]... SRC [SRC]... [USER@]HOST:DEST
    rsync [OPTION]... SRC [SRC]... [USER@]HOST::DEST
    rsync [OPTION]... SRC [SRC]... rsync://[USER@]HOST[:PORT]/DEST
    rsync [OPTION]... SRC
    rsync [OPTION]... [USER@]HOST:SRC [DEST]
    rsync [OPTION]... [USER@]HOST::SRC [DEST]
    rsync [OPTION]... rsync://[USER@]HOST[:PORT]/SRC [DEST]


## Options

> 常用选项排在列表前方

     -v, --verbose               increase verbosity
     -r, --recursive             recurse into directories
         --progress              show progress during transfer


     -q, --quiet                 suppress non-error messages
         --no-motd               suppress daemon-mode MOTD (see manpage caveat)
     -c, --checksum              skip based on checksum, not mod-time & size
     -a, --archive               archive mode; same as -rlptgoD (no -H)
         --no-OPTION             turn off an implied OPTION (e.g. --no-D)
     -R, --relative              use relative path names
         --no-implied-dirs       don't send implied dirs with --relative
     -b, --backup                make backups (see --suffix & --backup-dir)
         --backup-dir=DIR        make backups into hierarchy based in DIR
         --suffix=SUFFIX         set backup suffix (default ~ w/o --backup-dir)
     -u, --update                skip files that are newer on the receiver
         --inplace               update destination files in-place (SEE MAN PAGE)
         --append                append data onto shorter files
     -d, --dirs                  transfer directories without recursing
     -l, --links                 copy symlinks as symlinks
     -L, --copy-links            transform symlink into referent file/dir
         --copy-unsafe-links     only "unsafe" symlinks are transformed
         --safe-links            ignore symlinks that point outside the source tree
     -k, --copy-dirlinks         transform symlink to a dir into referent dir
     -K, --keep-dirlinks         treat symlinked dir on receiver as dir
     -H, --hard-links            preserve hard links
     -p, --perms                 preserve permissions
         --executability         preserve the file's executability
         --chmod=CHMOD           affect file and/or directory permissions
     -o, --owner                 preserve owner (super-user only)
     -g, --group                 preserve group
         --devices               preserve device files (super-user only)
         --specials              preserve special files
     -D                          same as --devices --specials
     -t, --times                 preserve times
     -O, --omit-dir-times        omit directories when preserving times
         --super                 receiver attempts super-user activities
     -S, --sparse                handle sparse files efficiently
     -n, --dry-run               show what would have been transferred
     -W, --whole-file            copy files whole (without rsync algorithm)
     -x, --one-file-system       don't cross filesystem boundaries
     -B, --block-size=SIZE       force a fixed checksum block-size
     -e, --rsh=COMMAND           specify the remote shell to use
         --rsync-path=PROGRAM    specify the rsync to run on the remote machine
         --existing              skip creating new files on receiver
         --ignore-existing       skip updating files that already exist on receiver
         --remove-source-files   sender removes synchronized files (non-dirs)
         --del                   an alias for --delete-during
         --delete                delete extraneous files from destination dirs
         --delete-before         receiver deletes before transfer (default)
         --delete-during         receiver deletes during transfer, not before
         --delete-after          receiver deletes after transfer, not before
         --delete-excluded       also delete excluded files from destination dirs
         --ignore-errors         delete even if there are I/O errors
         --force                 force deletion of directories even if not empty
         --max-delete=NUM        don't delete more than NUM files
         --max-size=SIZE         don't transfer any file larger than SIZE
         --min-size=SIZE         don't transfer any file smaller than SIZE
         --partial               keep partially transferred files
         --partial-dir=DIR       put a partially transferred file into DIR
         --delay-updates         put all updated files into place at transfer's end
     -m, --prune-empty-dirs      prune empty directory chains from the file-list
         --numeric-ids           don't map uid/gid values by user/group name
         --timeout=TIME          set I/O timeout in seconds
     -I, --ignore-times          don't skip files that match in size and mod-time
         --size-only             skip files that match in size
         --modify-window=NUM     compare mod-times with reduced accuracy
     -T, --temp-dir=DIR          create temporary files in directory DIR
     -y, --fuzzy                 find similar file for basis if no dest file
         --compare-dest=DIR      also compare destination files relative to DIR
         --copy-dest=DIR         ... and include copies of unchanged files
         --link-dest=DIR         hardlink to files in DIR when unchanged
     -z, --compress              compress file data during the transfer
         --compress-level=NUM    explicitly set compression level
     -C, --cvs-exclude           auto-ignore files the same way CVS does
     -f, --filter=RULE           add a file-filtering RULE
     -F                          same as --filter='dir-merge /.rsync-filter'
                                 repeated: --filter='- .rsync-filter'
         --exclude=PATTERN       exclude files matching PATTERN
         --exclude-from=FILE     read exclude patterns from FILE
         --include=PATTERN       don't exclude files matching PATTERN
         --include-from=FILE     read include patterns from FILE
         --files-from=FILE       read list of source-file names from FILE
     -0, --from0                 all *-from/filter files are delimited by 0s
         --address=ADDRESS       bind address for outgoing socket to daemon
         --port=PORT             specify double-colon alternate port number
         --sockopts=OPTIONS      specify custom TCP options
         --blocking-io           use blocking I/O for the remote shell
         --stats                 give some file-transfer stats
     -8, --8-bit-output          leave high-bit chars unescaped in output
     -h, --human-readable        output numbers in a human-readable format
     -P                          same as --partial --progress
     -i, --itemize-changes       output a change-summary for all updates
         --out-format=FORMAT     output updates using the specified FORMAT
         --log-file=FILE         log what we're doing to the specified FILE
         --log-file-format=FMT   log updates using the specified FMT
         --password-file=FILE    read password from FILE
         --list-only             list the files instead of copying them
         --bwlimit=KBPS          limit I/O bandwidth; KBytes per second
         --write-batch=FILE      write a batched update to FILE
         --only-write-batch=FILE like --write-batch but w/o updating destination
         --read-batch=FILE       read a batched update from FILE
         --protocol=NUM          force an older protocol version to be used
     -E, --extended-attributes   copy extended attributes
         --cache                 disable fcntl(F_NOCACHE)
     -4, --ipv4                  prefer IPv4
     -6, --ipv6                  prefer IPv6
         --version               print version number
    (-h) --help                  show this help (-h works with no other options)



## Tips

* `必须`提供SRC参数，DEST为`可选`参数
* 只提供SRC参数的情况下，如`rsync dest`，则等同于`ls -la dest`。mac下，dest如果为本地目录，则需要加`-r`选项，否则会被自动跳过
* SRC或DEST参数的末尾`/`具有特殊含义：

        # 列出文件本身 
        $ rsync user@172.50.6.77:/home/user/tmp
        drwxrwxr-x        4096 2018/12/12 14:43:56 tmp

        # 列出目录内容 
        $ rsync user@172.50.6.77:/home/user/tmp/
        drwxrwxr-x        4096 2018/12/12 14:43:56 .
        -rw-rw-r--           6 2018/12/12 14:43:56 .abc
        -rw-rw-r--         206 2018/08/09 12:26:34 b.lst
        -rw-rw-r--   127806767 2018/10/16 21:16:48 m.tar.gz
        -rw-rw-r--   127806767 2018/12/12 12:21:54 m1.tar.gz
        -rw-rw-r--   127806767 2018/12/12 12:21:58 m2.tar.gz
        -rw-rw-r--   127806767 2018/12/12 12:22:01 m3.tar.gz
        -rw-rw-r--   127806767 2018/12/12 12:22:05 m4.tar.gz
        -rw-rw-r--         199 2018/08/02 15:39:33 package.json

        # 目录本身及其子目录内容都列出
        $ rsync -r user@172.50.6.77:/home/user/tmp



## Examples

### 同步tmp目录

    admin@172.17.10.24 ~$ rsync -rv tmp 172.17.10.41:/home/admin
    sending incremental file list
    tmp/
    tmp/a.lst
    tmp/b.lst
    tmp/m.tar.gz
    tmp/m1.tar.gz
    tmp/m2.tar.gz
    tmp/m3.tar.gz
    tmp/m4.tar.gz
    tmp/package.json

    sent 639112808 bytes  received 168 bytes  98325073.23 bytes/sec
    total size is 639034275  speedup is 1.00
    admin@172.17.10.24 ~$ rsync -rv tmp 172.17.10.41:/home/admin
    sending incremental file list
    tmp/a.lst
    tmp/b.lst
    tmp/m.tar.gz
    tmp/m1.tar.gz
    tmp/m2.tar.gz
    tmp/m3.tar.gz
    tmp/m4.tar.gz
    tmp/package.json

    sent 226650 bytes  received 395928 bytes  138350.67 bytes/sec
    total size is 639034275  speedup is 1026.43

* 默认使用`checksum相关算法`，相同文件不再重传
* 以上提示，可以发现第二次调用，sent的数据量从第一次的`639112808`下降到了`226650`，速度提升`1026.43`







