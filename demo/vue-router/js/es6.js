'use strict';

var a = 1,
    b = 2,
    c = 3;

var dirs = {
	src: './src',
	dest: 'dest'
};
var es6Path = {
	src: '${dirs.src}/' + '*.js',
	dest: '${dirs.dest}'
};
gulp.task('babel', function () {
	return gulp.src(es6Path.src).pipe(babel()).pipe(gulp.dest(es6Path.dest));
});

gulp.task('watch', function () {
	gulp.watch(es6Path.src, ['babel']);
});