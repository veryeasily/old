$ ->
    # snippet of code I found on stack overflow for detecting when image is loaded.
    $.fn.imageLoad = (fn) ->
        this.load(fn)
        this.each( ->
            if this.complete && this.naturalWidth != 0
                $(this).trigger('load')
        )


    $('i').remove() #get rid of scroll bars from normal site
    $('img').on 'mousedown', (e) ->
        $(document.body).css({'overflow-y': 'hidden'})
        $backdrop = $('<div>').css
            position: 'absolute',
            background: 'rgb(217,217,217)',
            'z-index': 1000,
            width: '100%',
            height: '100%',
            left: '0px',
            top: document.body.scrollTop + 'px'
        $backdrop.appendTo(document.body)
        $img = $('<img id="centered">').attr('src', e.target.src).imageLoad (e) ->
            $this = $(this)
            $this.css
                position: 'absolute',
                'max-width': '95%',
                'max-height': '95%',
                'z-index': 1001
            $this.css( {
                left: ((window.innerWidth - this.width) / 2) + 'px',
                top: ((window.innerHeight - this.height) / 2) + 'px'
            })
            $this.appendTo($backdrop)
        $backdrop.on 'mousedown', (e) ->
            e.stopPropagation()
            $backdrop.remove()
            $img.remove() # <-- these all looked better on a single line
            $(document.body).css({'overflow-y': 'auto'})
            null #equivalent to e.stopPropagation() and e.preventDefault()
        null #equivalent to e.stopPropagation() and e.preventDefault()
