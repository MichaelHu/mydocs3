# OpenSSL介绍


## https服务器

### 使用openssl命令生成SSL证书的步骤

    #!/bin/bash
    
    
    ## 1. ssl.key
    openssl genrsa -des3 -out ssl.key 1024
    
    mv ssl.key xxx.key
    openssl rsa -in xxx.key -out ssl.key
    rm xxx.key
    
    
    ## 2. ssl.csr
    openssl req -new -key ssl.key -out ssl.csr
    
    
    ## 3. ssl.crt
    openssl x509 -req -days 365 -in ssl.csr -signkey ssl.key -out ssl.crt
    
    
    ## 4. ssl.pfx [ Optional ]
    openssl pkcs12 -export -inkey ssl.key -in ssl.crt -out ssl.pfx


### 最终生成如下文件

    ssl.key ssl.csr ssl.crt ssl.pfx


### nginx配置

todo


### apache配置

> 仅供参考，获取自互联网。

#### 编辑Apache的ssl.conf

1. 指定服务器证书位置

        SSLCertificateFile <path-to-certificates>/servercert.pem

2. 指定服务器证书key位置

        SSLCertificateKeyFile <path-to-certificates>/serverkey.pem

3. 证书目录

        SSLCACertificatePath <path-to-certificates>

4. 根证书位置

        SSLCACertificateFile <path-to-certificates>/cacert.pem

5. 开启客户端SSL请求

        SSLVerifyClient require
        SSLVerifyDepth 1 

#### 启动ssl

    apachectl startssl

会要求输入`server.key`的密码




## openssl的日常加密传输

参考: <ref://../shell/linuxshell.md.html>

