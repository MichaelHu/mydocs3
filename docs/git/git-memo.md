# git使用备忘

## ssh访问

1. 本地机器上生成SSH Key

    1. 先查看是否存在`~/.ssh`，该目录下存在两个文件
            
            id_rsa
            id_rsa.pub

        一个秘钥，一个公钥。如果已经存在，直接进入第二步，否则运行以下命令：

            $ ssh-keygen -t rsa

2. 将生成的公钥`id_rsa.pub`的内容复制到github上的用户设置之`SSH keys`
3. 测试是否添加成功：

        $ ssh -T git@github.com
        The authenticity of host 'github.com (192.30.252.128)' can't be established.
        RSA key fingerprint is 16:22:ac:a5:76:88:2d:36:63:1b:56:4d:eb:df:a2:48.
        Are you sure you want to continue connecting (yes/no)? yes
        Warning: Permanently added 'github.com,192.30.252.128' (RSA) to the list of known hosts.
        Hi MichaelHu! You've successfully authenticated, but GitHub does not provide shell access.

    以上显示已经添加成功



