/* eslint-env mocha */
import assert from 'assert';
import * as THREE from 'three';

describe('THREE', () => {
  it('REVISION', () => {
    assert.ok(parseInt(THREE.REVISION, 10) >= 100, 'three.js revision should be >= 100');
  });
});
