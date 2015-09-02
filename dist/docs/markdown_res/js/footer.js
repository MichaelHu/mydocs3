(function(){

document.title = $('h1').html() || '技术文档－258i.com';    

$(document).on('keydown', function(e){
    var BACKSPACE = 8,
        SLASH = 191,
        KEY_K = 75,
        LEFT = 37;

    if ( BACKSPACE == e.keyCode
        || BACKSPACE == e.which
        || LEFT == e.keyCode
        || LEFT == e.which){
        if( !/(preview|index)\.md\.html/.test( location.pathname ) ) {
            history.back();
        }
        // Prevent default action which is taken automatically by browser.
        e.preventDefault();
    }

});

})();

