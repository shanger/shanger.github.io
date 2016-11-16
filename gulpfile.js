var gulp = require('gulp'),
htmlmin = require('gulp-htmlmin'),
minifycss = require('gulp-minify-css'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
del = require('del');


//压缩
gulp.task('html',function(){
    var options = {
        collapseWhitespace:true,    //清除空格
        collapseBooleanAttributes:true, //省略布尔属性的值
        removeComments:true,            //清除html中注释的部分
        removeEmptyAttributes:true,     //清楚空属性
        removeScriptTypeAttributes:true,//清除所有script标签中的type="text/javascript"属性
        removeStyleLinkTypeAttributes:true,//清除所有Link标签中的type="text/stylesheet"属性
        minifyJS:true,                      //压缩html中的js
        minifyCSS:true                      //压缩html中的css
    };
    gulp.src('demo/vue-router/address.html')
    .pipe(htmlmin(options))
    .pipe(rename('addressMin.html'))
    .pipe(gulp.dest('demo/vue-router')); 
});
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
    gulp.watch('demo/vue-router/address.html', ['html']);
    gulp.watch('demo/vue-router/css/*.css', ['minifycss']);
    gulp.watch('demo/vue-router/js/address.js', ['minifyjs']);
});


gulp.task('default',['html','minifycss','minifyjs','watch']);
