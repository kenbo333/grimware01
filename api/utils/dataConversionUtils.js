/**
 * 指定されたオブジェクト内のキーの値を浮動小数点数に変換するか、
 * 空文字列またはnullの場合はnullに設定します。変換に失敗した場合もnullを設定します。
 * @param {Object} data - 変換するキーを含むオブジェクト
 * @param {Array} keys - 変換するキーの配列
 */
const convertToFloatOrNull = (data, keys) => {
  keys.forEach((key) => {
    const value = data[key];
    if (value === "" || value === null) {
      data[key] = null;
    } else {
      const floatValue = parseFloat(value);
      if (!isNaN(floatValue)) {
        data[key] = floatValue;
      } else {
        console.error(
          `Invalid input for '${key}', converting to float failed.`
        );
        data[key] = null;
      }
    }
  });
};

module.exports = convertToFloatOrNull;
