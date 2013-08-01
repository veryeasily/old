$ ->
    $('a').each( ->
        r = new RegExp("\/m\/")
        this.href = this.href.replace(r, "/")
    )
