/**
 * 指定されたオブジェクト内のキーの値を浮動小数点数に変換します。
 * 値が空文字列またはnullの場合、または浮動小数点数への変換に失敗した場合、
 * 対応するキーの値はnullに設定されます。変換に成功した場合、
 * 対応するキーの値は変換された浮動小数点数に更新されます。
 *
 * @param {Object} data - 変換を適用するキーを含むオブジェクト。
 * @param {string[]} keys - 浮動小数点数に変換するキーの配列。
 */
const convertToFloatOrNull = (data, keys) => {
  keys.forEach((key) => {
    // 現在のキーの値を取得
    const value = data[key];

    // 値が空文字列またはnullの場合、nullに設定
    if (value === "" || value === null) {
      data[key] = null;
    } else {
      // 値を浮動小数点数に変換
      const floatValue = parseFloat(value);
      // 変換が成功した場合（結果がNaNでない場合）、変換された値を設定
      if (!isNaN(floatValue)) {
        data[key] = floatValue;
      } else {
        // 変換に失敗した場合、エラーをログに記録し、nullに設定
        console.error(
          `Invalid input for '${key}', converting to float failed.`
        );
        data[key] = null;
      }
    }
  });
};

module.exports = convertToFloatOrNull;
