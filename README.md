# Redux Compose

Higher Order functions to aid in composing Redux Reducers.

## Table of Contents

- [Motivation](#motivation)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [`composeReducers`](#composereducersreducers)
  - [`forPath`](#forpathpathpartpathpartfunction-substatereducer)
  - [`ofType`](#oftypetypestringtypepredicatetypestringtypepredicate-reducer)
  - [`withDefault`](#withdefaultdefaultstate-reducer)
- [Contributing](#contributing)
- [License](#license)

## Motivation

While redux provides a clean separation of concerns by distinguishing actions and reducers the examples
given don't provide a lot of examples on how to break down complex reducers into distinct and testable
components. The provided `combineReducers` can act as a starting point but doesn't scale
up to lots of reducer logic.

This library exports a set of higher order functions that allow you to write very
focused reducers and compose them into a single larger complex reducer. Additionally
by leveraging these helper functions we're able to gain large amounts of type inference in
order to reduce some of the typing overhead with Redux

## Installation

```bash
npm add --save redux-compose
```

```bash
yarn add redux-compose
```

## Usage

All functions are exported as a ESModule from the index file, or as ESModules from independent files.

```ts
// either
import { composeReducers } from 'redux-compose';
// or
import { composeReducers } from 'redux-compose/compose-reducers';
```

## API

### `composeReducers(...reducers)`

Given a set of reducers returns a reducer. When invoked each of the given reducers are called in order
with the action and the state that is returned from the previous reducer.

`composeReducers` is the primary composition function, and should be the main means of combining specific reducers
to form a larger reducer. Other functions provide a set of action and state filtering operations.

The reducers are called in left-to-right order so the 2 pieces of code are equivalent:

```ts
import { composeReducers } from 'redux-compose/compose-reducers';

...

export const reducer = composeReducers<State>(
  reducer1,
  reducer2,
  reducer3
);
```

```ts
...

export const reducer = (state: State, action: AnyAction) => (
  reducer3(
    reducer2(
      reducer1(state, action),
      action
    ),
    action
  )
)
```

### `forPath([...pathPart|pathPartFunction], subStateReducer)`

`forPath` creates a reducer that targets a sub section of the state. The first
argument is a path expressed as an array of string, numbers, or functions that translate
an action into a string or number. The second argument is a reducer that will be
called with the state at the given path.

`forPath` will try to create intermediary states if the path crosses an
undefined value. If the path part is a number the intermediary state will be a
empty array, otherwise it will be a empty object.

When updating values in an array `forPath` may create a sparse array.

Example:

```ts
import { forPath } from 'redux-compose/for-path';

interface State {
  foo: {
    bar: Array<{
      baz: number;
    }>;
  };
}

interface AddOneAction {
  type: 'AddOne';
  payload: {
    index: number;
  };
}

export const addOne = forPath(
  // path into the state, the index into the array of
  // bar is derived from the payload of the action
  ['foo', 'bar', ({ payload: { index } }: AddOneAction) => index, 'baz'],
  (state: number) => state + 1
);
```

### `ofType(typeString|typePredicate|[...typeString|typePredicate], reducer)`

Given a typeString or typePredicate, or array of typeStrings or typePredicates and a reducer
return a reducer that is only invoked when the action matches one of the types.

If the type is provided as a string the string is used to match the type field on the
action. If the type is provided as a function the action is passed to the function.

To match on multiple types an array of either strings or functions can be provided, in which case
they act as an "or" match on the action.

Example:

```ts
import { ofType } from 'redux-compose/of-type';

const INCREMENT: 'Increment' = 'Increment';
const DECREMENT: 'Decrement' = 'Decrement';

export const incrementReducer = ofType(
  // only invoked with the increment type
  INCREMENT,
  state => state + 1
);

export const decrementReducer = ofType(
  // using a type predicate
  ({ type }) => type === DECREMENT,
  state => state - 1
);

// specify multiple type strings or predicates to handle
// multiple actions
export const bothReducer = ofType([INCREMENT, ({ type }) => type === DECREMENT], (state, action) =>
  incrementReducer(decrementReducer(state, action), action)
);
```

### `withDefault(defaultState, reducer?)`

Given a default state and a reducer returns a reducer which invokes the provided reducer
using the default state if the state is `undefined`.

Example:

```ts
import { withDefault } from 'redux-compose/with-default';

interface State {
  value: number;
}

const reducer = withDefault<State>({ value: 2 }, (state, action) => {
  switch (action.type) {
    case 'Increment':
      return {
        ...state,
        value: state.value + 1
      };
    default:
      return state;
  }
});

/*
  reducer will use { value: 2 } as the default state,
  reducer(undefined, { type: 'Increment' }) === 3
*/
```

If no reducer argument is provided to `withDefault` then a identity reducer (`state => state`) is used.
This is useful when paired with `composeReducers` to set an initial state for a series of reducers.

```ts
import { composeReducers } from 'redux-compose/compose-reducers';
import { withDefault } from 'redux-compose/with-default';

interface State {
  value: number;
}

const reducer = composeReducers<State>(
  withDefault({ value: 2 })
  // other reducers can now depend on
  // state not being undefined.
);
```

## Contributing

### Building Locally

We use yarn and nvm to ensure consistent build environments.

- run tests using jest `yarn test`
- run gulp build `yarn gulp`
- format code `yarn format`
- lint code `yarn lint`

While all contributes are welcome the following rules will help you get your contributes accepted faster:

- PRs should reference a specific issue. If no issue exists for the desired changes please create one in order for us to have a meaningful discussion about the requested change.
- PRs should have a clean commit history. You may be asked to rebase and make changes to your PR in order to help us maintain a clean commit history.
- PRs should include tests, examples, and documentation. PRs without tests will be rejected, new features, should have documentation and examples added for them.
- PRs should include correct Typescript types. Typescript support is an important part of redux-compose so any new features must have full typing.

## License

MIT
