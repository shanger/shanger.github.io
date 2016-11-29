var gulp = require('gulp'),
htmlmin = require('gulp-htmlmin'),
minifycss = require('gulp-minify-css'),
babel = require('gulp-babel'),
less = require('gulp-less')
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
del = require('del'),
postcss = require('gulp-postcss'),
plumber = require('gulp-plumber'),
autoprefixer = require('autoprefixer');


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
    gulp.src('demo/vue-router/about.html')
    .pipe(htmlmin(options))
    .pipe(rename('aboutMin.html'))
    .pipe(gulp.dest('demo/vue-router')); 
});


//postcss初体验

gulp.task('css', function() {
    var processors = [
        autoprefixer({browsers:['last 3 versions'],
            cascade: false,
            remove: false
        })        
    ];
    return gulp.src('demo/vue-router/css/*.css') 
       .pipe(postcss([require('autoprefixer')({browsers: ['last 100 versions']})], {}))
       .pipe(minifycss())   //执行压缩
       .pipe(gulp.dest('demo/vue-router/compress'));
});

//编译less
gulp.task('less', function () {
    gulp.src('demo/vue-router/css/*.less')
        .pipe(less())
        .pipe(minifycss())
        .pipe(gulp.dest('demo/vue-router/compress/'));
});

gulp.task('minifyjs',['convertJS'],function() {
	del(['demo/vue-router/compress/*.js']);
    return gulp.src(['demo/vue-router/js/*.js','!demo/vue-router/js/es6.js'])
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('demo/vue-router/compress'));  //输出
});
// 编译并压缩js
gulp.task('convertJS', function(){
  return gulp.src('demo/vue-router/js/es6.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(rename('afterBabel.js'))
    .pipe(gulp.dest('demo/vue-router/js'));
})

//监控css
gulp.task('watch', function () {
    gulp.watch('demo/vue-router/about.html', ['html']);
    gulp.watch('demo/vue-router/js/*.js', ['minifyjs']);
    gulp.watch('demo/vue-router/css/*.less', ['less']);
    gulp.watch('demo/vue-router/css/*.css', ['css']);
});


gulp.task('default',['html','css','less','minifyjs','watch']);
