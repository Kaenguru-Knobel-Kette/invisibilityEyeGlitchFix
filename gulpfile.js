const fs = require('fs'),
      gulp = require('gulp'),
      clean = require('gulp-clean'),
      include = require('gulp-include'),
      zip = require('gulp-zip'),
      zEditPath = 'C:/Users/user/Documents/Skyrim Tools/zEdit_Alpha_v0.4.3';

gulp.task('clean', function() {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('build', ['clean'], function() {
    gulp.src('index.js')
        .pipe(include())
        .on('error', console.log)
        .pipe(gulp.dest('dist'));

    gulp.src('partials/*.html')
        .pipe(gulp.dest('dist/partials'));

    gulp.src('module.json')
        .pipe(gulp.dest('dist'));
});

gulp.task('clean-test', function() {
    let moduleInfo = JSON.parse(fs.readFileSync('module.json')),
        installationPath = `${zEditPath}/modules/${moduleInfo.id}`;

    return gulp.src(installationPath, {read: false})
        .pipe(clean({force: true}));
});

gulp.task('test', ['clean-test'], function() {
    let moduleInfo = JSON.parse(fs.readFileSync('module.json')),
        installationPath = `${zEditPath}/modules/${moduleInfo.id}`;

    gulp.src('dist/**/*')
        .pipe(gulp.dest(installationPath));
});

gulp.task('release', function() {
    let moduleInfo = JSON.parse(fs.readFileSync('module.json')),
        moduleId = moduleInfo.id,
        moduleVersion = moduleInfo.version,
        zipFileName = `${moduleId}-v${moduleVersion}.zip`;

    console.log(`Packaging ${zipFileName}`);

    gulp.src('dist/**/*', { base: 'dist/'})
        .pipe(zip(zipFileName))
        .pipe(gulp.dest('releases'));
});

gulp.task('default', ['build']);