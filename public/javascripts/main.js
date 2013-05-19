
// this does mousescrolling through the art section!
$(function() {
    $('.bundle').mousewheel(function(event, delta) {
        this.scrollLeft += (delta * 30);
    });
});

$(window).on('message', function(e) {
    var evt = e.originalEvent;
    if (evt.origin === 'http://elju.github.io' && evt.data === 'click') {
        $('#blog-container').trigger('click');
    }
});

$('a').on('click', function(e) {
    e.stopPropagation();
});
    
$(document).on('ready', function() {

    var $slices, $artwork, $activeHeap, undoInvert, pullUpViewer;

    // if we clicked a link, then don't animate!!!
    $('.subwindow a').click(function (e) {
        e.stopPropagation();
    });

    $slices = $('.slice').attr('data-clicked', "false");
    $slices.on('click', function alternate (e) {
        var $this, $right, $left, $others;

        e.stopPropagation();
        $('#warp').removeClass('go goone gotwo gothree gofour')
        $slices.removeClass('right1 right2 right3 left1 left2 left3 scrollEnabled');
        if (this.dataset.clicked === "true") {
            this.dataset.clicked = "false";
        } else {
            $slices.attr('data-clicked', "false");
            $right = $slices.filter('#' + this.id + ' ~ a');
            $left = $slices.not($right).not(this);
            $left.each(function(i) {
                $(this).addClass('left' + ($left.length - i));} );
            $right.each(function(i) {
                $(this).addClass('right' + (i + 1)); });
            $('#warp').addClass('go').addClass('go' + this.id);
            this.dataset.clicked = "true";
            var that = this;
        }
    });

    $('#navbar a[data-slice]').on('click'
            , function(e) {
                $(this.dataset.slice).click();
            });
    $('#navbar a.logo').on('click'
            , function(e) {
                console.log("logo clicked!");
                $('div[data-clicked="true"]').click();
            });
});
