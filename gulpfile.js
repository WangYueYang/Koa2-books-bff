const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const rollup = require('gulp-rollup');
const replace = require('@rollup/plugin-replace');


function buildDev() {
  return watch('./src/server/**/*.js', { ignoreInitial: false })
    .pipe(
      babel({
        plugins: ['@babel/plugin-transform-modules-commonjs'],
        babelrc: false,
      })
    )
    .pipe(gulp.dest('dist/server'));
}

function buildProd() {
  return gulp
    .src('./src/server/**/*.js', { ignoreInitial: false })
    .pipe(
      babel({
        babelrc: false,
        plugins: ['@babel/plugin-transform-modules-commonjs'],
      })
    )
    .pipe(gulp.dest('dist/server'));
}

function cleanConfig() {
  return gulp
    .src('./src/server/config/index.js')
    .pipe(
      rollup({
        input: './src/server/config/index.js',
        output: {
          format: 'cjs',
        },
        plugins: [
          replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
          })
        ]
      })
    )
    .pipe(gulp.dest('dist/server/config'));
}

let build = null;

if ((process.env.NODE_ENV = 'deveploment')) {
  build = gulp.series(buildDev);
}

if ((process.env.NODE_ENV = 'production')) {
  build = gulp.series(buildProd, cleanConfig);
}

gulp.task('default', build);
