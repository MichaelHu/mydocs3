# 一些JS问题代码

## this误用

    var StringUtil = function() {
        this.LenB = function(str) {
            return str.replace(/[^\x00-\xff]/g, "**").length;
        }
        this.subStrg = function(str, size) {
            if (str == null) {
                return "";
            }
            if (LenB(str) > size) {
                var l = 0;
                var lStr = "";
                var c;
                for (var i = 0; i < str.length; i++) {
                    c = str.charAt(i);
                    l += LenB(c);
                    if (l >= size) {
                        lStr = str.substring(0, i + 1);
                        break;
                    }
                }
                lStr += "...";
                return lStr;
            } else {
                return str;
            }
        }
        return this;
    }();


## 你看出来了么？

    function IsPC() { 
        var userAgentInfo = navigator.userAgent; 
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod", "iOS"); 
        var flag = true; 
        for (var v = 0; v < Agents.length; v++) { 
            if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; } 
        } 
        return flag; 
    }
