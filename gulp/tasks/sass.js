'use strict';

module.exports = function() { 

	const shortConfig = {};
['border', 'borderRadius', 'color', 'fontSize', 'position', 'size', 'spacing'].forEach((val) => {
  shortConfig[val] = { skip: '_' };
}); 
	$.gulp.task('sass', function() {  
		var postcss = require('gulp-postcss'); 
		var sorting = require('postcss-sorting')
		var processors = [ 
			require('postcss-short')(shortConfig), 
			require('rucksack-css')({
				autoprefixer: false
			}),
			require('postcss-font-magician')(), 
			require('css-mqpacker')(), 
			require('postcss-pxtorem')(), 
			sorting({
				"order": [
					"custom-properties",
					"dollar-variables",
					"declarations",
					"at-rules",
					"rules"
					],
					"properties-order": [ "position", "top", "right", "bottom", "left", "z-index", "display", "float", "width", "height", "font", "font-size", "line-height", "color", "text-align", "background-color", "background", "border", "border-radius", "box-shadow", "padding", "margin", "opacity"]
			})
			
		]
		return $.gulp.src('./src/style/app.scss')
			.pipe($.gp.sourcemaps.init())
			.pipe($.gp.sass()).on('error', $.gp.notify.onError({ title: 'Style' })) 
			.pipe($.gp.autoprefixer({ browsers: $.config.autoprefixerConfig })) 
			.pipe(postcss(processors,
			{
				syntax: require('postcss-scss')
			}
			))
			.pipe($.gp.sourcemaps.write()) 
			.pipe($.gulp.dest($.config.root + '/css'))
			.pipe($.browserSync.stream());
	})
};
