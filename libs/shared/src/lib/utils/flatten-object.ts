export function flattenObject(input: {}): { [key: string]: any } {
  const result = {};

  for (const inputKey in input) {
    if (!input.hasOwnProperty(inputKey)) continue;

    if (typeof input[inputKey] === 'object' && input[inputKey] !== null) {
      const flatObject = this.flattenObject(input[inputKey]);
      for (const flatObjectKey in flatObject) {
        if (!flatObject.hasOwnProperty(flatObjectKey)) continue;

        result[inputKey + '.' + flatObjectKey] = flatObject[flatObjectKey];
      }
    } else {
      result[inputKey] = input[inputKey];
    }
  }
  return result;
}
