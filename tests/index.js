/* eslint-env mocha */
import 'mocha/mocha.css';
import 'mocha/mocha.js';

mocha.setup('bdd');
mocha.checkLeaks();
mocha.globals(['parcelRequire']);

require('../src/Foo.spec.js');
require('../src/Three.spec.js');

mocha.run();
