import gulp from 'gulp';

import config from './startum-config';
import path from 'path';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';

// Pages
import pug from 'gulp-pug';

// Styles
import postcss from 'gulp-postcss';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

let processors = [
  precss,
  autoprefixer({browsers: ['last 2 versions']}),
  cssnano
];

// Scripts
import webpack from 'webpack-stream';
import UglifyJsPlugin from 'webpack-uglify-js-plugin';

// BrowserSync Server & Livereload
import browserSync from 'browser-sync';
let sync = browserSync.create();

gulp.task('pages', () => {
  return gulp.src(config.src.pages + '*.' + config.templater.extName)
    .pipe(plumber())
    .pipe(pug(config.templater.options))
    .pipe(gulp.dest(config.build));
});

gulp.task('styles', () => {
  return gulp.src(config.src.components + '*.' + config.preprocessor.extName)
    .pipe(plumber())
    .pipe(postcss(processors))
    .pipe(rename((path) => {
      path.basename = config.preprocessor.entry;
      path.extname = '.css';
    }))
    .pipe(gulp.dest(config.build + 'assets/css'));
});

gulp.task('scripts', () => {
  return gulp.src(config.src.components + config.bundler.entry + '.' + config.bundler.extName)
    .pipe(plumber())
    .pipe(webpack({
      devtool: 'source-map',
      // plugins: [new UglifyJsPlugin({
      //   compress: {
      //     // don't show unreachable variables etc
      //     warnings:     false,
      //     drop_console: true,
      //     unsafe:       true
      //   }
      // })],
      entry: [
        // Set up an ES6-ish environment
        // 'babel-polyfill',

        // Add your application's scripts below
        config.src.components + config.bundler.entry,
      ],
      output: {
        filename: '[name].js',
      },
      module: {
        loaders: [
          {
            loader: 'babel-loader',

            // Skip any files outside of your project's `src` directory
            include: [
              path.resolve(__dirname, 'src'),
            ],

            // Only run `.js` and `.jsx` files through Babel
            test: /\.jsx?$/,

            // Options to configure babel with
            query: {
              cacheDirectory: true,
              plugins: ['transform-runtime'],
              presets: ['es2015', 'stage-0', 'react'],
            }
          },
        ]
      },
    }))
    .pipe(gulp.dest(config.build + 'assets/js'));
});

gulp.task('serve', () => {
  sync.init({
    server: {
      baseDir: config.build
    }
  });
  gulp.watch('./src/pages/**/*.pug').on('change', () => {
    sync.reload;
    gulp.start('pages');
  });
  gulp.watch('./src/components/**/*.post.css').on('change', () => {
    sync.reload;
    gulp.start('styles');
  });
  gulp.watch('./src/components/**/*.js').on('change', () => {
    sync.reload;
    gulp.start('scripts');
  });
});

gulp.task('run', ['pages', 'styles', 'scripts']);

gulp.task('default', ['run', 'serve']);
