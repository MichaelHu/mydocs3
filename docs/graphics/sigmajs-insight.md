# sigmajs-insight

github: <https://github.com/jacomyal/sigma.js>


## code structure

    sigma.settings.js
    sigma.export.js
        // only for the node.js version
    sigma.core.js
        sigma( conf )
        properties:
            _handler
            graph
            middlewares
            cameras
            renderers
            renderersPerCamera
            cameraFrames
            camera
            events
        methods:
            addCamera()
            killCamera()
            addRenderer()
            killRenderer()
            refresh()
            render()
            renderCamera()
            kill()
        static:
            instances
            version
            
    conrad.js // a tiny javascript jobs scheduler
        ref: <http://github.com/jacomyal/conrad.js>

    renderers/
    misc/
    middlewares/
    classes/
    captors/
