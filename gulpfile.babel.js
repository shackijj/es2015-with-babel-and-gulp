"use strict";

import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";
import watchify from "watchify";
import browserSync from "browser-sync";

watchify.args.debug = true;

const sync = browserSync.create();

function bundle() {
    return browserify("src/app.js")
        .transform("babelify")
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("dist"));
}

gulp.task('transpile', () => bundle());

gulp.task('default', ['transpile']);

gulp.task('js-watch', ['transplile'], sync.reload);

gulp.task('serve', ['transpile'], () => sync.init({
    server: 'dist',
    port: process.env.PORT || 8000,
    host: process.env.IP || 'localhost'
}));

gulp.task('watch', ['serve'], () => {
    gulp.watch('src/**/*', ['js-watch']);
});
