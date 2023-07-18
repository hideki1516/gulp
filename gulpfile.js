const gulp = require('gulp'); // gulpプラグインの読み込み
const sass = require('gulp-sass')(require('sass')); // Sassをコンパイルするプラグインの読み込み
const browserSync = require('browser-sync'); // browser-syncプラグインの読み込み

const sassCompile = (done) => {
  gulp.src('./src/scss/*.scss') // src/scssのscssファイルを取得
    .pipe(sass.sync({ // sassのコンパイルを実行
      outputStyle: 'expanded' // コンパイル後の整形
    }))
    .on('error', sass.logError) // sassのコンパイルエラーを表示
    .pipe(gulp.dest('./dist/css')); // コンパイル後の出力先を指定
  done();
};

// タスク化
exports.sassCompile = sassCompile; // sassのコンパイル処理を記述した変数をタスク化

// 監視ファイル（変更のたびにタスクを実行）
const watchFile = (done) => {
  gulp.watch('./src/scss/*.scss', sassCompile); // 第1引数：監視するファイルのパス　第2引数：コンパイル処理の変数
  done();
};

// タスク実行
exports.default = gulp.series(
  watchFile, sassCompile
);