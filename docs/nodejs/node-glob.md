# node-glob

## Resources

* node-glob <https://github.com/isaacs/node-glob/blob/master/README.md> <iframe src="http://258i.com/gbtn.html?user=isaacs&repo=node-glob&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>



## Glob Primer

    *                               Matches 0 or more characters in a single path portion
    ?                               Matches 1 character
    [...]                           Matches a range of characters, similar to a RegExp range. 
                                    If the first character of the range is ! or ^ then it 
                                    matches any character not in the range.
    !(pattern|pattern|pattern)      Matches anything that does not match any of the patterns provided.
    ?(pattern|pattern|pattern)      Matches zero or one occurrence of the patterns provided.
    +(pattern|pattern|pattern)      Matches one or more occurrences of the patterns provided.
    *(a|b|c)                        Matches zero or more occurrences of the patterns provided
    @(pattern|pat*|pat?erN)         Matches exactly one of the patterns provided
    **                              If a "globstar" is alone in a path portion, then it matches 
                                    zero or more directories and subdirectories searching 
                                    for matches. It does not crawl symlinked directories.


## Dots

    a/.*/c                          a/.b/c
    a/*/c                           a/b/c



