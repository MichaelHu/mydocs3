#!/bin/bash

FILE=$1

cat "$1" | grep -Eo "^# +.+" \
    | head -1 \
    | sed -e 's/^# *//g' \
    | awk -v file=$FILE '{printf "<li><a href=\"%s.html\">%s</a></li>\n", file, $0}'

