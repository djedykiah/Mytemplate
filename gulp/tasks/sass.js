'use strict';

module.exports = function() { 

	const shortConfig = {};
['border', 'borderRadius', 'color', 'fontSize', 'position', 'size', 'spacing'].forEach((val) => {
  shortConfig[val] = { skip: '_' };
}); 
	$.gulp.task('sass', function() {  
		const postcss = require('gulp-postcss');  
		const caralho = require('postcss-caralho');
		const words = require('curse-words-common');
		var processors = [ 
			caralho(words), 
			require('postcss-short')(shortConfig), 
			require('rucksack-css')({
				autoprefixer: false
			}), 
  		require("postcss-reporter")({ clearReportedMessages: true }),
			require('postcss-font-magician')(), 
			require('css-mqpacker')(),  
			require('postcss-fixes')(), 
			require('postcss-hocus'),
			require('postcss-pseudo-content-insert'),
			require('postcss-insert')(), 
			require('postcss-merge-rules')(), 
			require('postcss-single-line'),
			require('postcss-pxtorem')(),  
			require('css-declaration-sorter')({
				order: 'concentric-css'
			}), 
			require('postcss-preset-env')(Object.assign({
				stage: 0
			}))

			
		]
		return $.gulp.src('./src/style/app.scss')
			.pipe($.gp.sourcemaps.init()) 
			.pipe(postcss(processors,
				{
					syntax: require('postcss-scss')
				}
				
				))
			.pipe($.gp.sass()).on('error', $.gp.notify.onError({ title: 'Style' })) 
			.pipe($.gp.autoprefixer({ browsers: $.config.autoprefixerConfig })) 
	
			.pipe($.gp.sourcemaps.write()) 
			.pipe($.gulp.dest($.config.root + '/css'))
			.pipe($.browserSync.stream());
	})
};
