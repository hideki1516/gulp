const gulp = require('gulp'); // gulpプラグインの読み込み
const sass = require('gulp-sass')(require('sass')); // Sassをコンパイルするプラグインの読み込み
const plumber = require('gulp-plumber'); // コンパイル時にエラーになっても中断しない
const browserSync = require('browser-sync'); // browser-syncプラグインの読み込み

const sassCompile = (done) => {
  gulp.src('./src/scss/*.scss') // src/scssのscssファイルを取得
    .pipe(plumber())
    .pipe(sass.sync({ // sassのコンパイルを実行
      outputStyle: 'expanded' // コンパイル後の整形
    }))
    .on('error', sass.logError) // sassのコンパイルエラーを表示
    .pipe(gulp.dest('./dist/css')); // コンパイル後の出力先を指定
  done();
};

// リロードするhtml
const reloadFile = (done) => {
  browserSync.init({
    server : {
      baseDir : './',
      index : 'index.html',
      directory: true,
    }
  });
  done();
};

// リロード設定
const reloadBrowser = (done) => {
  browserSync.reload();
  done();
};

// タスク化
exports.sassCompile = sassCompile; // sassのコンパイル処理を記述した変数をタスク化
exports.reloadFile = reloadFile;
exports.reloadBrowser = reloadBrowser;

// 監視ファイル（変更のたびにタスクを実行）
const watchFiles = (done) => {
  gulp.watch('./*.html', reloadBrowser);
  gulp.watch('./css/*.css', reloadBrowser);
  gulp.watch('./js/*/js',reloadBrowser );
  gulp.watch('./scss/*.scss', sassCompile); // 第1引数：監視するファイルのパス　第2引数：コンパイル処理の変数
  done();
};

// タスク実行
exports.default = gulp.series(
  watchFiles, sassCompile, reloadFile
);