/**
 * クエリパラメータを解析し、比較演算子やブール値を含むオブジェクトに変換します。
 * キーに比較演算子(_gt, _gte, _lt, _lte)が含まれている場合、
 * そのキーはオブジェクト内で対応するフィールドの条件として解析されます。
 * "true"または"false"の文字列値はブール値に変換されます。
 * それ以外の値は、指定されたキーに直接割り当てられます。
 *
 * @param {Object} query - クエリパラメータを含むオブジェクト。
 *                          キーと値のペアはクエリ文字列から抽出されたものです。
 * @returns {Object} 演算子、ブール値、一般値が解析された新しいオブジェクト。
 *                   このオブジェクトはAPI呼び出しやデータベースクエリの条件として使用できます。
 *
 * @example
 * // 比較演算子とブール値の変換を含むクエリオブジェクトを返します
 * const query = queryObject({
 *   "price_gte": "100",
 *   "available": "true",
 *   "category": "electronics"
 * });
 * // 戻り値は以下のようになります：
 * // {
 * //   price: { gte: "100" },
 * //   available: true,
 * //   category: "electronics"
 * // }
 */
const queryObject = (query) => {
  const object = {};
  for (const [key, value] of Object.entries(query)) {
    // キー名に特定の比較演算子(_gt, _gte, _lt, _lte)が含まれているかどうかをチェック
    const operatorMatch = key.match(/(.*)(_(gt|gte|lt|lte))$/);
    if (operatorMatch) {
      // 比較演算子を含む場合、フィールド名と演算子を抽出
      const [, fieldName, , operator] = operatorMatch;
      object[fieldName] = {
        ...object[fieldName],
        [operator]: value,
      };
    } else if (value === "true" || value === "false") {
      // 値が文字列の"true"または"false"の場合、それをboolean値に変換
      object[key] = value === "true";
    } else {
      // それ以外の場合、キーと値のペアをそのままオブジェクトに追加
      object[key] = value;
    }
  }
  return object;
};

/**
 * 指定された日付から1か月後の日付を計算して返します。
 * ただし、日付の加算によって月が飛び越える場合（例: 1月31日からの1か月後は3月になる場合）、
 * 加算後の月の最終日を返します。
 *
 * @param {string} sel - 'yyyy/mm/dd'形式の日付文字列。
 * @returns {string} 加算後の日付を'yyyy-mm-dd'形式の文字列で返します。
 */
const getOneMonthAfter = (sel) => {
  // 日付の区切り文字をスラッシュからハイフンに変更
  let formattedSel = sel.replace(/\//g, "-");

  // Date オブジェクトを生成
  let date = new Date(formattedSel);
  let originalMonth = date.getMonth();
  let originalDay = date.getDate();

  // 日付に1か月を加算
  date.setMonth(originalMonth + 1);
  let newMonth = date.getMonth();

  // 月が2ヶ月分進んでしまっている場合の調整
  if ((newMonth - originalMonth) % 12 > 1) {
    // 加算後の月の最終日に設定するため、日付を0に設定
    date = new Date(date.getFullYear(), newMonth, 0);
  }

  // yyyy-mm-dd 形式で結果を文字列化
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

module.exports = { queryObject, getOneMonthAfter };
