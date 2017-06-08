var picViewer = $(function() {
    // cache DOM
    var $photoViewer = $('#photo-viewer');
    var $thumbnails = $('#thumbnails');

    // design data 
    var request; // 路径验证变量
    var cache = {}; // 缓存对象
    var $current; // 当前图片

    // bind events
    $thumbnails.on('click', 'a', switchPic);
    $thumbnails.on('mouseover', 'a', switchPic);
    $thumbnails.find('a').eq(0).click();

    function switchPic(e) {
        e.preventDefault();
        $thumbnails.find('a').removeClass('active');
        $(this).addClass('active');

        var src = this.href; // 取到路径
        request = src; // 交给验证变量
        var $img = $('<img/>');

        if (cache.hasOwnProperty(src)) { // 如果缓存里面有了当前路径

            if (cache[src].isLoading === false) { // 如果加载完毕
                showPic(cache[src].$img); // 显示缓存中的图片
            }
        } else { // 设计缓存并加载一次图片

            cache[src] = { // 设计缓存状态
                $img: $img, // 缓存图片
                isLoading: true // 记录状态，设为 true，在加载完成时取反值
            };

            $photoViewer.addClass('is-loading');
            $img.attr({
                    src: src,
                    title: this.title
                })
                // 图片加载进来 
            $img.on('load', function() {

                $img.hide();
                $photoViewer.removeClass('is-loading').append($img); //添加上图片元素 
                cache[src].isLoading = false; // 加载结束，修改加载状态

                if (request === src) { // 验证图片路径
                    showPic($img); // 显示图片
                }
                // 点击事件会按照点击顺序进行，但是加载事件则按照加载时间的不同，会在不同的时间段完成，所以需要在加载图片时配对点击事件中的 src 和加载事件中的 src，才能确保加载的图片总是指向点击事件中的 src

            });


        }


    }

    function showPic($img) {

        if ($current) {
            $current.stop().hide();
        }
        $img.stop().fadeIn(1000);

        $current = $img; // 更新

    }


})
