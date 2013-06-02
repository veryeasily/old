$ ->

    $blogContainer = $('#blog-container')

    class Blog
        constructor: (@currentPage = 'http://lju.me/blog/_site/') ->
        updatePage: (page) ->
            @currentPage = page
            $blogContainer.trigger('pageChange', [this])
        bootstrapBlog: () ->
            $blogContainer.on('pageChange', this.loadNewPage)
        fixLinks: () ->
            $('#blog-container a[href*="blog/_site"]').on('click', (e) ->
                e.preventDefault()
                e.stopPropagation()
                blog.updatePage(this.href)
                return null
            )
        loadNewPage: (e, blog) ->
            swapData = (data) ->
                $blogContainer.html(data.responseText)
                do blog.fixLinks
            page = blog.currentPage
            options = {complete: swapData}
            $.ajax(page, options)


    blog = new Blog()

    ###
    # Make an ajax call and get the new page content
    # After getting it, clear out the current page,
    # and replace with the new html.
    bootstrapBlog = () ->
        loadNewPage = (e) ->
            swapData = (data) ->
                $blogContainer.html(data.responseText)
                do fixLinks

            page = this.currentPage
            options = {complete: swapData}
            $.ajax(page, options)

        $blogContainer.on('pageChange', loadNewPage)

    fixLinks = () ->
        $('#blog-container a[href*="blog/_site"]').on('click', (e) ->
            e.preventDefault()
            e.stopPropagation()
            blog.updatePage(this.href)
            return null
        )
    ###
    
    do blog.bootstrapBlog
    do blog.fixLinks
