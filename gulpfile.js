var gulp = require('gulp'),
minifycss = require('gulp-minify-css'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
del = require('del');

//压缩
gulp.task('minifycss', function() {
	del(['demo/vue-router/compress/address.css']);
    return gulp.src('demo/vue-router/css/*.css')      //压缩的文件        
        .pipe(minifycss())   //执行压缩
        .pipe(gulp.dest('demo/vue-router/compress'));   //输出文件夹
});

gulp.task('minifyjs', function() {
	del(['demo/vue-router/compress/address.js']);
    return gulp.src('demo/vue-router/js/address.js')
        .pipe(concat('main.js'))    //合并所有js到main.js
        .pipe(gulp.dest('demo/vue-router/compress'))    //输出main.js到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('demo/vue-router/compress'));  //输出
});

//监控css
gulp.task('watch', function () {
    gulp.watch('demo/vue-router/css/*.css', ['minifycss']);
    gulp.watch('demo/vue-router/js/address.js', ['minifyjs']);
});


gulp.task('default',['minifycss','minifyjs','watch']);

