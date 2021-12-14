const gulp = require('gulp');
const babel = require('gulp-babel');


function buildDev() {
  return gulp.src('./src/server/**/*.js')
    .pipe(
      babel({
        plugins: ["@babel/plugin-transform-modules-commonjs"],
        babelrc: false
      })
    )
    .pipe(gulp.dest('dist/server'))
}

exports.default = gulp.series(buildDev);