# spearwolf-js
various javascript (+ typescript types) helpers and classes for various webgl experiments!

## Development Setup

You will need [Node.js](https://nodejs.org/) **version v10+**.

After cloning the repo, run:

```sh
$ npm i
```

To start the examples, run:

```sh
$ npm start
```

To build and watch all tests, run:

```sh
$ npm run test:watch
```

to run the tests in your browser, start:

```sh
$ npm run test:serve
```

.. you should run both `test:*` tasks in parallel for development.

## Project Structure

- __`src`__: contains the source code. codebase is written in state-of-the-art modern javascript (ES2017 or whatever the latest version is at the moment)

- __`types`__: contains manually handwritten type definitions for typescript. Use `npm run test:types` to test the types.

  - `types/test/`: contains the tests for the type definitions

- __`tests`__: the starting point for the tests. the tests are written with [Mocha](https://mochajs.org/). Put in here all your assets needed for testing.

