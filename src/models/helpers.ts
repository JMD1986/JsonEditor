/**
 * Expresses an error during deserialization. Probably represents a server-side schema change.
 */
export class DtoError extends Error {
  constructor(typeName: string, detail: string, public readonly dto: object) {
    super(`Invalid json when deserializing a [${typeName}]: ${detail}`);
  }
}

/**
 * Require fields to be present on a DTO (they may be null if present)
 * @param from The class which has this requirement
 * @param on The DTO which needs to satisfy this requirement
 * @param names The names of the fields which are required to be defined
 * @throws {DtoError} All listed fields must be present on the DTO
 */
export function Require(
  from: NewableFunction,
  on: { [key: string]: any },
  ...names: string[]
) {
  const missing = names.filter((n) => on[n] === undefined);
  if (missing.length > 0) {
    throw new DtoError(from.name, `Missing fields [${missing.join(", ")}]`, on);
  }
}

/**
 * Guarantees the output to be at least T or null.
 */
export function AtLeastNull<T>(source: T | null | undefined): T | null {
  if (source === undefined) {
    return null;
  } else {
    return source;
  }
}

/**
 * Guarantees the output is a usable value.
 * @param fallback The value to use as a last resort.
 */
export function OrDefault<T>(source: T | null | undefined, fallback: T): T {
  if (source === undefined || source === null) {
    return fallback;
  } else {
    return source;
  }
}

/**
 * A string-to-T object (won't have functions or non-T properties)
 */
export type Dictionary<T> = { [key: string]: T };
/**
 * An object which at least has an 'Id' field
 */
export type Keyed = { Id: string };

/**
 * Dictionary<T> helpers
 */
export class D {
  /**
   * Map across the given Dictionary<T>, producing an array with one item per Dictionary key
   * @param input The source dictionary
   * @param func An operation on each value - and optionally, the key storing that value
   */
  public static map<T, U>(
    input: Dictionary<T>,
    func: (value: T, key?: string) => U
  ): Array<U> {
    return Object.keys(input).map((k) => func(input[k], k));
  }

  /**
   * Map across the given Dictionary<T>, producing a Dictionary<U> which doesn't touch the keys
   * @param input The source dictionary
   * @param func An operation on each value - and optionally, the key storing that value
   */
  public static mapValues<T, U>(
    input: Dictionary<T>,
    func: (value: T, key?: string) => U
  ): Dictionary<U> {
    return Object.keys(input).reduce((currentState, nextKey) => {
      //@ts-ignore
      currentState[nextKey] = func(input[nextKey], nextKey);
      return currentState;
    }, {});
  }

  public static Sum(input: number[]): number {
    return input.reduce(
      (runningTotal, nextNumber) => runningTotal + nextNumber,
      0
    );
  }
  //@ts-ignore

  public static uniq(a) {
    var seen = {};
    //@ts-ignore

    return a.filter(function (item) {
      //@ts-ignore

      return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
  }

  public static Filter(input: number[], predicate: (x: number) => boolean) {
    return input.reduce(
      (filteredSet, nextItem) =>
        //@ts-ignore
        predicate(nextItem) ? [...filteredSet, nextItem] : filteredSet,
      []
    );
  }

  /**
   * Produces a Dictionary<T> from an array of [string, T] tuples
   */
  public static from<T>(input: [string, T][]): Dictionary<T> {
    return input.reduce((obj, kvp) => {
      //@ts-ignore
      obj[kvp[0]] = kvp[1];
      return obj;
    }, {});
  }

  /**
   * Reduces a Dictionary<T> to some other type - could be another Dictionary, could be any collection, could even be a non-collection value
   * @param input The source Dictionary<T>
   * @param func An operation which is given the current state, the current value from the Dictionary<T>, and optionally the current key.
   * It returns a state to be used against the next value in the Dictionary.
   * @param seed The initial state to pass into the above function. Also the final value if the Dictionary<T> is empty.
   */
  public static reduce<T, U>(
    input: Dictionary<T>,
    func: ((state: U, next: T) => U) | ((state: U, next: T, key: string) => U),
    seed: U
  ) {
    return Object.keys(input).reduce(
      (prevState, currentKey) => func(prevState, input[currentKey], currentKey),
      seed
    );
  }

  /**
   * Produces a new Dictionary<T> which doesn't contain the given key.
   * @param input The source Dictionary<T>
   * @param key The key to drop.
   */
  public static drop<T>(input: Dictionary<T>, key: string): Dictionary<T> {
    return this.from(
      this.reduce(
        input,
        (d: [string, T][], v: T, k: string) => (k === key ? d : [...d, [k, v]]),
        []
      )
    );
  }

  /**
   * Produces a new Dictionary<T> where the provided value is present. If the value's 'Id' field existed before the operation,
   * it is overwritten. If not, it is added.
   * @param input The source Dictionary<T>
   * @param value The value to update or insert - must support an 'Id' field, which will be used as the key.
   */
  public static upsert<T extends Keyed>(
    input: Dictionary<T>,
    value: T
  ): Dictionary<T> {
    if (input[value.Id] === undefined || input[value.Id] === null) {
      return this.from([
        ...this.map(input, (v, k) => [k, v] as [string, T]),
        [value.Id, value],
      ]);
    } else {
      return this.from(
        this.map(
          input,
          (v, k) => [k, k === value.Id ? value : v] as [string, T]
        )
      );
    }
  }

  /**
   * Produces a new Dictionary<T> where the provided key is set to the provided value. If the key existed before,
   * it now equals the new value; if not, it is added.
   * @param input The source Dictionary<T>
   * @param key The key to guarantee
   * @param value The value to use when adding or replacing
   */
  public static guarantee<T>(
    input: Dictionary<T>,
    key: string,
    value: T
  ): Dictionary<T> {
    if (input[key] === undefined || input[key] === null) {
      return this.from([
        ...this.map(input, (v, k) => [k, v] as [string, T]),
        [key, value],
      ]);
    } else {
      return this.from(
        this.map(input, (v, k) => [k, k === key ? value : v] as [string, T])
      );
    }
  }
}
