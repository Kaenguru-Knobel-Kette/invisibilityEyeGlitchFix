const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const concat = require('gulp-concat');
const zip = require('gulp-zip');

const zEditPath = 'C:/Users/user/Documents/Skyrim Tools/zEdit_Alpha_v0.5.3';

gulp.task('clean-dist', function() {
	return del('dist');
});

gulp.task('dist-index', function() {
	return gulp.src(['src/*.js', 'index.js'])
		.pipe(concat('index.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('dist-partials', function() {
	return gulp.src('partials/*.html')
		.pipe(gulp.dest('dist/partials'));
});

gulp.task('dist-module', function() {
	return gulp.src('module.json')
		.pipe(gulp.dest('dist'));
});

gulp.task('uninstall-in-zedit', function() {
	let moduleInfo = JSON.parse(fs.readFileSync('module.json')),
		installationPath = `${zEditPath}/modules/${moduleInfo.id}`;

	return del(installationPath, {force:true});
});

gulp.task('install-in-zedit', function() {
	let moduleInfo = JSON.parse(fs.readFileSync('module.json')),
		installationPath = `${zEditPath}/modules/${moduleInfo.id}`;

	return gulp.src('dist/**/*')
		.pipe(gulp.dest(installationPath));
});

gulp.task('build-release', function() {
	let moduleInfo = JSON.parse(fs.readFileSync('module.json')),
		moduleId = moduleInfo.id,
		moduleVersion = moduleInfo.version,
		zipFileName = `${moduleId}-v${moduleVersion}.zip`;

	return gulp.src('dist/**/*', { base: 'dist/'})
		.pipe(zip(zipFileName))
		.pipe(gulp.dest('releases'));
});

gulp.task('build-dist', gulp.parallel('dist-index', 'dist-partials', 'dist-module'));

gulp.task('build', gulp.series('clean-dist', 'build-dist'));

gulp.task('test', gulp.series('clean-dist', 'build-dist', 'uninstall-in-zedit', 'install-in-zedit'));

gulp.task('release', gulp.series('clean-dist', 'build-dist', 'build-release'));
