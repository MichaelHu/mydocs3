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
<a class="navbar-brand" href="#">Articles<span id="file_count" class="badge">${_file_count}</span></a>
</div>
<div id="navbar" class="navbar-collapse collapse">
<form class="navbar-form navbar-right">
<div class="form-group">
<input type="text" id="search" placeholder="Search" class="form-control">
</div>
<div class="form-group">
<button id="clear_search" class="btn btn-info">clear</button>
</div>
</form>
</div><!--/.navbar-collapse -->
</div>
</nav>

<script>
document.querySelector('body').style.marginLeft = 'auto';
document.querySelector('body').style.marginRight = 'auto';
document.querySelector('body').style.width = '80%';
</script>


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

    var rRegEscape = /[\\\[\]($){}*+.?-]/,

        // For result selection
        currentResult = [],
        $currentItem = null,
        currentIndex = 0,

        isClear = false;

    function doFilter(key){
        var text = key,
            reg = new RegExp(text.replace(rRegEscape, '\\$&'), 'ig'),
            reg1 = new RegExp(text.replace(rRegEscape, '\\$&'), 'i'),
            count = 0;

        // Reset when a new filter start
        resetCurrentResult();

        $links.each(function(index, item){
            var $link = $(item);
            if( reg1.test( $link.text() ) ) {
                $link.parent().show();
                currentResult.push($link);
                count++;
            }
            else {
                $link.parent().hide();
            }
        });

        $('#file_count').html(count);
    }

    $('#search').on('input', function(){
        if( !isClear ) {
            doFilter($(this).val());
        }
    })
    .on('keydown', function(e){
        var RETURN = 13,
            TAB = 9; 

        if ( RETURN == e.keyCode ) {
            e.preventDefault();
            $(this).blur();
            // Highlight the first item
            selectItem(0);
        }
        else if ( TAB == e.keyCode ) {
            e.preventDefault();
        }

        e.stopPropagation();
    })
    ;




    function resetCurrentResult () {
        $currentItem 
            && $currentItem.closest('li').removeClass('selected');
        $currentItem = null;
        currentIndex = 0;

        currentResult.length = 0;
    }

    function selectItem (index) {
        index = index || 0;
        $currentItem 
            && $currentItem.closest('li').removeClass('selected');
        if ( index < currentResult.length ) {
            $currentItem = currentResult[index];
            $currentItem.closest('li').addClass('selected');
        }
    }





    function clearSearch () {
        isClear = true;
        $('#search').val('');
        isClear = false;
        doFilter($('#search').val());
    }

    $('#clear_search').on('click', function(){
        clearSearch();
    });




    $(window).on('load', function(){
        doFilter($('#search').val());
        selectItem(currentIndex);
    });



    $(document).on('keydown', function(e){
        var BACKSPACE = 8,
            RETURN = 13,
            TAB = 9,
            SLASH = 191,
            KEY_K = 75,
            LEFT = 37;

        // Start search
        if ( SLASH == e.keyCode ) {
            $('#search').focus();
            // prevent search input 
            e.preventDefault();
        }
        // Backspace to clear search 
        else if ( BACKSPACE == e.keyCode ) {
            clearSearch();
            // prevent search input 
            e.preventDefault();
        }
        // Navigate between items
        else if ( TAB == e.keyCode ) {
            // prevent search input 
            e.preventDefault();
            if (currentResult.length > 0) {
                currentIndex = ( currentIndex + 1 ) % currentResult.length;
            }
            selectItem( currentIndex );
        }
        // Go page
        else if ( RETURN == e.keyCode ) {
            // prevent search input 
            e.preventDefault();
            location.href = $currentItem.attr('href');
        }
    });


})();


</script>

EOF
) > _footer


# generate preview.md file

cat _header _list _footer > preview.md
cat ./markdown_res/header.tpl.html preview.md ./markdown_res/footer.tpl.html > preview.md.html
rm _header _list _footer preview.md




# do markdown parsing for files modified in 3 days
find . -type f \
    -regex "\..*\.md" \
    -and -mtime -3000 \
    -exec sh $ROOT/build/build-markdown.sh {} \;

find . -type f -name "*.md" -exec rm {} \;

cd ..
cp -r docs $DISTDIR 

popd

rm -rf __tmp
