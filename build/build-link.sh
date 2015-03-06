#!/bin/bash

FILE=$1
MT=`stat -f %m $FILE`

cat "$1" | grep -Eo "^# +.+" \
    | head -1 \
    | sed -e 's/^# *//g' \
    | awk -v file=$FILE -v mt=$MT \
        '{printf "<li><a href=\"%s.html\" data-mt=\"%s\">%s</a></li>\n", file, mt, $0}'

