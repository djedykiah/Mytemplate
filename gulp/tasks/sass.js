'use strict';

module.exports = function() { 
	const postcss = require('gulp-postcss');
	$.gulp.task('sass', function() {
		return $.gulp.src('./src/style/app.scss')
			.pipe($.gp.sourcemaps.init())
			.pipe($.gp.sass()).on('error', $.gp.notify.onError({ title: 'Style' })) 
			.pipe($.gp.autoprefixer({ browsers: $.config.autoprefixerConfig }))
			.pipe($.gp.sourcemaps.write()) 
			.pipe(postcss([
				require('postcss-short')()
			]))
			.pipe($.gulp.dest($.config.root + '/css'))
			.pipe($.browserSync.stream());
	})
};
