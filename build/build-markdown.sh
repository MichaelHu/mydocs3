MARKDOWN=/Users/hudamin/bin/markdown

echo "parsing $1"

TMPFILE=$1.__tmp__
cp "$1" "$TMPFILE"
echo >> "$TMPFILE"

$MARKDOWN "$TMPFILE" \
    | cat ./markdown_res/header.tpl.html - ./markdown_res/footer.tpl.html \
    > "$1".html

rm "$1" "$TMPFILE"
