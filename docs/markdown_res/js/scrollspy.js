/*
 * JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/* global define */

;(function ($) {
  'use strict'

  /*
  * Add integers, wrapping at 2^32. This uses 16-bit operations internally
  * to work around bugs in some JS interpreters.
  */
  function safeAdd (x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF)
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
    return (msw << 16) | (lsw & 0xFFFF)
  }

  /*
  * Bitwise rotate a 32-bit number to the left.
  */
  function bitRotateLeft (num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt))
  }

  /*
  * These functions implement the four basic operations the algorithm uses.
  */
  function md5cmn (q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b)
  }
  function md5ff (a, b, c, d, x, s, t) {
    return md5cmn((b & c) | ((~b) & d), a, b, x, s, t)
  }
  function md5gg (a, b, c, d, x, s, t) {
    return md5cmn((b & d) | (c & (~d)), a, b, x, s, t)
  }
  function md5hh (a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t)
  }
  function md5ii (a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | (~d)), a, b, x, s, t)
  }

  /*
  * Calculate the MD5 of an array of little-endian words, and a bit length.
  */
  function binlMD5 (x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << (len % 32)
    x[(((len + 64) >>> 9) << 4) + 14] = len

    var i
    var olda
    var oldb
    var oldc
    var oldd
    var a = 1732584193
    var b = -271733879
    var c = -1732584194
    var d = 271733878

    for (i = 0; i < x.length; i += 16) {
      olda = a
      oldb = b
      oldc = c
      oldd = d

      a = md5ff(a, b, c, d, x[i], 7, -680876936)
      d = md5ff(d, a, b, c, x[i + 1], 12, -389564586)
      c = md5ff(c, d, a, b, x[i + 2], 17, 606105819)
      b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330)
      a = md5ff(a, b, c, d, x[i + 4], 7, -176418897)
      d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426)
      c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341)
      b = md5ff(b, c, d, a, x[i + 7], 22, -45705983)
      a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416)
      d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417)
      c = md5ff(c, d, a, b, x[i + 10], 17, -42063)
      b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162)
      a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682)
      d = md5ff(d, a, b, c, x[i + 13], 12, -40341101)
      c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290)
      b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329)

      a = md5gg(a, b, c, d, x[i + 1], 5, -165796510)
      d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632)
      c = md5gg(c, d, a, b, x[i + 11], 14, 643717713)
      b = md5gg(b, c, d, a, x[i], 20, -373897302)
      a = md5gg(a, b, c, d, x[i + 5], 5, -701558691)
      d = md5gg(d, a, b, c, x[i + 10], 9, 38016083)
      c = md5gg(c, d, a, b, x[i + 15], 14, -660478335)
      b = md5gg(b, c, d, a, x[i + 4], 20, -405537848)
      a = md5gg(a, b, c, d, x[i + 9], 5, 568446438)
      d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690)
      c = md5gg(c, d, a, b, x[i + 3], 14, -187363961)
      b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501)
      a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467)
      d = md5gg(d, a, b, c, x[i + 2], 9, -51403784)
      c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473)
      b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734)

      a = md5hh(a, b, c, d, x[i + 5], 4, -378558)
      d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463)
      c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562)
      b = md5hh(b, c, d, a, x[i + 14], 23, -35309556)
      a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060)
      d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353)
      c = md5hh(c, d, a, b, x[i + 7], 16, -155497632)
      b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640)
      a = md5hh(a, b, c, d, x[i + 13], 4, 681279174)
      d = md5hh(d, a, b, c, x[i], 11, -358537222)
      c = md5hh(c, d, a, b, x[i + 3], 16, -722521979)
      b = md5hh(b, c, d, a, x[i + 6], 23, 76029189)
      a = md5hh(a, b, c, d, x[i + 9], 4, -640364487)
      d = md5hh(d, a, b, c, x[i + 12], 11, -421815835)
      c = md5hh(c, d, a, b, x[i + 15], 16, 530742520)
      b = md5hh(b, c, d, a, x[i + 2], 23, -995338651)

      a = md5ii(a, b, c, d, x[i], 6, -198630844)
      d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415)
      c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905)
      b = md5ii(b, c, d, a, x[i + 5], 21, -57434055)
      a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571)
      d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606)
      c = md5ii(c, d, a, b, x[i + 10], 15, -1051523)
      b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799)
      a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359)
      d = md5ii(d, a, b, c, x[i + 15], 10, -30611744)
      c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380)
      b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649)
      a = md5ii(a, b, c, d, x[i + 4], 6, -145523070)
      d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379)
      c = md5ii(c, d, a, b, x[i + 2], 15, 718787259)
      b = md5ii(b, c, d, a, x[i + 9], 21, -343485551)

      a = safeAdd(a, olda)
      b = safeAdd(b, oldb)
      c = safeAdd(c, oldc)
      d = safeAdd(d, oldd)
    }
    return [a, b, c, d]
  }

  /*
  * Convert an array of little-endian words to a string
  */
  function binl2rstr (input) {
    var i
    var output = ''
    var length32 = input.length * 32
    for (i = 0; i < length32; i += 8) {
      output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF)
    }
    return output
  }

  /*
  * Convert a raw string to an array of little-endian words
  * Characters >255 have their high-byte silently ignored.
  */
  function rstr2binl (input) {
    var i
    var output = []
    output[(input.length >> 2) - 1] = undefined
    for (i = 0; i < output.length; i += 1) {
      output[i] = 0
    }
    var length8 = input.length * 8
    for (i = 0; i < length8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32)
    }
    return output
  }

  /*
  * Calculate the MD5 of a raw string
  */
  function rstrMD5 (s) {
    return binl2rstr(binlMD5(rstr2binl(s), s.length * 8))
  }

  /*
  * Calculate the HMAC-MD5, of a key and some data (raw strings)
  */
  function rstrHMACMD5 (key, data) {
    var i
    var bkey = rstr2binl(key)
    var ipad = []
    var opad = []
    var hash
    ipad[15] = opad[15] = undefined
    if (bkey.length > 16) {
      bkey = binlMD5(bkey, key.length * 8)
    }
    for (i = 0; i < 16; i += 1) {
      ipad[i] = bkey[i] ^ 0x36363636
      opad[i] = bkey[i] ^ 0x5C5C5C5C
    }
    hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
    return binl2rstr(binlMD5(opad.concat(hash), 512 + 128))
  }

  /*
  * Convert a raw string to a hex string
  */
  function rstr2hex (input) {
    var hexTab = '0123456789abcdef'
    var output = ''
    var x
    var i
    for (i = 0; i < input.length; i += 1) {
      x = input.charCodeAt(i)
      output += hexTab.charAt((x >>> 4) & 0x0F) +
      hexTab.charAt(x & 0x0F)
    }
    return output
  }

  /*
  * Encode a string as utf-8
  */
  function str2rstrUTF8 (input) {
    return unescape(encodeURIComponent(input))
  }

  /*
  * Take string arguments and return either raw or hex encoded strings
  */
  function rawMD5 (s) {
    return rstrMD5(str2rstrUTF8(s))
  }
  function hexMD5 (s) {
    return rstr2hex(rawMD5(s))
  }
  function rawHMACMD5 (k, d) {
    return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d))
  }
  function hexHMACMD5 (k, d) {
    return rstr2hex(rawHMACMD5(k, d))
  }

  function md5 (string, key, raw) {
    if (!key) {
      if (!raw) {
        return hexMD5(string)
      }
      return rawMD5(string)
    }
    if (!raw) {
      return hexHMACMD5(key, string)
    }
    return rawHMACMD5(key, string)
  }

  if (typeof define === 'function' && define.amd) {
    define(function () {
      return md5
    })
  } else if (typeof module === 'object' && module.exports) {
    module.exports = md5
  } else {
    $.md5 = md5
  }
}(this));


