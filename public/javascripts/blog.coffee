$ ->

    $blogContainer = $('#blog-container')

    class Blog

        constructor: (container, @currentPage = 'http://lju.me/blog/_site/') ->

            @$container = $(container)

        updatePage: (page) ->

            @currentPage = page
            @$container.trigger('pageChange', this)

        bootstrap: () ->
            @$container.on('pageChange', $.proxy(this.loadNewPage, this))
        
        fixLinks: () ->

            $('#blog-container a[href*="blog/_site"]').on('mousedown', (e) ->
                e.preventDefault()
                e.stopPropagation()
                blog.updatePage this.href
                return null
            )

        loadNewPage: (e, blog) ->

            $.ajax blog.currentPage, {
                complete: (data) =>
                    @$container.html(data.responseText)
                    @fixLinks()
            }


    blog = new Blog(document.getElementById 'blog-container')

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
    
    blog.bootstrap()
    blog.fixLinks()
