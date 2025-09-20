export interface IDatabaseResource<T, S> {
  create(data: S): Promise<T>;
  update(id: string, data: Partial<S>): Promise<T | null>;
  get(id: string): Promise<T | null>;
  find(data: Partial<S>): Promise<T | null>;
  findAll(data: Partial<S>): Promise<T[]>;
  delete(id: string): Promise<T | null>;
}
