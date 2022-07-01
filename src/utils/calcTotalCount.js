export const calcTotalCount = (items) => {
  return items.reduce((count, item) => count + item.count, 0);
};
