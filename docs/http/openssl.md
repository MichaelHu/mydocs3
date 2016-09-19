# OpenSSL介绍


## 使用openssl命令生成SSL证书的步骤

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


## 最终生成如下文件

    ssl.key ssl.csr ssl.crt ssl.pfx


## nginx配置



