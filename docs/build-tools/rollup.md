# rollup

> Next-generation `ES6 module` bundler

## Resources

* site: <https://rollupjs.org>
* github: <https://github.com/rollup/rollup> <iframe src="http://258i.com/gbtn.html?user=rollup&repo=rollup&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>

## Features

* Tree-shaking
* 支持CommonJS Module

## Installation

    npm install rollup
    npm install -g rollup

## Usage

    # command-line
    rollup src/main.js -f cjs

    # using config file: rollup.config.js
    rollup -c
    rollup --config rollup.config.dev.js



## Config files

rollup.config.js

    export default {
        input: 'src/main.js'
        , output: {
            file: 'bundle.js'
            , format: 'cjs'
        }
    }




todo
