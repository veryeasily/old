
// this does mousescrolling through the art section!
/*
$(function() {
    $('#arts-container').mousewheel(function(event, delta) {
        this.scrollLeft += (delta * 30);
    });
});
*/

$(window).on('message', function(e) {
    var evt = e.originalEvent;
    if (evt.origin === 'http://elju.github.io' && evt.data === 'click') {
        $('#blog-container').trigger('mousedown');
    }
});

$(document).on('ready', function() {

    var $slices, $artwork, $activeHeap, undoInvert, pullUpViewer;

    // if we clicked a link, then don't animate!!!
    $('.subwindow a').mousedown(function (e) {
        e.stopPropagation();
    });

    $slices = $('.slice').attr('data-clicked', "false");
    $slices.on('mousedown', function alternate (e) {
        /*
        var $this, $right, $left, $others;

        e.stopPropagation();
        $('#warp').removeClass('go goone gotwo gothree gofour')
        $slices.removeClass('right1 right2 right3 left1 left2 left3 scrollEnabled');
        */
        if (window.location.hash === $(this).attr('href')) {
            // this.dataset.clicked = "false";
            window.location.hash = "#/";
        } else {
            /*
            $slices.attr('data-clicked', "false");
            $right = $slices.filter('#' + this.id + ' ~ a');
            $left = $slices.not($right).not(this);
            $left.each(function(i) {
                $(this).addClass('left' + ($left.length - i));} );
            $right.each(function(i) {
                $(this).addClass('right' + (i + 1)); });
            $('#warp').addClass('go').addClass('go' + this.id);
            focusOnSlice.apply(this, e);
            */
            $slices.attr('data-clicked', "false");
            this.dataset.clicked = "true";
            var that = this;
            window.location.hash = $(this).attr('href');
        }
        // focusOnSlice.apply(this, e);
    });

    function focusOnSlice (e) {
        var $this, $right, $left, $others;

        // e.stopPropagation();
        $('#warp').removeClass('go goone gotwo gothree gofour')
        $slices.removeClass('right1 right2 right3 left1 left2 left3 scrollEnabled');
        if (window.location.hash === "#/" || window.location.hash === "") {
            /*
            this.dataset.clicked = "false";
            window.location.hash = "#/";
            */
        } else {
            // $slices.attr('data-clicked', "false");
            $right = $slices.filter('#' + this.id + ' ~ a');
            $left = $slices.not($right).not(this);
            $left.each(function(i) {
                $(this).addClass('left' + ($left.length - i));} );
            $right.each(function(i) {
                $(this).addClass('right' + (i + 1)); });
            $('#warp').addClass('go').addClass('go' + this.id);
            /*
            this.dataset.clicked = "true";
            var that = this;
            window.location.hash = $(this).attr('href');
            */
        }
    }

    $('#navbar a[data-slice]').on('mousedown',
            function(e) {
                e.preventDefault();
                $(this.dataset.slice).mousedown();
            }
        );

    $('#logoAnchor').on('mousedown'
            , function(e) {
                e.preventDefault();
                window.location.hash = "#/";
                // $('div[data-clicked="true"]').click();
            });
    switch (window.location.hash) {
        case "#/art":
            window.setTimeout(function() {
                $('.slice[href="#/art"]').attr("data-clicked", "true");
                focusOnSlice.apply($('.slice[href="#/art"]')[0]);
            }, 750);
            break;
        case "#/blog":
            window.setTimeout(function() {
                $('.slice[href="#/blog"]').attr("data-clicked", "true");
                focusOnSlice.apply($('.slice[href="#/blog"]')[0]);
            }, 750);
            break;
        case "#/other":
            window.setTimeout(function() {
                $('.slice[href="#/other"]').attr("data-clicked", "true");
                focusOnSlice.apply($('.slice[href="#/other"]')[0]);
            }, 750);
            break;
        case "#/code":
            window.setTimeout(function() {
                $('.slice[href="#/code"]').attr("data-clicked", "true");
                focusOnSlice.apply($('.slice[href="#/code"]')[0]);
            }, 750);
            break;
    }
    $(window).on('hashchange', function(e) {
        switch (window.location.hash) {
            case "#/art":
                $('.slice[href="#/art"]').attr("data-clicked", "true");
                focusOnSlice.apply($('.slice[href="#/art"]')[0]);
                break;
            case "#/blog":
                $('.slice[href="#/blog"]').attr("data-clicked", "true");
                focusOnSlice.apply($('.slice[href="#/blog"]')[0]);
                break;
            case "#/other":
                $('.slice[href="#/other"]').attr("data-clicked", "true");
                focusOnSlice.apply($('.slice[href="#/other"]')[0]);
                break;
            case "#/code":
                $('.slice[href="#/code"]').attr("data-clicked", "true");
                focusOnSlice.apply($('.slice[href="#/code"]')[0]);
                break;
            case "#/":
                $('#warp').removeClass('go goone gotwo gothree gofour')
                $slices.removeClass('right1 right2 right3 left1 left2 left3 scrollEnabled');
                break;
            case "":
                $('#warp').removeClass('go goone gotwo gothree gofour')
                $slices.removeClass('right1 right2 right3 left1 left2 left3 scrollEnabled');
                break;
        }
    });


});
