var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    path = require('path'),
    // rename = require('gulp-rename'),
    spawner = require('child_process').spawn,
    autoprefixer = require('gulp-autoprefixer'),
    mocha = require('gulp-spawn-mocha'),

    __publicDir = './public',
    public = {
        'css': path.join(__publicDir, '/stylesheets'),
        'js': path.join(__publicDir, '/js'),
      },
    assets = {
        'sass': ['./sass/**/[^_]*.{sass,scss}'],
        'sass-watch': ['./sass/**/*.{sass,scss}'],
        'js': ['./js_module/parts/*.js', './js_module/coplayer/*.js', './js_module/*.js'],
    },
    coreServerFiles = ['./app.js', './bin/*', './routes/*.js'],
    nodeServer;

gulp.task('concatScripts', function(){
  return gulp.src(assets['js'])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(public['js']));
});

gulp.task('jshint', function(){
  return gulp.src(public['js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
});

gulp.task('compileSass', function(){
  return gulp.src(assets['sass'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false,
      }))
    .pipe(gulp.dest(public['css']));
});

gulp.task('server', function(){
  if (nodeServer) nodeServer.kill();
  nodeServer = spawner('node', ['./bin/www'], {stdio: 'inherit'})
  nodeServer.on('close', function(exit){
    if (exit === 8) {
      gutil.log('Error detected, waiting for changes...');
    }
    nodeServer = undefined;
  });
});

process.on('exit', function(){
  if (nodeServer) nodeServer.kill();
});

gulp.task('watchAssets', function(){
  gulp.watch(assets['js'], ['concatScripts']);
  gulp.watch(public['js'], ['jshint']);
  gulp.watch(assets['sass-watch'], ['compileSass']);
});

gulp.task('watchServer', function(){
  gulp.watch(coreServerFiles, ['server']);
});

gulp.task('dev', ['concatScripts','jshint','compileSass','server','watchAssets','watchServer']);


/* Test Related */
const coPlayerSrc = './js_module/coplayer/coplayer.js';
// gulp.task('runCoplayerTest', function(){
// });

gulp.task('testCoplayer', function(){
  gulp.watch(coPlayerSrc);
});

gulp.task('lintAsset', function(){
  return gulp.src(assets['js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

const mochaDest = './test';
var testFiles = {
  
  'error': {
    depedencies: ['./js_module/parts/error.js', './test/tests/test_error.js'],
  },
  'coplayer': {
    depedencies: ['./js_module/coplayer/coplayer.js', './test/tests/test_coplayer.js'],
  },
}

gulp.task('test', function(){
  Object.keys(testFiles).forEach(function(key){
    testFiles[key].dest = path.join(mochaDest,key);
    gulp.task(key + 'RunTest', function(){
      return gulp.src(testFiles[key].dest, {read: false})
        .pipe(mocha({
          cwd: testFiles[key].dest,
          recursive: false,
          reporter: 'spec',
          colors: true,
        }));
    });
    gulp.task(key + 'GenerateTest', function(){
      return gulp.src(testFiles[key].depedencies)
        .pipe(concat('mocha_'+ key + '.js'))
        .pipe(gulp.dest(testFiles[key].dest));
    });
    gulp.watch(testFiles[key].depedencies, [key + 'GenerateTest']);
    gulp.watch(path.join(testFiles[key].dest,'*.js'), [key + 'RunTest']);    
  });
});