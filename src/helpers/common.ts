export const formatPrice = (rawPrice: number): string => {
  if (Number.isNaN(Number(rawPrice))) return "";
  return `${rawPrice.toLocaleString("vi-VN")} ETH`;
};
