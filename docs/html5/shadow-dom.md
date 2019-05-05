# shadow-dom

<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>


## Resources

* web-components <ref://./web-components.md.html>
* w3c shadow dom: <https://www.w3.org/TR/shadow-dom/>
* [ 151109 ] **createShadowRoot()** is `deprecated` <https://github.com/webcomponents/hello-world-element/issues/11>
* [ 140708 ] HTML5 `<template>`标签元素简介 <https://www.zhangxinxu.com/wordpress/2014/07/hello-html5-template-tag/>
* [ 131111 ] A Guide to Web Components <https://css-tricks.com/modular-future-web-components/>
    > template, shadow-dom, shadow-host, shadow-root, shadow-boundary, insertion points, custom elements

## Features 

* 宿主元素下可以有一个与外部document隔离的DOM树，以`#shadow-root`为根节点



## Examples

### simple shadow-root

<div id="test_shadow_root_simple_1" class="test">
<div class="test-container">

    @[data-script="html"]
    <div class="shadow-host-simple">Hello, world!</div>
    <style type="text/css">
    /* todo */
    </style>

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>

<div id="test_shadow_root_simple_2" class="test">
<div class="test-container">

    @[data-script="javascript"](function(){

        var s = fly.createShow('#test_shadow_root_simple_2');
        var shadowHost = document.querySelector('.shadow-host-simple');
        var shadowRoot = shadowHost.attachShadow({mode: 'open'});

        shadowRoot.innerHTML = '<p class="shadow-root-son">I\'m from shadow dom!</p>';
    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>


