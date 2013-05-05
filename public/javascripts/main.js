/*
 *
 * $(function() {
 *   console.time("setting up click events.");
 *   $(".navbutton").each(function(i, el) {
 *       that = this;
 *       $(this).on('click', function(e) {
 *           e.preventDefault();
 *           history.pushState({}, this.id, this.href);
 *           $mainbar = $('.mainbar');
 *           $mainbar.hasClass('activated') ? $mainbar.removeClass('activated') : $mainbar.addClass('activated');
 *           return false;
 *       })
 *   });
 *   console.timeEnd("setting up click events.");
 * });

*/

$(function() {
    var $slices;
    $slices = $('.slice');
    $slices.on('click', function alternate (e) {

        e.stopPropagation();
        var $this, $right, $left, $others;

        if (window.location.hash && window.location.hash !== '#') {
            $('#row-fluid').removeClass('go goone gotwo gothree gofour')
            $('.slice').removeClass('right1 right2 right3 left1 left2 left3');
            $('.subwindow').css('overflow-y', 'inherit');
            window.location.hash = '';
            e.preventDefault();
        } else {
            $right = $slices.filter('#' + this.id + ' ~ a');
            $left = $slices.not($right).not(this);
            $left.each(function(i) {
                $(this).addClass('left' + ($left.length - i));} );
            $right.each(function(i) {
                $(this).addClass('right' + (i + 1)); });
            $('#row-fluid').addClass('go').addClass('go' + this.id);
            var that = this;
            ['transitionend', 'webkitTransitionEnd', 'oTransitionEnd'].forEach(function (el, i) {
                $(that).on(el, function() {$(this).children().css('overflow-y', 'auto');}); } );

        }
    } );
});



/*
getCode = function(e) {
    var repos, req;
    req = new XMLHttpRequest();
    req.open('GET', 'https://api.github.com/user/repos');
    req.setRequestHeader('Authorization', 'token 8f8f36e3b95c020f4bf7679c48609bac4576fec5');
    req.onload = codeLoaded.bind(this);
    req.send();

    function codeLoaded() {
        if (req.status == 200) {
            repos = eval(req.response);
            console.log(repos);
        } else {
            console.log('Some type of problem with the AJAX request!');
            console.log(req); }

        function populateMainbar(repos) {
            var links, mainbar;
            mainbar = document.getElementById('mainbar');
            repos.forEach( function(repo) {
                var link;
                link = document.createElement('a');
                link.id = repo.name;
                link.setAttribute('class', 'repo');
                mainbar.app
                
            });
    }
};
*/
