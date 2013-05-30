artClicked = (e) ->
    $this = $(this)
    console.log('an image was clicked, here it is')
    console.dir(this)
    e.stopPropagation()
    src = $(this).attr('src')
    $img = $('<img>').attr('src', src)
    $img.appendTo(document.body)
    $img.on('load', posImageCenter)
    return null

isOpera = !!window.opera || navigator.userAgent.indexOf('Opera') >= 0
# Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
isFirefox = typeof InstallTrigger != 'undefined'   # Firefox 1.0+
isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0
# At least Safari 3+: "[object HTMLElementConstructor]"
isChrome = !!window.chrome                          # Chrome 1+

$ ->
    if(isFirefox)
        $('#warp').addClass('firefox')

posImageCenter = (e) ->
    do e.stopPropagation
    console.log('the image is now loaded, here it is')
    console.dir(this)
    $this = $(this)
    width = this.naturalWidth
    height = this.naturalHeight
    $this.addClass('artCenter')
    $this.css({
        position: 'absolute',
        'box-shadow': '0 0 20pt 12pt rgba(0,0,0,0.35)',
        top: (document.body.clientHeight - this.naturalHeight)/2 + 'px',
        left: (document.body.clientWidth - this.naturalWidth)/2 + 'px',
        'z-index': 10
    })
    $this.on('click', removeImageCenter)

removeImageCenter = (e) ->
    e.stopPropagation()
    console.log('made it into remove Image Center')
    $this = $(this)
    $this.removeClass('artCenter')
    $this.remove()
    return null

$ ->
    $('.artwork').on('click', artClicked)
    console.dir($('.artwork'))
    console.log('loaded main.coffee')
