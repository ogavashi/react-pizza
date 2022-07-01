export const calcTotalSum = (items) => {
  return items.reduce((sum, item) => sum + item.price * item.count, 0);
};
