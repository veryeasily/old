$ ->

    $blogContainer = $('#blog-container')

    class Blog

        constructor: (container, currentPage = 'http://lju.me/blog/_site/') ->

            @$container = $(container)
            @currentPage = currentPage

        updatePage: (page) ->

            @currentPage = page
            $.ajax this.currentPage, {
                complete: (data) =>
                    this.$container.html('')
                    $(data.responseText).appendTo(this.$container)
                    this.fixLinks()
            }

        fixLinks: () ->
            $('#blog-container a[href*="blog/_site"]').on('mousedown', (e) ->
                e.preventDefault()
                e.stopPropagation()
                blog.updatePage this.href
            )

    blog = new Blog(document.getElementById 'blog-container')
    blog.fixLinks()

    ###
    # Make an ajax call and get the new page content
    # After getting it, clear out the current page,
    # and replace with the new html.
    bootstrap = () ->
        loadNewPage = (e) ->
            swapData = (data) ->
                $blogContainer.html(data.responseText)
                do fixLinks

            page = this.currentPage
            options = {complete: swapData}
            $.ajax(page, options)

        $blogContainer.on('pageChange', loadNewPage)

    fixLinks = () ->
        $('#blog-container a[href*="blog/_site"]').on('mousedown', (e) ->
            e.preventDefault()
            e.stopPropagation()
            blog.updatePage(this.href)
            return null
        )
    ###
