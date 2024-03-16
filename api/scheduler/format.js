/**
 * 指定されたDateオブジェクトを"yyyy-mm-dd"形式の文字列に変換します。
 *
 * @param {Date} date - 変換するDateオブジェクト。
 * @returns {string} "yyyy-mm-dd"形式の日付文字列。
 */
const formatDateToString = (date) => {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

module.exports = formatDateToString;
