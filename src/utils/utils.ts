export const parseIntValue = (numberLike: string | number) => {
  //Adding ts-ignore cause parseInt indeed can receive an actual number, it will be converted by .toString() according to
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt#parameters
  // @ts-ignore
  const parsed = parseInt(numberLike, 10);
  if (isNaN(parsed)) throw new Error(`Unable to parse argument '${numberLike}' as an integer`);
  return parsed;
};
export const dangerousDeepClone = (obj: unknown) => JSON.parse(JSON.stringify(obj));
export const isEven = (value: number) => value % 2 === 0;
export const isOdd = (value: number) => !isEven(value);
