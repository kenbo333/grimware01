/**
 * 指定されたオブジェクト内のキーの値を浮動小数点数に変換します。
 * 値が空文字列またはnullの場合、または浮動小数点数への変換に失敗した場合、
 * 対応するキーの値はnullに設定されます。変換に成功した場合、
 * 対応するキーの値は変換された浮動小数点数に更新されます。
 *
 * @param {Object} data - 変換を適用するキーを含むオブジェクト。
 * @param {string[]} keys - 浮動小数点数に変換するキーの配列。
 * @return {Object} 変換後のオブジェクト。
 */
const convertToFloatOrNull = (data, keys) => {
  keys.forEach((key) => {
    if (data[key] === "" || data[key] === null) {
      data[key] = null;
    } else {
      const floatValue = parseFloat(data[key]);
      data[key] = !isNaN(floatValue) ? floatValue : null;
    }
  });

  return data;
};

module.exports = convertToFloatOrNull;
