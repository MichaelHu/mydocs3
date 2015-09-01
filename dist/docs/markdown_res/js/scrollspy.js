// @thanks liguang
(function($){

    if(/\/(?:(?:index|preview)\.md\.html)?([?#].*)?$/.test(location.href)){
        return;
    }

    if( $().scrollspy ){

        var selector = window.scroll_selector || "h2"
            , pre = "nav_";
            
        var list = $(selector).add("h3")
            ,$li = null
            ,$ul = $('<ul class="nav"></ul>');


        list.each(function(i, item){
            $li = $("<li></li>");
            $(item).attr("id", pre + i);
            if($(item)[0].tagName == "H3"){
                $li.css({"text-indent":"1em"})
            }
            
            $li.append('<a href="#' + pre + i + '">'+ $(item).text() + "</a>");
            $ul.append($li);
        });
        
        var $navbar = $("<div></div>").attr("id", "navbar-auto")
            .append($ul)
            .on('click', function(e){
                var $target = $(e.target),
                    $link;
                if($target.closest('a').length){
                    e.preventDefault();
                    $link = $target.closest('a'); 
                    location.replace($link.attr('href'));
                }
            });
        
        $('body')
            .prepend($navbar)
            .scrollspy({ target: '#navbar-auto' })
            .on('activate.bs.scrollspy', function (dd) {
                var $target = $(dd.target).closest('li'),
                    $cont = $target.closest('#navbar-auto'),
                    offsetTop = $target[0].offsetTop,
                    scrollTop = $cont[0].scrollTop,
                    contHeight = $cont[0].offsetHeight,
                    scrollHeight = $cont[0].scrollHeight;

                // console.log(offsetTop, scrollTop, contHeight, scrollHeight);
                if (offsetTop - scrollTop < 50) {
                    $cont[0].scrollTop = offsetTop - 50;
                }
                else if (offsetTop - contHeight - scrollTop > -80) {
                    $cont[0].scrollTop = offsetTop - contHeight + 80;
                }  
            });
    }

    
})(jQuery);

