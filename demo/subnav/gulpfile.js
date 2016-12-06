var gulp = require('gulp'),
htmlmin = require('gulp-htmlmin'),
minifycss = require('gulp-minify-css'),
less = require('gulp-less'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
del = require('del'),
rev = require('gulp-rev'),
revCollector = require('gulp-rev-collector'),
runSequence = require('run-sequence'),
postcss = require('gulp-postcss'),
plumber = require('gulp-plumber');

//路径
var path = {
    //生产环境
    bulid:{
        html:'./dist',
        css:'./dist/css',
        js:'./dist/js',
        image:'./dist/image'
    },
    //开发环境
    source:{
        html:'./src',
        css:'./src/css',
        js:'./src/js',
        image:'./src/image'
    }
}

//压缩
gulp.task('delhtml',function(){
    del([path.bulid.html + '/*.html'])
});
gulp.task('html',['delhtml'],function(){
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
    return gulp.src(path.source.html + '/*.html')
    .pipe(plumber())
    .pipe(htmlmin(options))
    .pipe(rename({suffix: '.min'}))  
    .pipe(gulp.dest(path.bulid.html)); 
});

gulp.task('revHtml', function () {
    return gulp.src(['dist/**/*.json', path.bulid.html + '/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest(path.bulid.html));
});

//postcss初体验
gulp.task('delcss',function(){
    del([path.bulid.css + '/*.css'])
});
gulp.task('css', ['delcss'],function() {
    var processors = [
        require('autoprefixer')(),
        require('postcss-font-magician')()    
    ];
    return gulp.src(path.source.css + '/*.css')
       	.pipe(postcss(processors))
       	.pipe(minifycss())   //执行压缩        
       	.pipe(plumber())
        .pipe(gulp.dest(path.bulid.css));
});

gulp.task('revCss', function(){
    return gulp.src(path.source.css + '/*.css')
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(plumber())
        .pipe(gulp.dest(path.bulid.css));
});

//编译less
gulp.task('less', function () {
    return gulp.src(path.source.css + '/*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(minifycss())
        .pipe(plumber())
        .pipe(gulp.dest(path.bulid.css));
});

gulp.task('deljs',function(){
    del([path.bulid.js + '/*.js'])
});

gulp.task('minifyjs',['deljs'], function() {
    return gulp.src(path.source.js + '/*.js')
        .pipe(plumber()) 
        .pipe(uglify())
        .pipe(plumber())    
        .pipe(gulp.dest(path.bulid.js));
});
gulp.task('revJs', function(){
    return gulp.src(path.bulid.js + '/*.js')
        .pipe(rev())
        .pipe(plumber())
        .pipe(rev.manifest())
        .pipe(plumber())
        .pipe(gulp.dest(path.bulid.js));
});

gulp.task('devSquce',function(done){
    condition = false;
    runSequence(
        ['revCss'],
        ['revJs'],
        ['revHtml'],
        done);
})

//监控
gulp.task('watch', function () {
    gulp.watch(path.source.html + '/*.html', ['html']);
    gulp.watch(path.source.js + '/*.js', ['minifyjs']);
    gulp.watch(path.source.css + '/*.less', ['less']);
    gulp.watch(path.source.css + '/*.css', ['css','revCss']);
});

gulp.task('default',['html','css','minifyjs','devSquce','watch']);
