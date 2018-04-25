# bom


<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>


## window

    // properties:
    closed
    defaultStatus
    document
    history
    innerHeight
    innerWidth
    location
    name
    navigator
    opener
    outerHeight
    outerWidth
    pageXOffset
    pageYOffset
    screen
    parent
    self
    status
    top
    window
    screenLeft
    screenTop
    screenX
    screenY

    // methods:
    alert()
    blur()
    clearInterval()
    clearTimeout()
    close()
    confirm()
    createPopup()
    focus()
    moveBy()
    moveTo()

    /**
     * @param {string} [URL]
     * @param {string} [name]
     * @param {string} [features] - comma-separated string
     * @param {boolean} [replace]
     */ 
    open( URL, name, features, replace )
        features
        ===========================================
        channelmode
        directories
        fullscreen
        height
        left
        location
        menubar
        resizable
        scrollbars
        status
        titlebar
        toolbar
        top
        width
    print()
    prompt()
    resizeBy()
    resizeTo()
    scrollBy()
    scrollTo()
    setInterval()
    setTimeout()




## navigator

    field           value
    ==================================================================================================
    userAgent       Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36
    appCodeName     Mozilla      
    appVersion      5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36
    platform        MacIntel
    vendor          Google Inc.
    vendorSub       
    appName         Netscape
    product         Gecko
    productSub      20030107
    language
    languages
    onLine
    geolocation
    plugins
    mimeTypes
    getBattery
    permissions
    vibrate


## screen
## history
## location

各字段关系图：

    protocol    href                    origin
    hostname     |          host         |  
    port         |           |           |  
    pathname     |                          
    search       |                          
    hash         |                          

* 完整URL用`location.href`表示
* 将完整URL分割成`6个`部分，分别为protocol, hostname, prot, pathname, search, hash
* host包含`hostname + port`
* origin包含`protocol + host`
* host以及origin`都不包含`末尾的`斜线`，形如`http://www.258i.com`
* `search`为空字符串或者以`?`开头的字符串
* `hash`为空字符串或者以`#`开头的字符串

<div id="test_location" class="test">
<div class="test-container">

    @[data-script="javascript"](function(){

        var s = fly.createShow('#test_location');
        s.show( 'testing location ...' );

        var l = location;
        var comp = l.protocol 
            + '//'
            + l.hostname
            + ( l.port ? ':' : '' )
            + l.port
            + l.pathname
            + l.search
            + l.hash
            ;

        s.append_show( 'href', l.href );
        s.append_show( 'comp', comp );
        s.append_show( 'origin', l.origin );
        s.append_show( 'host', l.host );

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>
    


