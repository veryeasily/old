
var hideArt, artClick;

hideArt = function(e) {
  var $old, $this;

  $this = this.$this || (this.$this = $(this));
  $this.remove();
  $old = $("img[src='" + (this.attr("src")) + "']");
  $old.on('click', artClick);
};


artClick = function artClick(e) {
    var $this = this.$this = this.$this || $(this)
        , $zoom
        , $clone;
    console.log('inside of artclick!');
    $this.off('click');
    $zoom = $('<div id="zoomin_' + this.src + '">').css({
        position: 'absolute',
        left: (window.innerWidth - $this.width()) / 2 + 'px',
        top: (window.innerHeight - $this.height()) / 2 + 'px',
        height: 'auto',
        'max-height': 'auto'
    }); 
    $zoom.css({
        left: (window.innerWidth - $zoom.width()) / 2 + 'px',
        top: (window.innerHeight - $zoom.height()) / 2 + 'px',
        height: 'auto',
        'max-height': 'auto'
    }).appendTo(document.body).append($clone = $this.clone());
    $clone.on('click', hideArt);
};

$(function() {
    ($imgs = $('img')).on('click', artClick);
    console.log($imgs);
    console.log('that was all the images we just appended to');
});

function raiseNavbar(e) {
    var triggered = this.dataset.triggered;
    this.$element = this.$element || $(this);
    console.log(e);
    if ($('#warp').hasClass('goone')) {
        this.$element.addClass('raise'); }
    else {
        this.$element.removeClass('raise'); }
}

$(function() {
    $('#navbar').on('raisenav', $.proxy(raiseNavbar, document.getElementById('navbar')));
}); 

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
    $('.subwindow a').click(function (e) {
        e.stopPropagation();
    });
    var $slices, $artwork, $activeHeap, undoInvert, pullUpViewer, Inverter;
    $slices = $('.slice').attr('data-clicked', "false");
    $slices.on('click', function alternate (e) {
        console.log(e);
        // check to see if we're in art viewing mode...
        if (!$(document.documentElement).hasClass('inverted')) { 

            e.stopPropagation();
            var $this, $right, $left, $others;
            $('#warp').removeClass('go goone gotwo gothree gofour')
            $slices.removeClass('right1 right2 right3 left1 left2 left3 scrollEnabled');
            if (this.dataset.clicked === "true") {
                this.dataset.clicked = "false";
                $('#navbar').trigger('raisenav', [e]);
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
        } else {
            e.preventDefault();
        }
    } );

    Inverter =
    {
        pullUpViewer : function(e) {
            e.preventDefault();
            e.stopPropagation();
            var $this = $(this);
            $('.artwork').off('click');
            ($activeHeap = $this.parent().parent()).addClass('art-front-and-center');     // This triggers the necessary classes to invert everything else.
            $(document.documentElement).addClass('inverted');
            $(document.body).on('click', Inverter.undoInvert);
            var $artscont = $('#one > .subwindow');
            $('<div>').attr('id','screen').height($("#arts-container").height()).click(
                function(e) {
                    $(this).off('click').remove();
                    $('.art-front-and-center').removeClass('art-front-and-center');
                    $(document.documentElement).removeClass('inverted');
                    $('.artwork').click(pullUpViewer);
                    return null;
                }).appendTo($artscont);
        },

        undoInvert : function undoInvert (e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).off('click');
            $('.artwork').on('click', Inverter.pullUpViewer).parent().parent().removeClass('art-front-and-center');
            $(document.documentElement).removeClass('inverted'); 
            return false;
        }
    };

    // $('.artwork').on('click', Inverter.pullUpViewer);
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
