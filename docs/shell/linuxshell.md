# Linux Shell Memo

hudamin 2014


## IO重定向

* 1 - stdout
* 2 - stderr
* & - stdout and stderr
* `>, >>, <, <<, &n, &-, /dev/null`

### Examples

> `>, >>, <, <<`与文件描述符（不是文件名）相连接的时候，注意`不能有空格`！文件描述符
> 若在右侧，需要添加`&`前缀。

描述符的重设置`作用范围`，使用`exec`是全局的，其他都是临时的。

1. basics

        1> filename
        1>> filename
        2> filename
        2>> filename
        &> filename
        &>> filename
        &> /dev/null

        # stderr 指向 stdout 
        2>&1

        0< filename
        < filename

        grep search-word < filename
        
2. `[j]<>filename` 

    打开文件用于读写，并将该文件赋值给描述符j。如果filename不存在，则创建之。
    如果没有提供描述符j，则默认使用0，即stdin

        echo 1234567890 > File
        exec 3<>File
        read -n 4<&3
        echo -n . >&3
        exec 3>&-
        cat File
    
3. 关闭文件描述符

        # 关闭输入描述符n
        n<&-

        # 关闭stdin
        0<&-
        <&-

        # 关闭输出描述符n
        n>&-

        # 关闭stdout
        1>&-
        >&-

        cat /etc/passwd >&-
        cat: standard output: Bad file descriptor

4. 多个IO重定向可合并

        command < input-file > output-file
        command1 | command2 | command3 > output-file


5. 多路输出流可重定向至一个文件

        ls -yz >> command.log 2>&1
            
    以上代码可将错误选项信息也输出到command.log。但是，以下代码却不可以，`注意区别`：

        ls -yz 2>&1 >> command.log

    `如果是管道，又是另一种情况了：`

        ls -yz | less 2>&1

    以上代码less中不会接收到错误信息，以下代码可以：

        ls -yz 2>&1 | less 

    具体原因暂不明白，注意区别。

6. `Child processes inherit open file descriptors. This is why pipes work`. To prevent 
    an fd from being inherited, close it.

    以下代码`只重定向`stderr到pipe：

        exec 3>&1
        ls -l 2>&1 >&3 3>&- | grep bad 3>&-
        exec 3>&-

