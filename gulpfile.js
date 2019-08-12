const gulp = require('gulp');
const { createProject } = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const del = require('del');
const tslint = require('tslint');
const gulpTsLint = require('gulp-tslint');
const gulpIgnore = require('gulp-ignore');

const tsProject = createProject('tsconfig.json');

const lint = () =>
  gulp
    .src(['src/**/*.ts'], { nodir: true })
    .pipe(gulpTsLint({ program: tslint.Linter.createProgram('tsconfig.json') }))
    .pipe(gulpTsLint.report());

const typeCheck = () =>
  gulp
    .src(['src/**/*.ts'], { nodir: true })
    .pipe(tsProject())
    .dts.pipe(gulpIgnore.exclude(['**/__tests__/**', '**/examples/**']))
    .pipe(gulp.dest('./dist'));

const transpile = () =>
  gulp
    .src(['src/**/*.ts', '!**/__tests__/**', '!**/examples/**'], { nodir: true })
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'));

const copyConfig = () => gulp.src('package.json').pipe(gulp.dest('./dist'));

const build = gulp.series(lint, typeCheck, transpile, copyConfig);

const clean = () => del('./dist');

module.exports = {
  lint,
  typeCheck,
  transpile,
  copyConfig,
  build,
  clean,
  default: gulp.series(clean, build)
};
