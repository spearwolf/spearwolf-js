/* eslint-env mocha */
import 'mocha/mocha.css';
import 'mocha/mocha.js';

mocha.setup('bdd');
mocha.checkLeaks();
mocha.globals(['parcelRequire']);

require('../Foo.spec.js');

mocha.run();
