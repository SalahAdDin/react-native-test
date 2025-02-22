export const sortObjectsByKey = <T>(array: Array<T>, key: keyof T): Array<T> =>
  [...array].sort((a, b) => {
    if (a[key] > b[key]) return -1;
    if (a[key] < b[key]) return 1;
    return 0;
  });
