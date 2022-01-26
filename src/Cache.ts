export type KeyType = string | number;

class Entity<ValueType = any> {
  private cache = new Map<string, ValueType>();

  get(keys: KeyType[]): ValueType | null {
    return this.cache.get(keys.join('%')) || null;
  }

  update(
    keys: KeyType[],
    valueFn: (origin: ValueType | null) => ValueType | null,
  ) {
    const path = keys.join('%');
    const prevValue = this.cache.get(path)!;
    const nextValue = valueFn(prevValue);

    if (nextValue === null) {
      this.cache.delete(path);
    } else {
      this.cache.set(path, nextValue);
    }
  }
}

export default Entity;
