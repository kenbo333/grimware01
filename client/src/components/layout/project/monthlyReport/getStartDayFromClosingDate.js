/**
 * 指定された締め日から1か月前の開始日を計算して返します。
 * 締め日が月の最終日の場合、1か月前の月の最初の日を返します。
 * それ以外の場合、締め日の翌日から1か月前の日を返します。
 * コード変更の際はバックエンドも修正する。
 *
 * @param {string} closingDate - 締め日。'yyyy/mm/dd'または'yyyy-mm-dd'形式の文字列。
 * @returns {string} 計算された開始日。'yyyy-mm-dd'形式の文字列。
 */
export const getStartDayFromClosingDate = (closingDate) => {
  // 日付形式を統一する
  const formattedClosingDate = closingDate.replace(/\//g, "-");
  const date = new Date(formattedClosingDate);

  // 締め日が月の最終日かどうかを判断
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  if (date.getDate() === endOfMonth.getDate()) {
    // 締め日が月の最終日の場合、その月の最初の日を返す
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-01`;
  } else {
    // それ以外の場合、締め日の翌日から1か月前の日を計算
    // まず締め日の翌日を設定
    date.setDate(date.getDate() + 1);
    // 1か月前に設定
    date.setMonth(date.getMonth() - 1);

    // 結果の日付を'yyyy-mm-dd'形式でフォーマット
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
};
