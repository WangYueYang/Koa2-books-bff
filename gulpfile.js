const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');

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

let build = null;

if ((process.env.NODE_ENV = 'deveploment')) {
  build = gulp.series(buildDev);
}

gulp.task('default', build);
