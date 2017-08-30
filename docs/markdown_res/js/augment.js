( function() {

    $( 'img' ).on( 'click', function( e ) {
        var $img = $( e.target )
            , imgSrc = $img.attr( 'src' );
        if ( imgSrc ) {
            location.href = imgSrc;
        }
    } );

} )();
