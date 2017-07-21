# baidu-index

> 百度指数的防抓取策略

<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>



## Features

* 防抓取做得`比较严密`，常规抓取方法无法抓取
* 百度指数的数据做了动态加密，请求的关键字和返回数据都做了加密，而且这些返回数据`只是趋势数据而已`，而不是真实数据
* 请求同一数据，请求的时间不一样，返回的数据也不一样，应该是`加密方法带时间参数`
* 鼠标`hover`过某个点，`动态请求`后端，返回该点对应的数据，`不是文本格式`，而是`一段html代码以及加密的图片`，这部分代码插入DOM后，能拼出真实的指数数据

        @[data-script="html"]<style type="text/css">
        .view-value { height: 18px; margin-left: 30px; }
        .imgval { float: left; height: 14px; overflow: hidden; margin-bottom: -2px; }
        .imgtxt { height: 18px; }
        </style>
        <div class="view-value">
        <span class="imgval" style="width:5px;"><div class="imgtxt" style="margin-left:-8px;"></div></span>
        <span class="imgval" style="width:11px;"><div class="imgtxt" style="margin-left:-37px;"></div></span>
        <span class="imgval" style="width:8px;"><div class="imgtxt" style="margin-left:-96px;"></div></span>
        <span class="imgval" style="width:8px;"><div class="imgtxt" style="margin-left:-120px;"></div></span>
        <span class="imgval" style="width:8px;"><div class="imgtxt" style="margin-left:-192px;"></div></span>
        <span class="imgval" style="width:0px;"><div class="imgtxt" style="margin-left:-216px;"></div></span>
        <style>.view-value .imgval .imgtxt{background:url("data:application/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAANgAAAAOAQMAAAB3iUCcAAAABlBMVEVNTU3////fApp3AAAAwElEQVQYlbXQMWoDMRAF0M+gQkWKLUXYQoUPsKVZphg+wuQQqnQOocJHMDmFT5nR2pgUbv2lQswDoS/gEznDAhSbpp6UKwUDYx0rDL5NQCw8+WJ2E1iW7CAvO2Knw2yOsUutV8j1MHPbaxhmwbSifLf2i/Xm1rmNni4thN5DZ0MR8gaZ9sMvMpEhGoPf8d8K/ezviYsxTjtzGh/Gh+WnZbLdN96fHcgLo00jocpaFi1dE727cmccQ6PPvZlneftjf6BwOSlkKuqGAAAAAElFTkSuQmCC")}</style>
        </div>

* 其中真实返回的`混淆后的图片为`：<img src="data:application/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAANgAAAAOAQMAAAB3iUCcAAAABlBMVEVNTU3////fApp3AAAAwElEQVQYlbXQMWoDMRAF0M+gQkWKLUXYQoUPsKVZphg+wuQQqnQOocJHMDmFT5nR2pgUbv2lQswDoS/gEznDAhSbpp6UKwUDYx0rDL5NQCw8+WJ2E1iW7CAvO2Knw2yOsUutV8j1MHPbaxhmwbSifLf2i/Xm1rmNni4thN5DZ0MR8gaZ9sMvMpEhGoPf8d8K/ezviYsxTjtzGh/Gh+WnZbLdN96fHcgLo00jocpaFi1dE727cmccQ6PPvZlneftjf6BwOSlkKuqGAAAAAElFTkSuQmCC">

    


## 数据接口

请求`冰毒`的百度指数页面：<http://index.baidu.com/?tpl=trend&word=%B1%F9%B6%BE>

