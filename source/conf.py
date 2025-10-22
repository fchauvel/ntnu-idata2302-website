# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
# import os
# import sys
# sys.path.insert(0, os.path.abspath('.'))


# -- Project information -----------------------------------------------------

project = "Algorithms and Data Structures"
copyright = "2021, NTNU"
author = "NTNU"

# The full version, including alpha/beta/rc tags
release = "0.5.16"

# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = ["sphinx_exercise", "sphinx_togglebutton"]

rst_prolog = "Version: |release|"

# Number the figures
numfig = True

# Add any paths that contain templates here, relative to this directory.
templates_path = ["_templates"]

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = [".DS_Store", "**/*inc.rst"]

# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#

html_theme = "sphinx_book_theme"

# html_logo = "_static/ntnu_logo.png"

html_title = "IDATA 2302 &mdash; Algorithms and Data Structures"

html_theme_options = {
    "use_sidenotes": True,
    "repository_url": "https://github.com/fchauvel/ntnu-idata2302-website",
    "path_to_docs": "source",
    "use_edit_page_button": True,
    "navbar_end": ["logo.html"],
    #    "announcement": "<p class='news'>Hi there! What do you think of this course, so far? Please, give us <a href='https://docs.google.com/forms/d/e/1FAIpQLSdUWRWrbTWcRPWzu3ytqgJaEAe-pJNcyhB1gVyM9s0DoSaz_A/viewform?usp=sf_link' target='_blank'>feedback</a>!</p>"
}

html_css_files = ["custom.css"]

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ["_static"]

mathjax3_config = {
    "svg": {"displayAlign": "center", "displayIndent": "2em"},
    "chtml": {"displayAlign": "left", "displayIndent": "2em"},
}
