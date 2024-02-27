/**
 * 指定された年、月、締め日文字列を元にその月の締め日を返す関数。
 *
 * @param {number} year - 年を指定
 * @param {number} month - 月を指定（0-11の範囲で、1月は0、12月は11）
 * @param {string} closingDayString - 締め日を文字列で指定（末日は "0"）
 * @return {string} 締め日（形式: "yyyy-mm-dd"）
 */
const getClosingDateForMonth = (year, month, closingDayString) => {
  // 末日の場合、その月の最後の日を取得。それ以外の場合は締め日を取得
  //（ただし、月の最後の日より後の日を指定した場合は月の最後の日を取得）
  const closingDay =
    closingDayString === "0"
      ? new Date(year, month + 1, 0).getDate()
      : Math.min(
          parseInt(closingDayString),
          new Date(year, month + 1, 0).getDate()
        );

  // 日付を2桁の文字列で整形する
  const formattedMonth = (month + 1).toString().padStart(2, "0");
  const formattedDay = closingDay.toString().padStart(2, "0");

  return `${year}-${formattedMonth}-${formattedDay}`;
};

/**
 * 指定された開始日と締め日文字列を元に、開始日から今日までの締め日リストを返す関数。
 *
 * @param {string} startDateString - 開始日を文字列で指定（形式: "yyyy-mm-dd"）
 * @param {string} closingDayString - 締め日を文字列で指定（末日は "0"）
 * @return {Array<string>} 締め日リスト（各日付は形式: "yyyy-mm-dd"）
 */
export const getClosingDatesList = (startDateString, closingDayString) => {
  const endDate = new Date();
  const [startYear, startMonth] = startDateString.split("-").map(Number);
  let currentYear = startYear;
  let currentMonth = startMonth - 1; // Dateオブジェクトの月は0から始まるため

  const closingDates = [];

  // 開始日から今日までの月ごとに締め日をリストに追加
  while (new Date(currentYear, currentMonth) <= endDate) {
    closingDates.push(
      getClosingDateForMonth(currentYear, currentMonth, closingDayString)
    );
    if (++currentMonth > 11) {
      // 年を跨ぐ場合の処理
      currentMonth = 0;
      currentYear++;
    }
  }

  return closingDates;
};

/**
 * 日付オブジェクトを"yyyy-mm-dd"形式の文字列にフォーマットする関数。
 *
 * @param {Date} date - フォーマットするDateオブジェクト。
 * @returns {string} "yyyy-mm-dd"形式の日付文字列。
 * @throws {TypeError} 引数がDateオブジェクトでない場合にスローされる。
 */
export const formatDate = (date) => {
  // 引数がDateオブジェクトのインスタンスであることを確認する。
  if (!(date instanceof Date)) {
    throw new TypeError("Provided argument is not a Date object.");
  }

  // 月を取得し、1桁の場合は先頭に0を追加する。
  let month = "" + (date.getMonth() + 1);
  if (month.length < 2) month = "0" + month;

  // 日を取得し、1桁の場合は先頭に0を追加する。
  let day = "" + date.getDate();
  if (day.length < 2) day = "0" + day;

  // 年を取得する。
  let year = date.getFullYear();

  // "yyyy-mm-dd"の形式で文字列を結合し、戻り値として返す。
  return [year, month, day].join("-");
};

/**
 * 二つの配列の間の差分要素を見つける関数。
 * 差分とは、一方の配列には含まれているが他方には含まれていない要素の集合です。
 *
 * @param {Array} arr1 - 比較の基準となる配列。
 * @param {Array} arr2 - 比較対象となる配列。
 * @returns {Array} 両方の配列間の差分要素を含む新しい配列。
 */
export const findDifference = (arr1, arr2) => {
  // 一方の配列に含まれ、他方に含まれない要素をフィルタリングする。
  const diff1to2 = arr1.filter((x) => !arr2.includes(x));
  const diff2to1 = arr2.filter((x) => !arr1.includes(x));

  // 両方の差分の配列を結合し、その結果を返す。
  return [...diff1to2, ...diff2to1];
};
