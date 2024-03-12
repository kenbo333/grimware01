// 日付
export const formatDateForDataGrid = (value) => {
  return value ? new Intl.DateTimeFormat("ja-JP").format(new Date(value)) : "";
};
