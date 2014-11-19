#!/bin/bash

ROOT=/Users/hudamin/projects/git/mydocs
DOCDIR=$ROOT/docs
DISTDIR=$ROOT/dist

cd $ROOT

rm -rf __tmp
mkdir -p __tmp/docs
cp -r $DOCDIR/* __tmp/docs

pushd __tmp/docs

find . -type f \
    -name "*.md.preview.html" \
    -exec rm -f {} \;


# set _file_count
find . -type f -name "*.md" > _file_list 
_file_count=$(wc -l _file_list | awk '{print $1}')


# get links and save into _list file
find . -type f -name "*.md" \
    -exec sh $ROOT/build/build-link.sh {} >> _list \;




(
# 'EOF' no substitution
cat <<'EOF'

<script>
    $('#nav').hide();
</script>

<style type="text/css">
@import url("./markdown_res/css/index.css")
</style>

<div class="title"><h1>我的技术文章</h1></div>

<div class="list">

EOF
) > _header


(
# EOF: use parameter substitution
cat <<EOF

## 预览列表［${_file_count}篇］

<ul>

EOF
) >> _header





(
cat <<'EOF'

</ul>
</div>
EOF
) > _footer


# generate preview.md file
cat _header _list _footer > preview.md
rm _header _list _footer




# do markdown parsing
find . -type f \
    -regex "\..*\.md" \
    -exec sh $ROOT/build/build-markdown.sh {} \;

cd ..
cp -r docs $DISTDIR 

popd

rm -rf __tmp
