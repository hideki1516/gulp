// gulpプラグインの読み込み
const gulp = require('gulp');

// Sassをコンパイルするプラグインの読み込み
const sass = require('gulp-sass')(require('sass'));

// タスクの作成
gulp.task('default', () => {
  return gulp.watch('src/scss/style.scss', () => { // style.scssが更新された場合の処理
    return (
      gulp
        .src('src/scss/style.scss') // style.scssを取得
        .pipe(sass({ // sassのコンパイルを実行
          outputStyle: 'expanded', // コンパイル後の整形
        })
        .on('error', sass.logError) // sassのコンパイルエラーを表示
        )
        .pipe(gulp.dest('dist/css')) // cssフォルダーに保存
    );
  });
});