/**
 * Create navigation list automatically, updated by hudamin
 * @require jQuery
 * @thanks liguang
 */
(function($){

    if(/\/(?:(?:index|preview)\.md\.html)?([?#].*)?$/.test(location.href)){
        return;
    }

    if( $().scrollspy ){

        var selector = window.scroll_selector || "h2"
            , pre = "nav_";
            
        var list = $(selector)
                .add("h3")
                .add("h4")
                .add("h5")
                .add("h6")
            , $li = null
            , $ul = $('<ul class="nav"></ul>')
            , levelIndices = [0, 0, 0, 0, 0]

            // 上下文标题文本列表
            , contextTextList = {};
            ;

        contextTextList[ 'main' ] = $( 'h1' ).text();

        function normalizeItem(item){
            var $item = $(item)
                , tag = $item[0].tagName
                , txt = $item.text()
                , tmpArr
                , index, parentIndex
                ;
            
            switch(tag){

                case 'H2':
                    levelIndices[0]++;
                    if(!/^\s*[一二三四五六七八九十]+、/.test(txt)){
                        $item.text(toCHNNumber(levelIndices[0]) + '、' + $item.text());
                    }
                    levelIndices[1] = 0;
                    levelIndices[2] = 0;
                    levelIndices[3] = 0;
                    levelIndices[4] = 0;
                    index = levelIndices.slice( 0, 1 ).join( '.' );
                    contextTextList[ index ] = txt;
                    $item.data( 'category-index', index );
                    break;
                case 'H3':
                    if(!/^\s*[1-9][0-9]*\.[1-9][0-9]*\s+/.test(txt)){
                        levelIndices[1]++;
                        tmpArr = levelIndices.slice( 0, 2 );
                        /**
                         * 1. 父级标题可能不存在
                         * 2. 父级标题不存在的情况下，不计算层级索引
                         */
                        if ( tmpArr.indexOf( 0 ) < 0 ) {
                            $item.text(
                                tmpArr.join('.') + ' '
                                + $item.text()
                            );
                            levelIndices[2] = 0;
                            levelIndices[3] = 0;
                            levelIndices[4] = 0;
                            index = tmpArr.join( '.' );
                            parentIndex = index.replace( /\.\d+$/, '' );
                            contextTextList[ index ] = contextTextList[ parentIndex ] + ' - ' + txt;
                            $item.data( 'category-index', index );
                        }
                        else {
                            levelIndices[1]--;
                        }
                    }
                    break;
                case 'H4':
                    if(!/^\s*(?:[1-9][0-9]*\.){2}[1-9][0-9]*\s+/.test(txt)){
                        levelIndices[2]++;
                        tmpArr = levelIndices.slice( 0, 3 );
                        if ( tmpArr.indexOf( 0 ) < 0 ) {
                            $item.text(
                                tmpArr.join('.') + ' '
                                + $item.text()
                            );
                            levelIndices[3] = 0;
                            levelIndices[4] = 0;
                            index = tmpArr.join( '.' );
                            parentIndex = index.replace( /\.\d+$/, '' );
                            contextTextList[ index ] = contextTextList[ parentIndex ] + ' - ' + txt;
                            $item.data( 'category-index', index );
                        }
                        else {
                            levelIndices[2]--;
                        }
                    }
                    break;
                case 'H5':
                    if(!/^\s*(?:[1-9][0-9]*\.){3}[1-9][0-9]*\s+/.test(txt)){
                        levelIndices[3]++;
                        tmpArr = levelIndices.slice( 0, 4 );
                        if ( tmpArr.indexOf( 0 ) < 0 ) {
                            $item.text(
                                tmpArr.join('.') + ' '
                                + $item.text()
                            );
                            levelIndices[4] = 0;
                            index = tmpArr.join( '.' );
                            parentIndex = index.replace( /\.\d+$/, '' );
                            contextTextList[ index ] = contextTextList[ parentIndex ] + ' - ' + txt;
                            $item.data( 'category-index', index );
                        }
                        else {
                            levelIndices[3]--;
                        }
                    }
                    break;
                case 'H6':
                    if(!/^\s*(?:[1-9][0-9]*\.){4}[1-9][0-9]*\s+/.test(txt)){
                        levelIndices[4]++;
                        tmpArr = levelIndices.slice( 0 );
                        if ( tmpArr.indexOf( 0 ) < 0 ) {
                            $item.text(
                                tmpArr.join('.') + ' '
                                + $item.text()
                            );
                            index = tmpArr.join( '.' );
                            parentIndex = index.replace( /\.\d+$/, '' );
                            contextTextList[ index ] = contextTextList[ parentIndex ] + ' - ' + txt;
                            $item.data( 'category-index', index );
                        }
                        else {
                            levelIndices[4]--;
                        }
                    }
                    break;
            }
        }

        function toCHNNumber(num){
            var ret = ''
                , decade
                , unit
                , decadeArr = [
                    ''
                    , '十'
                    , '二十'
                    , '三十'
                    , '四十'
                    , '五十'
                    , '六十'
                    , '七十'
                    , '八十'
                    , '九十'
                ]
                , unitArr = [
                    ''
                    , '一'
                    , '二'
                    , '三'
                    , '四'
                    , '五'
                    , '六'
                    , '七'
                    , '八'
                    , '九'
                ]
                ;

            if(!num || num >= 100){
                return num;
            }
            decade = Math.floor(num / 10); 
            unit = num % 10; 
            ret += decadeArr[decade] + unitArr[unit]; 

            return ret;
        } 

        /**
         * 1. 为分级标题获取包含上下文的文本内容
         * 2. 包含上下文的文本内容大部分情况下具有全局唯一性
         * 3. 全局唯一性文本可用于生成锚点id
         * 4. 有些标题由于不存在父级标题，不存在上下文文本内容，可使用其自身文本
         */
        function getContextText( item ) {
            var categoryIndex = $( item ).data( 'category-index' );
            if ( categoryIndex ) {
                return contextTextList[ categoryIndex ];
            }
            else {
                return $( item ).text();
            }
        }

        list.each(function(i, item){
            normalizeItem(item);
        });

        list.each(function(i, item){
            var contextText = getContextText( item );
            var categoryIndex = $( item ).data( 'category-index' );
            var id = 'anchor_' + md5( contextText ).substr( 0, 5 );

            $li = $("<li></li>");
            $(item).attr("id", id);
            if($(item)[0].tagName == "H3"){
                $li.css({"text-indent":"1em"})
            }
            else if($(item)[0].tagName == "H4"){
                $li.css({"text-indent":"2em"})
            }
            else if($(item)[0].tagName == "H5"){
                $li.css({"text-indent":"3em"})
            }
            else if($(item)[0].tagName == "H6"){
                $li.css({"text-indent":"4em"})
            }
            
            $li.append(
                    '<a class="navbar-auto-link" href="#' + id
                    + '" data-rel-id="' + id + '">'
                    + $(item).text() + "</a>"
                )
                .data( 
                    'category-index'
                    , categoryIndex 
                )
                ;

            $ul.append($li);
        });
        
        var isShiftKey = false;
        var $navbar = $("<div></div>").attr("id", "navbar-auto")
            .append($ul)
            .append(
                [
                '<div class="navi">'
                , '<div class="arrow up"></div>'
                , '<div class="arrow down"></div>'
                , '</div>'         
                ].join('')
            )
            .on('click', function(e){
                var $target = $(e.target)
                    , $link = $target.closest( 'a' )
                    , anchorId
                    ;

                if(e.shiftKey){
                    isShiftKey = true;
                }
                else{
                    isShiftKey = false;
                }

                if($link.length){
                    e.preventDefault();
                    $link = $target.closest('a'); 
                    if($link[0].protocol == 'file:'){
                        anchorId = $link.data('rel-id');
                        $('#' + anchorId)[0].scrollIntoView();
                        return;
                    }
                    location.replace($link.attr('href'));
                }
            });
        
        /**
         * 1. shift + click 点击导航链接时，自动将链接信息文本设置到clipboard
         * 2. isShiftKey用于传递当前是否按下shift按键
         * 3. ClipboardJS的API不提供event对象，需要isShiftKey来传递事件信息
         */
        if ( window.ClipboardJS ) {
            new ClipboardJS( '.navbar-auto-link', {
                text: function( trigger ) {
                    var $target = $(trigger)
                        , $link = $target.closest( 'a' )
                        , categoryIndex
                        , contextText
                        , anchorId
                        ;

                    if($link.length){
                        anchorId = $link.data('rel-id');
                        categoryIndex = $link.parent().data( 'category-index' );
                        contextText = contextTextList[ categoryIndex ] || $link.text();
                        var infoText = '`「 ' + contextText + ' 」`: ' + '<ref://#' + anchorId + '>';

                        console.log( infoText );

                        // 无返回值，则不设置clipboard
                        if ( isShiftKey ) {
                            isShiftKey = false;
                            return infoText;
                        }
                    }
                }
            } );
        }

        var activeScrolling = 0
            , deltaY = 0
            , timer
            ;

        $navbar.find('.arrow')
            .on('mouseover', function(e){
                if(activeScrolling){
                    return;
                }

                activeScrolling = 1;
                $(this).addClass('active');
                if($(this).hasClass('up')){
                    deltaY = -100;
                } 
                else {
                    deltaY = 100;
                }
                scrolling();
            })
            .on('click', function(e){
                var cont = $navbar[0];

                activeScrolling = 0;
                deltaY = 0;
                e.preventDefault();
                e.stopPropagation();

                if(timer) {
                    clearTimeout( timer );
                }

                if($(this).hasClass('up')){
                    cont.scrollTop = 0;
                } 
                else {
                    cont.scrollTop = cont.scrollHeight - cont.offsetHeight;
                }
            })
            .on('mouseout', function(e){
                $(this).removeClass('active');
                activeScrolling = 0;
                deltaY = 0;
                if(timer){
                    clearTimeout( timer );
                }
            })
            ;

        function scrolling() {
            _scrolling();
        } 

        function _scrolling() {
            $navbar[ 0 ].scrollTop += deltaY; 
            if( activeScrolling ) {
                timer = setTimeout( _scrolling, 200 );
            }
        }
        $('body')
            .prepend($navbar)
            .scrollspy({ target: '#navbar-auto' })
            .on('activate.bs.scrollspy', function (dd) {
                var $target = $(dd.target).closest('li'),
                    $cont = $target.closest('#navbar-auto'),
                    offsetTop = $target[0].offsetTop,
                    scrollTop = $cont[0].scrollTop,
                    contHeight = $cont[0].offsetHeight,
                    scrollHeight = $cont[0].scrollHeight;

                // console.log(offsetTop, scrollTop, contHeight, scrollHeight);
                if (offsetTop - scrollTop < 50) {
                    $cont[0].scrollTop = offsetTop - 50;
                }
                else if (offsetTop - contHeight - scrollTop > -80) {
                    $cont[0].scrollTop = offsetTop - contHeight + 80;
                }  
            });
    }

    
})(jQuery);

