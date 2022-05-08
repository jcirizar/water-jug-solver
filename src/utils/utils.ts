export const parseIntValue = (numberLike: string) => {
  const parsed = parseInt(numberLike, 10);
  if (isNaN(parsed)) throw new Error(`Unable to parse argument '${numberLike}' as an integer`);
  return parsed;
};
export const dangerousDeepClone = (obj: unknown) => JSON.parse(JSON.stringify(obj));
export const isEven = (value: number) => value % 2 === 0;
export const isOdd = (value: number) => !isEven(value);
