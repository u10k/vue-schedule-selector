var pkg = require('./package.json');
var fs = require('fs');
var version = require('gulp-version-number');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var header = require('gulp-header');
var del = require('del');
var concat = require('gulp-concat');
var bump = require('gulp-bump');
var git = require('gulp-git');
var nodeCmd = require('node-cmd');


function getPackageJsonVersion () {
    // 这里我们直接解析 json 文件而不是使用 require，这是因为 require 会缓存多次调用，这会导致版本号不会被更新掉
    return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
};

var task = {
    layer: function() {
        gulp.src(['./src/**/*.css']).pipe(minify({
            compatibility: 'ie7',
        })).pipe(gulp.dest('./dist'));

        return gulp.src(['./src/layer.js','./src/xbim.js'])
            .pipe(version({
                'replaces' : [
                    [/#{VERSION_REPlACE}#/g, getPackageJsonVersion() ]
                ],
            }))
            .pipe(concat('xbim.js'))
            .pipe(uglify({
                    compress: {
                        drop_console: true,
                    },
                },
            ))
            .pipe(header(
                '/*! <%= pkg.realname %>-v<%= pkg.version %> <%= pkg.description %> <%= pkg.license %> License  <%= pkg.homepage %>  By <%= pkg.author %> */\n ;',
                {pkg: JSON.parse(fs.readFileSync('./package.json', 'utf8'))}))
            .pipe(gulp.dest('./dist'));

    },
    other: function() {
        gulp.src('./src/**/*.{png,gif,wav}')
            .pipe(rename({}))
            .pipe(gulp.dest('./dist'));
    },
};

gulp.task('clear', function(cb) { //清理
    return del(['./dist/*'], cb);
});
gulp.task('layer', task.minjs); //压缩PC版本
// gulp.task('mobile', task.mincss); //压缩Mobile文件
gulp.task('other', task.other); //移动一些配件

//打包发行版
var releaseDir = './release/zip/layer-v' + pkg.version;
gulp.task('clearZip', function(cb) { //清理
    return del(['./release/zip/*'], cb);
});
gulp.task('r', ['clearZip'], function() {
    gulp.src('./release/doc/**/*')
        .pipe(gulp.dest(releaseDir));

    return gulp.src([
        './dist/**/*'
        , '!./dist/**/moon'
        , '!./dist/**/moon/*',
    ]).pipe(gulp.dest(releaseDir + '/layer'));
});

//全部
gulp.task('default', ['clear'], function() {
    for (var key in task) {
        task[key]();
    }
});

gulp.task('update-patch', function () {
    return gulp.src(['./package.json'])
        .pipe(bump({type: "patch"}))
        .pipe(gulp.dest('./'));
});

gulp.task('update-minor', function () {
    return gulp.src(['./package.json'])
        .pipe(bump({type: "minor"}))
        .pipe(gulp.dest('./'));
});

gulp.task('update-major', function () {
    return gulp.src(['./package.json'])
        .pipe(bump({type: "major"}))
        .pipe(gulp.dest('./'));
});

gulp.task('commit-changes', function () {
    return gulp.src('.')
        .pipe(git.add({args: '-A'}))
        .pipe(git.commit(`[Prerelease] Bumped version number: ${getPackageJsonVersion()}`))
        .pipe(gulp.dest('./'))

});

gulp.task('create-new-tag', function (cb) {
    // var version = getPackageJsonVersion();
    // git.tag(pkg.version, 'Created Tag for version: ' + version, function (error) {
    git.tag(getPackageJsonVersion(), `Created Tag for version: ${getPackageJsonVersion()}`, function (error) {
        if (error) {
            return cb(error);
        }
        git.push('origin', 'master', {args: '--tags'}, cb);
    });
});

gulp.task('build-bundle', function () {
    nodeCmd.get(
        'npm run build-bundle',
        function(err, data){
            console.log('build-bundle success', data)
        }
    );
});

gulp.task('publish', function () {
    nodeCmd.get(
        'npm publish',
        function(err, data){
            console.log('publish success', data)
        }
    );
});

gulp.task('master-publish-patch', function (callback) {
    runSequence(
        'update-patch',
        // 'default',
        'build-bundle',
        // 'commit-changes',
        // 'create-new-tag',
        'publish',
        function (error) {
            if (error) {
                console.log(error.message);
            } else {
                console.log('RELEASE FINISHED SUCCESSFULLY');
            }
            callback(error);
        });
});

gulp.task('master-publish-minor', function (callback) {
    runSequence(
        'update-minor',
        'default',
        'commit-changes',
        'create-new-tag',
        'publish',
        function (error) {
            if (error) {
                console.log(error.message);
            } else {
                console.log('RELEASE FINISHED SUCCESSFULLY');
            }
            callback(error);
        });
});





