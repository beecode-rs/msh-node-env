export interface ConvertStrategy<T> {
  convert(str: string): T | undefined
}
