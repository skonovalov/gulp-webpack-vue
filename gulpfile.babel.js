import gulp          from 'gulp';
import nunjucks      from 'gulp-nunjucks';
import render        from 'gulp-nunjucks-render';
import del           from 'del';
import stylus        from 'gulp-stylus';
import webpack       from 'webpack';
import webpackStream from 'webpack-stream';
import named         from 'vinyl-named';
import path          from 'path';
import autoprefixer  from 'autoprefixer';
import postcss       from 'gulp-postcss';
import cleanCss      from 'gulp-clean-css';
import sourcemaps    from 'gulp-sourcemaps';
import gulpif        from 'gulp-if';
import newer         from 'gulp-newer';
import UglifyJsPlugin from 'uglifyjs-3-webpack-plugin';
/* import wpManifest     from 'webpack-manifest-plugin'; */
import iconfont from  'gulp-iconfont';
import iconfontCss from 'gulp-iconfont-css';
import consolidate from 'gulp-consolidate';
import bs from 'browser-sync';
import debug from 'gulp-debug';

import VueLoaderPlugin from 'vue-loader/lib/plugin';

const browserSync = bs.create();

const dir = {
	dist: './dist/',
	src : './src/'
};
const isDevelopment = process.env.NODE_ENV !== 'production';

gulp.task('clean', () => {
	return del(['./dist']);
});

gulp.task('images', () => {
	return gulp.src(`${dir.src}images/*.*`, {since: gulp.lastRun('images')})
		.pipe(newer(`${dir.dist}`))
		.pipe(gulp.dest(`${dir.dist}images`));
});

gulp.task('styles', () => {
	let plugins = [
		autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		})
	];

	return gulp.src(`${dir.src}css/style.styl`)
		.pipe(gulpif(isDevelopment, sourcemaps.init()))
		.pipe(stylus({
			'include css': true
		}))
		.pipe(postcss(plugins))
		.pipe(gulpif(! isDevelopment, cleanCss()))
		.pipe(gulpif(isDevelopment, sourcemaps.write()))
		.pipe(debug({title: 'styles'}))
		.pipe(gulp.dest(`${dir.dist}css/`))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('template', () => {
	return gulp.src(`${dir.src}template/*.html`)
		.pipe(newer(`${dir.dist}`))
		.pipe(nunjucks.compile())
		.pipe(debug({title: 'html'}))
		.pipe(gulp.dest(`${dir.dist}`));
});

gulp.task('scripts', () => {
	return gulp.src(`${dir.src}js/*.js`)
		.pipe(named())
		.pipe(newer(`${dir.dist}js`))
		.pipe(webpackStream({
			/* watch     : isDevelopment, */
			devtool   : isDevelopment ? 'cheap-eval-source-map' : false,
			output    : {
				publicPath: '/js/',
				filename  :'[name].js'
			},
			module : {
				rules: [
					{
						test: /\.(js|jsx)$/,
						exclude: /(node_modules)/,
						loader: 'babel-loader',
						query: {
							presets: [
								['es2015'],
							],
						},
					},
					{
						test  : /\.vue$/,
						loader: 'vue-loader'
					}
				]
			},
			resolve: {
				alias: {
					'vue$': 'vue/dist/vue.esm.js'
				}
			},
			plugins: getPlugins()
		}, webpack))
		.pipe(gulp.dest(`${dir.dist}js`));
});

gulp.task('fonts', () => {
	return gulp.src([`${dir.src}fonts/*.svg`])
		.pipe(iconfont({
			fontName: 'iconfont',
			formats: ['ttf', 'eot', 'woff', 'woff2'],
			appendCodepoints: true,
			appendUnicode: false,
			normalize: true,
			fontHeight: 1000,
			centerHorizontally: true
		}))
		.on('glyphs', function(glyphs, options) {
			gulp.src(`${dir.src}fonts/font.styl`)
				.pipe(consolidate('lodash', {
					glyphs: glyphs,
					fontPath: `../fonts/`,
					fontName: options.fontName,
					fontDate: new Date().getTime()
				}))
				.pipe(gulp.dest(`${dir.src}css/fonts/`));
		})
		.pipe(gulp.dest(`${dir.dist}fonts/`));
});

gulp.task('serve', () => {
	browserSync.init({
		server: {
			baseDir: './dist'
		}
	});

	browserSync.watch(`${dir.dist}**/*`).on('change', browserSync.reload);
});

gulp.task('watch', () => {
	gulp.watch(`${dir.src}template/**/*`, gulp.series('template'));
	gulp.watch(`${dir.src}css/**/*`, gulp.series('styles'));
	gulp.watch(`${dir.src}js/**/*`, gulp.series('scripts'));
});

gulp.task('build', gulp.series(
		'clean',
		gulp.series('fonts','styles'),
		gulp.parallel('scripts', 'template', 'images')
	)
);

gulp.task('develop', gulp.series(
	'build',
	gulp.parallel('watch', 'serve')
	)
);

function getPlugins() {
	let plugins = [];

	plugins.push(new webpack.DefinePlugin({
		'process.env': {
			'NODE_ENV': isDevelopment
		}
	}));

	plugins.push(new webpack.NoEmitOnErrorsPlugin());

	plugins.push(new webpack.optimize.CommonsChunkPlugin({
		name     : 'common',
		minChunks: 2,

	}));

	plugins.push(new VueLoaderPlugin());

	if (! isDevelopment) {
		plugins.push(new UglifyJsPlugin({
			exclude : /(node_modules)/,
			test    : /\.js$/i,
			parallel: true,
			cache   : true
		}));
	}/*  else {
		plugins.push(new wpManifest());
	} */

	return plugins;
}