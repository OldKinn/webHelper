var path = require('path');
var process = require('child_process');
var gulp = require('gulp');
var gutil = require('gulp-util');
var zip = require('gulp-zip');
var react = require('gulp-react');
var uglify = require('gulp-uglify');
var del = require('del');
var webpack = require('webpack');
var pluginsFilter = require('./bower.filter');
var webpackConfig = require('./webpack.config');

var setting = {
    nwhome: 'E:/nw/nwjs-v0.12.3-win-x64',
    nwlib: 'E:/nw/nwjs-v0.12.3-win-x64/nw.exe'
};

//清空JS插件
gulp.task('remove:libs', function (callback) {
    del('./statics/libs').then(function () {
        callback();
    });
});

// 抽取JS插件
gulp.task('libs', ['remove:libs'], function (callback) {
    extractOneByOne(0, function (index) {
        console.log('共计 %d 个第三方插件', index);
        callback();
    });
});

//插件资源文件抽取
function extractOneByOne(index, callback) {
    if (index < pluginsFilter.length) {
        var plugin = pluginsFilter[index];
        console.log('插件抽取：%s %s', plugin.module, '执行中...');
        console.time('抽取完成：' + plugin.module);
        var options = new Object();
        if (plugin.base)
            options.base = plugin.base;
        var stream = gulp.src(plugin.src, options);
        stream.on('end', function () {
            console.timeEnd('抽取完成：' + plugin.module);
            index++;
            extractOneByOne(index, callback);
        });
        stream.pipe(gulp.dest(plugin.dest));
    } else {
        callback(index);
    }
}

//编译JSX文件
gulp.task('jsx', function () {
    return gulp.src([
        './src/views/*.jsx',
        './src/utils/utils.jsx'
    ], {base: './src'}).pipe(react()).pipe(gulp.dest('./dist'));
});

//合并JS代码
gulp.task('webpack', ['jsx'], function(callback) {
    var packConfig = Object.create(webpackConfig);
    webpack(packConfig, function (err, stats) {
        if (err) throw new gutil.PluginError('build', err);
        gutil.log('[build]', stats.toString({colors: true}));
        callback();
    });
});

gulp.task('move:js', function() {
    return gulp.src('./src/servers/server.js').pipe(gulp.dest('./dist'));
});

//压缩代码
gulp.task('uglify', ['move:js', 'webpack'], function () {
    //return gulp.src('./dist/*.js').pipe(uglify()).pipe(gulp.dest('./apps'));
    return gulp.src('./dist/*.js').pipe(gulp.dest('./apps'));
});

//打包程序
gulp.task('zip', ['uglify'], function () {
    return gulp.src([
        'index.html',
        'package.json',
        'apps/**',
        'statics/**',
        'node_modules/content-type-mime/**'
    ], {base: './'}).pipe(zip('app.zip')).pipe(gulp.dest('dist'));
});

//运行程序
gulp.task('default', ['zip'], function () {
    var target = path.join(__dirname, './dist/app.zip');
    process.execFile(path.join(setting.nwlib), [target]);
});

//--------------------------------------------------------
//--------------------------------------------------------
//--------------------------------------------------------
//复制zip文件到nwhome
gulp.task('package:copy', ['package:zip'], function () {
    return gulp.src('./dist/app.zip').pipe(gulp.dest(setting.nwhome));
});

//打包成exe文件
gulp.task('package:exe', ['package:copy'], function (callback) {
    var cmder = 'copy /B ' + path.join(setting.nwlib) + '+'
        + path.join(setting.nwhome, 'app.zip') + ' '
        + path.join(setting.nwhome, 'app.exe');
    process.exec(cmder, function (error) {
        callback();
    });
});

//运行exe文件
gulp.task('run', ['package:exe'], function () {
    process.execFile(path.join(setting.nwhome, 'app.exe'));
});