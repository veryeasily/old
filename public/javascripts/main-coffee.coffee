
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

###
isOpera = !!window.opera || navigator.userAgent.indexOf('Opera') >= 0
# Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
isFirefox = typeof InstallTrigger != 'undefined'   # Firefox 1.0+
###
isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0
###
# At least Safari 3+: "[object HTMLElementConstructor]"
isChrome = !!window.chrome                          # Chrome 1+
###

# if we are on something that won't work, give them their consolidation prize (the mobile site)
#
###
if isSafari
    if (window.location.path.indexOf '/m') isnt 0
        window.location.href = window.location.protocol + '//' + window.location.hostname + '/m' + window.location.pathname
###

if window.innerWidth <= 800
    mobile = true
    $('#navbar').remove()
    $(document.body).css('padding', 0)
    $('#rightArrow, #leftArrow').remove()

if navigator.appName is 'Microsoft Internet Explorer'
    window.location.href = window.location.protocol + '//' + window.location.hostname + '/ie'

posImageCenter = (e) ->
    do e.stopPropagation
    console.log('the image is now loaded, here it is')
    console.dir(this)
    $this = $(this)
    # width = this.naturalWidth
    # height = this.naturalHeight
    $this.addClass('artCenter')
    $this.css({
        position: 'absolute',
        'z-index': 100
    }).css({
        top: (document.body.clientHeight - this.height)/2 + 'px',
        left: (document.body.clientWidth - this.width)/2 + 'px'
    })


    # now we have to place something to absorb the click to make the art go away
    $modal = $('<div id="modalCatch">').css({
        width: window.innerWidth,
        height: window.innerHeight,
        position: 'absolute',
        top: '0px',
        left: '0px',
        'z-index': 101,
    }).appendTo(document.body).data('imageTarget', $this)
    $modal.on('mousedown', removeImageCenter)

removeImageCenter = (e) ->
    e.stopPropagation()
    console.log('made it into remove Image Center')
    $img = $(this).data('imageTarget')
    $img.remove()
    $(this).remove()
    return null

$ ->
    left = 0
    if mobile isnt true
        $('img.artwork').on('mousedown', artClicked)
    console.dir($('.artwork'))
    console.log('loaded main.coffee')
    removeElt = ->
        $(this).remove()
    fadeOuty = ->
        $('#help').css({
            opacity: 0
        }).on('transitionEnd', removeElt).on('webkitTransitionEnd', removeElt)
    window.setTimeout(fadeOuty, 2000)
    MOVEAMNT = 20
    TIME = 15

    $('#leftArrow').mousedown( (e) ->
        e.stopPropagation()
        moveLeft = ->
            left = if (left + MOVEAMNT) < 0 then left + MOVEAMNT else 0
            $('.bundle').css('left', left + 'px')
        movingLeft = window.setInterval(moveLeft, TIME)
        $(this).mouseup( (e) ->
            e.stopPropagation()
            window.clearInterval(movingLeft)
            return null
        )
        $(this).mouseleave( (e) ->
            e.stopPropagation()
            window.clearInterval(movingLeft)
            return null
        )
        return null
    )

    $('#rightArrow').mousedown( (e) ->
        e.stopPropagation()
        moveRight = ->
            left = left - MOVEAMNT
            $('.bundle').css('left', left + 'px')
        movingRight = window.setInterval(moveRight, TIME)
        $(this).mouseup( (e) ->
            e.stopPropagation()
            window.clearInterval(movingRight)
            return null
        )
        $(this).mouseleave( (e) ->
            e.stopPropagation()
            window.clearInterval(movingRight)
            return null
        )
        return null
    )

    $('.bundle img').css({
        'max-width': Math.floor(window.innerWidth * .9) + 'px',
        'max-height': Math.floor(window.innerHeight * .9) + 'px'
    })