页面会发起`AJAX请求`获取`冰毒`关键字相关的指数数据（`趋势数据，并非真实数据，而且是加密的`）：

    curl 'http://index.baidu.com/Interface/Search/getAllIndex/?res=Wi0wJyIBDB4UNRcHcyx3fhkXSEFjWXMWI1AKQDB0CCthGQUnUXoqJCQFJy4FUnVyCHceCFNYJycQLykOVEsQQDQvIlMyOnQkdhARVjQmN1k2BUYGQFEwBAxDIHUqI3QpXgMNJh5qPzwYaxIGHBITNEINHW52DGEEP2cSYzwrHTQHOR9%2FRiI3d2BxDxRIQxoELDRiBxM9AjcwNQYWc3wDCCV2Bk0AR1AHElkbPhBGMgYdQw9aInh9R1QSYGNONyBXOnsLAwADIDAnERIqKBRbcA%3D%3D&res2=63aPfV6POME9FovOtf0Pf6hqtcTteDYMcQa6xzsGZEbGFkdFLCI2410.993359.663&startdate=2017-06-20&enddate=2017-07-19' \
        -H 'Pragma: no-cache' \
        -H 'Accept-Encoding: gzip, deflate' \
        -H 'Accept-Language: zh-CN,zh;q=0.8,en;q=0.6' \
        -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36' \
        -H 'Accept: */*' \
        -H 'Referer: http://index.baidu.com/?tpl=trend&word=%B1%F9%B6%BE' \
        -H 'X-Requested-With: XMLHttpRequest' \
        -H 'Cookie: BIDUPSID=4D85D431E69804FEE35138E6EFB5FD6E; PSTM=1439435251; BDUSS=1ZxZVpuSmJFZVBaS3hoOExYSWwwbDJCTjI0cH4tTn5rUGRaUVJjanBkaTAzY05ZSVFBQUFBJCQAAAAAAAAAAAEAAADiAM8CMjU4aQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALRQnFi0UJxYd; MCITY=-179%3A; BAIDUID=C7CFAFD72D4453695EC6D012A7C1702D:FG=1; locale=zh; CHKFORREG=c9e5371929f4e5b289655288885a80ca; searchtips=1; bdshare_firstime=1500550491963; Hm_lvt_d101ea4d2a5c67dab98251f0b5de24dc=1500550476; Hm_lpvt_d101ea4d2a5c67dab98251f0b5de24dc=1500550880' \
        -H 'Connection: keep-alive' \
        -H 'Cache-Control: no-cache' \
        --compressed


* 同样的关键词，不同时间请求，其`res字段`部分也是变化的，res字段通过页面HTML打印在页面中
        <script type="text/javascript">
            BID.fnsDate.adjust = (PPval.ppt = 'EZABABxnEAZTdRgwIwBEXXdlVHRRAC8jADRLWRwDI1RQARdVNjFYcl4Mdyk6B0I5RiQ2dycPGSQISzoDamJ%2BVgU1HyJ4DxYjPDFMfmNmLRIUAi9ZE10jD3YSD0B%2BTyMPQA0kIgcNAGl0DDUcFygydj0HIws9FQEWH3w1Hj0lQwcRCVEGVSxAPV0hCjN3cigDJQxhASJUVAg2dABDQB8wYDE%2BHBYCcx0PVwp4JBctJDFxFQgiHWIsQ3UESHlidAF2Yn9bPx9tKy1YLX4JAGAWNB4%3D', PPval.status = '0' || '0', PPval.adjust);
            if(PPval.status == '301'){BID.vVerify();}
            </script>
* 请求的URL是有`生命周期`的，一段时间后会`失效`

以上请求得到的数据：

    {
        "data": {
            "all": [
                {
                    "key": "冰毒",
                    "period": "20110101|20170719",
                    "area": "0",
                    "areaName": "全国",
                    "ratio": {
                        "yoy_w": "-32",
                        "qoq_w": "-3",
                        "yoy_m": "-35",
                        "qoq_m": "0",
                        "agv_w_enc": "eG8",
                        "agv_m_enc": "1eM"
                    },
                    "userIndexes_enc": "0ej,Aff,HB,ekb,Jk,QR,Lf7,hm,0Fb,fZ5,NZ,fHb,OI,L9b,1J8,FI,9db,SI,0Ob,77I,eC5,V98,le5,eR8,Kf9,fR1,eV8,wk,N94,1fE",
                    "userIndexes_100": "0kL0kL0kL.kL.kL68L32L7kL81L.6L02L08L07L04L08L0.LkL0.L2L6L4L7L4L7L.L0L7L7L2L3",
                    "max_y": "roKP",
                    "min_y": "5og2",
                    "step_y": "roK",
                    "userIndexes_avg_100": "18",
                    "userIndexes_avg_enc": "17B"
                }
            ],
            "pc": [
                {
                    "key": "冰毒",
                    "period": "20060601|20170719",
                    "area": "0",
                    "areaName": "全国",
                    "ratio": {
                        "yoy_w": "-46",
                        "qoq_w": "1",
                        "yoy_m": "-42",
                        "qoq_m": "-9",
                        "agv_w_enc": "Eb",
                        "agv_m_enc": "i8"
                    },
                    "userIndexes_enc": "Qe,yb,171,1O,1O,H7,C7,fe9,7f7,Qf,ef1,tb,eL,Mb,j1,k1,H1,eD,U8,Hf,1k,if,Sf,fM,1Q,v8,e7b,Ob,7M,fe1",
                    "userIndexes_100": "63L62L63L64L64L48Lk.L36L70L71L.6LkL2L8.L88L80L02L.8L3L1L6L0kL0kL04L03L8L3L04L04L.0",
                    "max_y": "rKI",
                    "min_y": "42",
                    "step_y": "ho",
                    "userIndexes_avg_100": "30",
                    "userIndexes_avg_enc": "i8"
                }
            ],
            "wise": [
                {
                    "key": "冰毒",
                    "period": "20110101|20170719",
                    "area": "0",
                    "areaName": "全国",
                    "ratio": {
                        "yoy_w": "-29",
                        "qoq_w": "-4",
                        "yoy_m": "-33",
                        "qoq_m": "2",
                        "agv_w_enc": "F9b",
                        "agv_m_enc": "wk"
                    },
                    "userIndexes_enc": "ve8,7N1,efN,Nfb,Ac,WL,Q9f,OT,MO,7Xb,eI1,77I,ei8,jC,fK5,0l8,1T8,n78,LG,RR,tG,T3,KR,tm,vA,E91,jw,edR,m6,%e9",
                    "userIndexes_100": "07L04L04L.3L.3L6.L3kL72L.kL..L02L04L03L07L00L00LkL0.LkL4LkL7L4L7L0L.L2L7L2L3",
                    "max_y": "K9g",
                    "min_y": "roE",
                    "step_y": "r9",
                    "userIndexes_avg_100": "17",
                    "userIndexes_avg_enc": "wk"
                }
            ]
        },
        "status": "0",
        "message": ""
    }



## 自动抓取方案

### 思路

主要需要这几个步骤：`模拟浏览器操作、网页截图、图像识别（文字识别）、趋势数据获取、估算整体数据`

### 趋势数据获取

百度指数使用`raphael.js`作为渲染引擎，所以使用的是svg输出，可以从svg元素`path`的`d属性`中，获取趋势数据。


### 网友方案

网友提供的方案：

* 百度指数抓取，再用图像识别得到指数 <http://www.cnblogs.com/TTyb/p/6051366.html>，github项目：<https://github.com/TTyb/Baiduindex>
* 利用python+selenium_phantomjs批量获取百度指数 第二步 技术细节 <https://my.oschina.net/u/3280685/blog/903371>， github项目：<https://github.com/plus0318/BaiduInde>

