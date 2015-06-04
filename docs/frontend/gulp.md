# gulp memo



> The streaming build system. 流式构建系统

1. http://gulpjs.com
2. https://github.com/gulpjs/gulp
3. API: https://github.com/gulpjs/gulp/blob/master/docs/API.md


比grunt配置项更加简单，最大特点是pipe功能。



## gulpfile.js sample

构建配置文件，通过pipe无需产生中间临时文件，同时一个文件可以产生多个输出：


    var gulp = require('gulp');
    var coffee = require('gulp-coffee');
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');
    var imagemin = require('gulp-imagemin');
    var sourcemaps = require('gulp-sourcemaps');
    var del = require('del');

    var paths = {
      scripts: ['client/js/**/*.coffee', '!client/external/**/*.coffee'],
      images: 'client/img/**/*'
    };

    // Not all tasks need to use streams
    // A gulpfile is just another node program and you can use all packages available on npm
    gulp.task('clean', function(cb) {
      // You can use multiple globbing patterns as you would with `gulp.src`
      del(['build'], cb);
    });

    gulp.task('scripts', ['clean'], function() {
      // Minify and copy all JavaScript (except vendor scripts)
      // with sourcemaps all the way down
      return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
          .pipe(coffee())
          .pipe(uglify())
          .pipe(concat('all.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'));
    });

    // Copy all static images
    gulp.task('images', ['clean'], function() {
      return gulp.src(paths.images)
        // Pass in options to the task
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('build/img'));
    });

    // Rerun the task when a file changes
    gulp.task('watch', function() {
      gulp.watch(paths.scripts, ['scripts']);
      gulp.watch(paths.images, ['images']);
    });

    // The default task (called when you run `gulp` from cli)
    gulp.task('default', ['watch', 'scripts', 'images']);



