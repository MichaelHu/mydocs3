# nodec

## Resources

* github: <https://github.com/pmq20/node-packer> <iframe src="http://258i.com/gbtn.html?user=pmq20&repo=node-packer&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>
* 类似应用：


## Examples

### Compile a CLI tool

    git clone --depth 1 https://github.com/jashkenas/coffeescript.git
    cd coffeescript
    nodec bin/coffee
    ./a.out (or a.exe on Windows)

### Compile a web application

    git clone --depth 1 https://github.com/eggjs/examples.git
    cd examples/helloworld
    npm install
    nodec node_modules/egg-bin/bin/egg-bin.js
    ./a.out dev (or a.exe dev on Windows)

### Compile a npm package

    nodec --npm-package=coffee-script coffee
    ./a.out (or a.exe on Windows)
    

## Usage

    nodec [OPTION]... [ENTRANCE]
      -r, --root=DIR                   Specifies the path to the root of the application
      -o, --output=FILE                Specifies the path of the output file
      -d, --tmpdir=DIR                 Specifies the directory for temporary files
          --clean-tmpdir               Cleans all temporary files that were generated last time
          --keep-tmpdir                Keeps all temporary files that were generated last time
          --make-args=ARGS             Passes extra arguments to make
          --vcbuild-args=ARGS          Passes extra arguments to vcbuild.bat
      -n, --npm=FILE                   Specifies the path of npm
          --skip-npm-install           Skips the npm install process
          --npm-package=NAME           Downloads and compiles the specified npm package
          --npm-package-version=VER    Downloads and compiles the specified version of the npm package
          --auto-update-url=URL        Enables auto-update and specifies the URL to get the latest version
          --auto-update-base=STRING    Enables auto-update and specifies the base version string
          --msi                        Generates a .msi installer for Windows
          --pkg                        Generates a .pkg installer for macOS
          --debug                      Enable debug mode
          --quiet                      Enable quiet mode
      -v, --version                    Prints the version of nodec and exit
      -V, --node-version               Prints the version of the Node.js runtime and exit
      -h, --help                       Prints this help and exit



