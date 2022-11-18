export const isNumber = (id: number | boolean): boolean => {
  if (typeof id === 'number') {
    return true;
  }
  return false;
};
