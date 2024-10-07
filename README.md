# NTNU IDATA 2302 Companion Website


## Build the source

```
make clean html
python3 .m http.server -d ./build/html
```

## FAG

### How to add an "Announcement"

See the file `source/conf.py`. Uncomment the line about the announcement

```python
html_theme_options = {
    "use_sidenotes": True,
    "repository_url": "https://github.com/fchauvel/ntnu-idata2302-website",
    "path_to_docs": "source",
    "use_edit_page_button": True,
    "navbar_end": ["logo.html"],
    # "announcement": "<p class='news'>Hi there! What do you think of this course, so far? Please, give us <a href='https://docs.google.com/forms/d/e/1FAIpQLSdUWRWrbTWcRPWzu3ytqgJaEAe-pJNcyhB1gVyM9s0DoSaz_A/viewform?usp=sf_link' target='_blank'>feedback</a>!</p>"
}

``` 
