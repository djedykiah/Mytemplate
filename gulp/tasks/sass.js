'use strict';

module.exports = function() { 

	const shortConfig = {};
['border', 'borderRadius', 'color', 'fontSize', 'position', 'size', 'spacing'].forEach((val) => {
  shortConfig[val] = { skip: '_' };
}); 
	$.gulp.task('sass', function() {  
		var postcss = require('gulp-postcss'); 
		var processors = [ 
			require('postcss-short')(shortConfig), 
			require('rucksack-css')({
				autoprefixer: false
			}),
			require('postcss-font-magician')(), 
			require('css-mqpacker')(), 
			require('postcss-pxtorem')(), 
			require('postcss-sorting')({
				'order': [
					'alphabetical'
				]
			})
			
		]
		return $.gulp.src('./src/style/app.scss')
			.pipe($.gp.sourcemaps.init())
			.pipe($.gp.sass()).on('error', $.gp.notify.onError({ title: 'Style' })) 
			.pipe($.gp.autoprefixer({ browsers: $.config.autoprefixerConfig })) 
			.pipe(postcss(processors))
			.pipe($.gp.sourcemaps.write()) 
			.pipe($.gulp.dest($.config.root + '/css'))
			.pipe($.browserSync.stream());
	})
};
