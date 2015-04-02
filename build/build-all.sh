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

body {
    padding-top: 50px;
}

span.new-tag {
    color: #f00;
    font-size: 12px;
    font-variant: monospace;
    padding-left: 8px;
}

#file_count {
    margin-left: 10px;
    color: #fff;
}

</style>

<div class="list">

EOF
) > _header


(
# EOF: use parameter substitution
cat <<EOF

<nav class="navbar navbar-inverse navbar-fixed-top">
<div class="container">
<div class="navbar-header">
<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
<span class="sr-only">Toggle navigation</span>
<span class="icon-bar"></span>
<span class="icon-bar"></span>
<span class="icon-bar"></span>
</button>
<a class="navbar-brand" href="#">文章列表<span id="file_count" class="badge">${_file_count}</span></a>
</div>
<div id="navbar" class="navbar-collapse collapse">
<form class="navbar-form navbar-right">
<div class="form-group">
<input type="text" id="search" placeholder="Search" class="form-control">
</div>
</form>
</div><!--/.navbar-collapse -->
</div>
</nav>


<ul>

EOF
) >> _header





(
cat <<'EOF'

</ul>
</div>

<script>

var $list = $('.list ul'),
    $links = $('.list ul a');

(function(){
    var top5 = [];

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


(function(){

var rRegEscape = /[\\\[\]($){}*+.?-]/;

$('#search').on('input', function(){
    var text = $(this).val(),
        reg = new RegExp(text.replace(rRegEscape, '\\$&'), 'ig'),
        reg1 = new RegExp(text.replace(rRegEscape, '\\$&'), 'i'),
        count = 0;

    $links.each(function(index, item){
        var $link = $(item);
        if( reg1.test( $link.text() ) ) {
            $link.parent().show();
            count++;
        }
        else {
            $link.parent().hide();
        }
    });

    $('#file_count').html(count);

})
.on('keydown', function(e){
    e.stopPropagation();
})
;

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
