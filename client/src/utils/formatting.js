export const formatAsYen = (amount) => {
  if (!amount) return;

  return `¥${amount.toLocaleString()}`;
};
