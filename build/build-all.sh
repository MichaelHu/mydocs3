#!/bin/bash

ROOT=/Users/hudamin/projects/git/mydocs
DOCDIR=$ROOT/docs
DISTDIR=$ROOT/dist

cd $ROOT

rm -rf __tmp
mkdir -p __tmp/docs
# preserve modification time
cp -rp $DOCDIR/* __tmp/docs

pushd __tmp/docs

find . -type f \
    -name "*.md.preview.html" \
    -exec rm -f {} \;


# set _file_count
find . -type f -mindepth 2 -name "*.md" > _file_list 
cat _file_list
_file_count=$(wc -l _file_list | awk '{print $1}')


# get links and save into _list file
find . -type f -mindepth 2 -name "*.md" \
    -exec sh $ROOT/build/build-link.sh {} >> _list \;




(
# 'EOF' no substitution
cat <<'EOF'

<script>
    $('#nav').hide();
</script>

<style type="text/css">

@import url("./markdown_res/css/index.css");

span.new-tag {
    color: #f00;
    font-size: 12px;
    font-variant: monospace;
    padding-left: 8px;
}

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

<script>
(function(){
    var $list = $('.list ul'),
        $links = $('.list ul a'),
        top5 = [];

    $links.each(function(index, item){
        var $link = $(item);

        if(!top5.length) top5.push({mt: $link.data('mt'), link: $link});
        for(var i=0; i<top5.length; i++){
            if(top5[i].mt - 0 < $link.data('mt') - 0){
                top5.splice(i, 0, {mt: $link.data('mt'), link: $link});
                break;
            }
        }
    });

    if(top5.length > 5){
        top5.length = 5;
    }

    $.each(top5, function(index, item){
        item.link.append('<span class="new-tag">NEW</span>');
    });

})();
</script>

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
