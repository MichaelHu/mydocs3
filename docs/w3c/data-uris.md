# data-uris

RFC 2397: <https://tools.ietf.org/html/rfc2397>

## Format

    data:[<mediatype>][;base64],<data>

`syntax`: 

    dataurl    := "data:" [ mediatype ] [ ";base64" ] "," data
    mediatype  := [ type "/" subtype ] *( ";" parameter )
    data       := *urlchar
    parameter  := attribute "=" value
