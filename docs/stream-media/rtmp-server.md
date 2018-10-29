# rtmp-server

## 安装ffmpeg

### 依赖

    $ wget http://www.nasm.us/pub/nasm/releasebuilds/2.13.01/nasm-2.13.01.tar.xz
    $ tar -vxf nasm-2.13.01.tar.xz
    $ cd nasm-2.13.01
    $ ./configure
    $ make
    $ make install

    $ wget https://jaist.dl.sourceforge.net/project/lame/lame/3.100/lame-3.100.tar.gz

    $ git clone git://git.videolan.org/x264.git
    $ cd x264
    $ ./configure
    $ make -j8
    $ make install



### ffmpeg install

    $ yum install yasm
    $ wget http://ffmpeg.org/releases/ffmpeg-4.0.tar.gz
    $ tar xvzf ffmpeg-4.0.tar.gz
    $ cd ffmpeg-4.0
    $ ./configure --enable-gpl --enable-libx264
    $ make
    $ make install




## 安装nginx & nginx-rtmp


### install

    $ wget https://github.com/arut/nginx-rtmp-module/archive/master.zip
    $ unzip master.zip
    $ wget https://nginx.org/download/nginx-1.12.2.tar.gz
    $ tar xvzf nginx-1.12.2.tar.gz
    $ cd nginx-1.12.2
    $ ./configure --add-module=../nginx-rtmp-module-master
    $ make
    $ make install



### rmtp相关配置

    rtmp {

        server {
            listen 1935;
            chunk_size 4000;

            application hls {
                live on;
                hls on;
                # 根据实际情况修改
                hls_path /home/admin/www/hls;
                hls_fragment 5s;
            }
        }
    }

    server {
        listen  19999;

        location /hls {
            types {
                application/vnd.apple.mpegurl m3u8;
                video/mp2t ts;
            }
            root /home/admin/www;
            expires -1;
        }
    }


## 转换命令

    $ ffmpeg -i test.mp4 -c copy -map 0 -f segment -segment_list hls/test.m3u8 -segment_time 5 hls/test-%03d.ts

