import { generateUuid, unpick } from '../utils';

export interface DataRefHints {

  id?: number | string;

  serial?: number;

  [key: string]: any;

}

const filterHints = unpick(['id', 'serial']);

/**
 * Generic data reference with a *type* and *serial number*.
 *
 * Each time you are setting the `data` property to a new value, the serial number will be increased.
 * Use `.touch()` if you want to increase the serial number without changing the value.
 *
 */
export class DataRef<T> {

  readonly type: number | string;

  readonly id: number | string;

  serial: number;

  private _data: T;
  private _hints = new Map<string, any>();

  constructor(type: number | string, data: T, hints: DataRefHints = null) {

    this.type = type;

    this._data = data;

    this.id = hints != null && hints.id != null ? String(hints.id) : generateUuid();

    this.serial = hints != null && typeof hints.serial === 'number' ? hints.serial : 1;

    const extraHints = filterHints(hints);
    if (extraHints != null) {
      Object.keys(extraHints).forEach((key: string) => {
        this._hints.set(key, hints[key]);
      });
    }

  }

  get data() {
    return this._data;
  }

  set data(next) {
    const current = this._data;

    if (next !== current) {
      this._data = next;
      this.touch();
    }
  }

  touch() {
    this.serial++;
  }

  /**
   * @returns `true` if *serial* is greater than 0 and equals to *serial* from `otherRef`
   */
  isSynced(otherRef: DataRef<any>) {
    const { serial } = this;
    return serial > 0 && serial === otherRef.serial;
  }

  /**
   * @returns the opposite of `isSynced()`
   */
  needSync(otherRef: DataRef<any>) {
    return !this.isSynced(otherRef);
  }

  /**
   * @param {DataRef} otherRef
   * @param {function} callbackFn
   */
  sync(otherRef: DataRef<any>, callbackFn: (data: T) => void) {
    if (this.needSync(otherRef)) {
      callbackFn(this.data);
      this.serial = otherRef.serial;
    }
  }

  /**
   * Returns `true` if a hint exists and the hint value is as expected.
   * If you leave out the expected value (call the method with just one argument)
   * the methods just ckecks if the hint exists (regardless ofthe value).
   */
  hasHint(hintKey: string, expectedValue?: any) {
    const hasHint = this._hints.has(hintKey);
    if (!hasHint || arguments.length === 1) {
      return hasHint;
    }
    return this._hints.get(hintKey) === expectedValue;
  }

  /**
   * Returns a hint value.
   */
  hint(hintKey: string) {
    return this._hints.get(hintKey);
  }
}
