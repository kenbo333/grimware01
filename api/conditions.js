//クエリをデータに格納
const queryObject = (query) => {
  const object = {};
  for (const [key, value] of Object.entries(query)) {
    const operatorMatch = key.match(/(.*)(_(gt|gte|lt|lte))$/);
    if (operatorMatch) {
      // _で比較演算追加
      const [, fieldName, , operator] = operatorMatch;
      object[fieldName] = {
        ...object[fieldName],
        [operator]: value,
      };
    } else if (value === "true" || value === "false") {
      // booleanに変換
      object[key] = value === "true";
    } else {
      object[key] = value;
    }
  }
  return object;
};

module.exports = { queryObject };
