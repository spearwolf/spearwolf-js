/* eslint-env mocha */
import 'mocha/mocha.css';
import 'mocha/mocha.js';

mocha.setup('bdd');
mocha.checkLeaks();
mocha.globals(['parcelRequire']);

describe('utils', () => {

  require('../src/utils/findNextPowerOf2.spec.js');
  require('../src/utils/get.spec.js');
  require('../src/utils/isPowerOf2.spec.js');
  require('../src/utils/maxOf.spec.js');
  require('../src/utils/pick.spec.js');

});

describe('core', () => {

  require('../src/core/AABB2.spec.js');

});

mocha.run();
