# reveal

> The HTML Presentation Framework

## Resources

* site: <https://revealjs.com/>
* github: <https://github.com/hakimel/reveal.js> <iframe src="http://258i.com/gbtn.html?user=hakimel&repo=reveal.js&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>


## Features

* `query string extensions`:

        print-pdf       include pdf-style to export pdf
        showNotes       include speaker notes in exported pdf
        transition      none|fade|slide|convex|concave|zoom

* Transition Modes
* Themes
* Speaker Mode: `S` key
* Short Keys:

        S           Speaker Mode
        N/Space     Next
        P           Previous
        B/.         Black
        ESC/O       Overview
        F           Fullscreen
        H/←         Navigate Left 
        J/↓         Navigate Down
        K/↑         Navigate Up
        L/→         Navigate Right
    
* Multiplexing
* Code Highlight



## Versions

* 3.0.0 - 3.6.0 [ 2017 ]
* 2.0.0 - 2.6.2 [ 2014 ]
* 1.1.0 - 1.4.0

## Themes

> `v3.x.x`

    <link rel="stylesheet" href="css/theme/black.css" id="theme">

1. `black`: Black background, white text, blue links (default theme)
2. `white`: White background, black text, blue links
3. `league`: Gray background, white text, blue links (default theme for reveal.js < 3.0.0)
4. `beige`: Beige background, dark text, brown links
5. `sky`: Blue background, thin dark text, blue links
6. `night`: Black background, thick white text, orange links
7. `serif`: Cappuccino background, gray text, brown links
8. `simple`: White background, black text, blue links
9. `solarized`: Cream-colored background, dark green text, blue links

可以通过动态改变link的href属性，切换当前theme。



## Slide Backgrounds


## Fragments

### effects

    <section>
        <p class="fragment shrink">shrink</p>
        <p class="fragment fade-out">fade-out</p>
        <p class="fragment fade-up">fade-up (also down, left and right!)</p>
        <p class="fragment current-visible">visible only once</p>
        <p class="fragment highlight-current-blue">blue only once</p>
        <p class="fragment highlight-red">highlight-red</p>
        <p class="fragment highlight-green">highlight-green</p>
        <p class="fragment highlight-blue">highlight-blue</p>
    </section>

### in and out 

    <section>
        <span class="fragment fade-in">
            <span class="fragment fade-out">I'll fade in, then out</span>
        </span>
    </section>

### fragment index

    <section>
        <p class="fragment" data-fragment-index="3">Appears last</p>
        <p class="fragment" data-fragment-index="1">Appears first</p>
        <p class="fragment" data-fragment-index="2">Appears second</p>
    </section>

### fragment events

    Reveal.addEventListener( 'fragmentshown', function( event ) {
        // event.fragment = the fragment DOM element
    } );

    Reveal.addEventListener( 'fragmenthidden', function( event ) {
        // event.fragment = the fragment DOM element
    } );


## Events

    ready
    slidechanged

    fragmentshown
    fragmenthidden


## APIs

    ...


## Configuration

    Reveal.initialize({

        // Display presentation control arrows
        controls: true,

        // Help the user learn the controls by providing hints, for example by
        // bouncing the down arrow when they first encounter a vertical slide
        controlsTutorial: true,

        // Determines where controls appear, "edges" or "bottom-right"
        controlsLayout: 'bottom-right',

        // Visibility rule for backwards navigation arrows; "faded", "hidden"
        // or "visible"
        controlsBackArrows: 'faded',

        // Display a presentation progress bar
        progress: true,

        // Set default timing of 2 minutes per slide
        defaultTiming: 120,

        // Display the page number of the current slide
        slideNumber: false,

        // Push each slide change to the browser history
        history: false,

        // Enable keyboard shortcuts for navigation
        keyboard: true,

        // Enable the slide overview mode
        overview: true,

        // Vertical centering of slides
        center: true,

        // Enables touch navigation on devices with touch input
        touch: true,

        // Loop the presentation
        loop: false,

        // Change the presentation direction to be RTL
        rtl: false,

        // Randomizes the order of slides each time the presentation loads
        shuffle: false,

        // Turns fragments on and off globally
        fragments: true,

        // Flags if the presentation is running in an embedded mode,
        // i.e. contained within a limited portion of the screen
        embedded: false,

        // Flags if we should show a help overlay when the questionmark
        // key is pressed
        help: true,

        // Flags if speaker notes should be visible to all viewers
        showNotes: false,

        // Global override for autoplaying embedded media (video/audio/iframe)
        // - null: Media will only autoplay if data-autoplay is present
        // - true: All media will autoplay, regardless of individual setting
        // - false: No media will autoplay, regardless of individual setting
        autoPlayMedia: null,

        // Number of milliseconds between automatically proceeding to the
        // next slide, disabled when set to 0, this value can be overwritten
        // by using a data-autoslide attribute on your slides
        autoSlide: 0,

        // Stop auto-sliding after user input
        autoSlideStoppable: true,

        // Use this method for navigation when auto-sliding
        autoSlideMethod: Reveal.navigateNext,

        // Enable slide navigation via mouse wheel
        mouseWheel: false,

        // Hides the address bar on mobile devices
        hideAddressBar: true,

        // Opens links in an iframe preview overlay
        // Add `data-preview-link` and `data-preview-link="false"` to customise each link
        // individually
        previewLinks: false,

        // Transition style
        transition: 'slide', // none/fade/slide/convex/concave/zoom

        // Transition speed
        transitionSpeed: 'default', // default/fast/slow

        // Transition style for full page slide backgrounds
        backgroundTransition: 'fade', // none/fade/slide/convex/concave/zoom

        // Number of slides away from the current that are visible
        viewDistance: 3,

        // Parallax background image
        parallaxBackgroundImage: '', // e.g. "'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg'"

        // Parallax background size
        parallaxBackgroundSize: '', // CSS syntax, e.g. "2100px 900px"

        // Number of pixels to move the parallax background per slide
        // - Calculated automatically unless specified
        // - Set to 0 to disable movement along an axis
        parallaxBackgroundHorizontal: null,
        parallaxBackgroundVertical: null,

        // The display mode that will be used to show slides
        display: 'block'

    });





