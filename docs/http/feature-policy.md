# feature-policy

> This specification defines a mechanism that allows developers to selectively enable and disable use of various browser features and APIs.

## Resources
* MDN: <https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy>

## Features
* 一个HTTP Header，通过它可以让开发者选择性的开启或者关闭浏览器的某些特性或者API

## Browser Support
* <https://caniuse.com/#search=feature-policy>
* Chrome 60开始部分支持，Chrome 64开始可以通过开启`Experimental Web Platform features`来使用JS API
* Safari 11.1开始支持部分功能，目前只支持`allow`属性

## Syntax

    Feature-Policy: <directive> <allowlist>


### Examples

    Feature-Policy: vibrate 'none'; geolocation 'none'

### directives

    autoplay
    camera
    document-domain
    encrypted-media
    fullscreen
    geolocation
    microphone
    midi
    payment
    vr/xr

### allowlist

|\*             | The feature will be allowed in this document, and all nested browsing contexts (iframes) regardless of their origin.|
|'self'         | The feature will be allowed in this document, and in all nested browsing contexts (iframes) in the same origin.|
|'src'          | (In an iframe allow attribute only) The feature will be allowed in this iframe, as long as the document loaded into it comes from the same origin as the URL in the iframe's src attribute.|
|'none'         | The feature is disabled in top-level and nested browsing contexts.|
|`<origin(s)>`  | The feature is allowed for specific origins (for example, https://example.com). Origins should be separated by a space.|

