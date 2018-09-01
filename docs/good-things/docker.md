# docker

> Docker is the world's leading software containerization platform. <img src="./svg/docker-logo.svg" style="background-color:#3da4df; padding:3px; border-radius:3px;" height="38">


## Resources

* site: <https://www.docker.com/>
* github: <https://github.com/docker/docker> 目前已下架开源
* 百科：<http://baike.baidu.com/link?url=p27s5XUET9gYAKEtLfu06npZe7jJRhpWxpvipvC_gu3KVEk6BGUFmkE6DKrj4Zvh05UWoFEEi3PUuLcoffkiga>
* docker之`Dockerfile`实践 <https://www.cnblogs.com/jsonhc/p/7767669.html>
* [Docker] Centos 基于`lxcfs`增强 Docker 隔离能力 <https://blog.csdn.net/shida_csdn/article/details/79196258>


## Features

* `BUILD`, `SHIP`, `RUN`
* 开源应用容器引擎，打包应用及其依赖包到一个可移植的容器中，然后发布至任何流行的Linux机器上，也可实现虚拟化
* 容器是完全使用沙箱机制，相互之间不会有任何接口
* `Paas`提供商`dotCloud`开源的一个基于`LXC`的高级`容器引擎`，源代码托管与Github，基于`go语言`并遵从Apache2.0开源协议

## Dockerfile

### 一个例子

包含配置依赖库安装、nginx安装、端口映射等。

    # base image
    FROM centos
    
    # MAINTAINER
    MAINTAINER json_hc@163.com
    
    # put nginx-1.12.2.tar.gz into /usr/local/src and unpack nginx
    ADD nginx-1.12.2.tar.gz /usr/local/src
    
    # running required command
    RUN yum install -y gcc gcc-c++ glibc make autoconf openssl openssl-devel
    RUN yum install -y libxslt-devel -y gd gd-devel GeoIP GeoIP-devel pcre pcre-devel
    RUN useradd -M -s /sbin/nologin nginx
    
    # mount a dir to container
    ONBUILD VOLUME ["/data"]
    
    # change dir to /usr/local/src/nginx-1.12.2
    WORKDIR /usr/local/src/nginx-1.12.2
    
    # execute command to compile nginx
    RUN ./configure --user=nginx --group=nginx --prefix=/usr/local/nginx --with-file-aio  --with-http_ssl_module  --with-http_realip_module    --with-http_addition_module    --with-http_xslt_module   --with-http_image_filter_module    --with-http_geoip_module  --with-http_sub_module  --with-http_dav_module --with-http_flv_module    --with-http_mp4_module --with-http_gunzip_module  --with-http_gzip_static_module  --with-http_auth_request_module  --with-http_random_index_module   --with-http_secure_link_module   --with-http_degradation_module   --with-http_stub_status_module && make && make install
    
    # setup PATH
    ENV PATH /usr/local/nginx/sbin:$PATH
    
    # EXPOSE
    EXPOSE 80
    
    # the command of entrypoint
    ENTRYPOINT ["nginx"]
    
    CMD ["-g"]

