
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

    // if we clicked a link inside a subwindow, then make sure not to animate!!!
    $('.subwindow a').mousedown(function (e) {
        e.stopPropagation();
    });

    $slices = $('.slice');

    // Now we basically do some routing.  If you click on a slice, then we want the page to zoom in on this slice.
    // We do this by updating the hash, and catching it with the 'onhashchange' event later on.
    $slices.on('mousedown', function alternate (e) {
        if (window.location.hash === $(this).attr('href')) {
            window.location.hash = "#/";
        } else {
            var that = this;
            window.location.hash = $(this).attr('href');
        }
    });

    // Here is where all the magic happens.  (Well it a lot of it really also happens in lju.less)
    function focusOnSlice (e) {
        var $this, $right, $left, $others;

        // e.stopPropagation();
        $('#warp').removeClass('go goone gotwo gothree gofour')
        $slices.removeClass('right1 right2 right3 left1 left2 left3 scrollEnabled');
        if (window.location.hash !== "#/" && window.location.hash !== "") {
            $right = $slices.filter('#' + this.id + ' ~ a');
            $left = $slices.not($right).not(this);
            $left.each(function(i) {
                $(this).addClass('left' + ($left.length - i));} );
            $right.each(function(i) {
                $(this).addClass('right' + (i + 1)); });
            $('#warp').addClass('go').addClass('go' + this.id);
        }
    }

    $('#navbar a[data-slice]').on('mousedown',
            function(e) {
                $(this.dataset.slice).mousedown();
            }
        );

    $('#logoAnchor').on('mousedown'
            , function(e) {
                window.location.hash = "#/";
            });

    // Here's where we handle coming in to the page and going to a specific slice:
    switch (window.location.hash) {
        case "#/art":
            window.setTimeout(function() {
                focusOnSlice.apply($('.slice[href="#/art"]')[0]);
            }, 750);
            break;
        case "#/blog":
            window.setTimeout(function() {
                focusOnSlice.apply($('.slice[href="#/blog"]')[0]);
            }, 750);
            break;
        case "#/other":
            window.setTimeout(function() {
                focusOnSlice.apply($('.slice[href="#/other"]')[0]);
            }, 750);
            break;
        case "#/code":
            window.setTimeout(function() {
                focusOnSlice.apply($('.slice[href="#/code"]')[0]);
            }, 750);
            break;
    }

    // Here's the switchboard where we navigate to a new part of the page as the hash changes.
    // I possibly could have done this by actually naming the slices in the hash and using the CSS selector :target, but some browsers
    // such as Firefox have weird behavior when they try to center the element that is targeted in the hash of the url.
    $(window).on('hashchange'
            , function(e) {
                switch (window.location.hash) {
                    case "#/art":
                        focusOnSlice.apply($('.slice[href="#/art"]')[0]);
                        break;
                    case "#/blog":
                        focusOnSlice.apply($('.slice[href="#/blog"]')[0]);
                        break;
                    case "#/other":
                        focusOnSlice.apply($('.slice[href="#/other"]')[0]);
                        break;
                    case "#/code":
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
