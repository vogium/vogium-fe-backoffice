export interface IColumn<T> {
  key: keyof T | "actions";
  header: string;
  render?: (value: T[keyof T] | null, row: T) => React.ReactNode;
}
