export const formatAsYen = (amount) => {
  if (amount === null) return "";

  return `¥${amount.toLocaleString()}`;
};
