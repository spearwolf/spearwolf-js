import assert from 'assert';

import { foo } from './Foo.js';

describe('Foo', () => {
  it('works', () => {
    assert.equal(false, false);
  });
  it('exists', () => {
    assert.equal(typeof foo, 'function');
  });
});
