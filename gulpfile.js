var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    path = require('path'),
    spawner = require('child_process').spawn,
    autoprefixer = require('gulp-autoprefixer'),

    __publicDir = './public',
    public = {
        'css': path.join(__publicDir, '/stylesheets'),
        'js': path.join(__publicDir, '/js'),
      },
    assets = {
        'sass': ['./sass/**/[^_]*.{sass,scss}'],
        'sass-watch': ['./sass/**/*.{sass,scss}'],
        'js': ['./js_module/**/*.js'],
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
  gulp.run('concatScripts');
  gulp.watch(assets['js'], ['concatScripts']);

  gulp.run('compileSass');
  gulp.watch(assets['sass-watch'], ['compileSass']);
});

gulp.task('watchServer', function(){
  gulp.run('server');
  gulp.watch(coreServerFiles, ['server']);
});

gulp.task('default', ['watchAssets','watchServer']);