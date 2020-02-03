# ToDo's:  thoughts and ideas

Since this was a learning experience there are many things I have
thought of that could probably make this better and further my learning.
Things I want to come back to and address to polish, refine, and round
out my learning experience are listed below.

###### Giphy Favorites
- [ ] user defined categories backend & frontend
- [ ] Pop up modal for saving, editing, deleting favorite and categories
      all in one place.
- [ ] more intuitive layout in general
  - [ ] maybe use same gallery after modal is in place. Maybe I want to
        change the way things are displayed all together.

###### Search
- [ ] scroll to bottom pf paginated search results fetches next batch
      from API.
  - [ ] clicking button again with same the same search value currently
        returns next page. But think there is a design flaw in the
        python module selected that limits things to offsets under 100.
        I think the creator coded for the offset max to be the stated
        page max of the giphy API. I did not look into it much yet but
        did notice a problem. I pulled the covers back only briefly then
        put them back down again to make more progress.

###### UI
- [ ] Semantic UI - General cleanup of layout (make it more like a site.

###### General Code Refactoring
- [ ]  could break up backend service into different pieces which extend
       a generic base. IE GIphy and User Profile and other things that
       come along. Probbaly would mirror structure of backend Django
       apps.
- [ ]  Move giphy related components into subdirectory structure to
       logically group pieces.
- [ ]  add prop type helpers/definitions to all React components
- [ ]  better notes, comments, documentation. JsDocs? Docstrings and
       other comments in python.
