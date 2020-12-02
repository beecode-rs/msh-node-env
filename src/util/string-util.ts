export const stringUtil = {
  toSnakeCase: (str: string): string =>
    str &&
    (str.trim().match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) || [])
      .map((x) => x.toLowerCase())
      .join('_'),
  toSnakeUpperCase: (str: string): string => stringUtil.toSnakeCase(str).toUpperCase(),
}
