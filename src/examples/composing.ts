import { Action, composeReducers, forPath, ofType, withDefault } from '..';

interface State {
  counters: {
    // counters have ids
    [counterId: string]: number;
  };
}

// base interface for actions that are updating a counter
interface UpdateCounterAction<T extends string> extends Action<T> {
  payload: {
    counterId: string; // the counter id
  };
}

// increment by some amount
interface IncrementAction extends UpdateCounterAction<'Increment'> {
  payload: {
    counterId: string;
    amount?: number;
  };
}

// decrement by some amount
interface DecrementAction extends UpdateCounterAction<'Decrement'> {
  payload: {
    counterId: string;
    amount?: number;
  };
}

export const reducer = composeReducers<State>(
  withDefault({ counters: {} }),
  ofType(
    // ensure the action conforms to UpdateCounterAction interface
    (action): action is UpdateCounterAction<any> => 'payload' in action && 'counterId' in action,
    // use the action to select the counter
    forPath(
      ['counters', ({ payload: { counterId } }) => counterId],
      // apply either the Increment or Decrement operations
      composeReducers(
        ofType(
          'Increment',
          (s: number = 0, { payload: { amount = 1 } }: IncrementAction) => s + amount
        ),
        ofType(
          'Decrement',
          (s: number = 0, { payload: { amount = 1 } }: DecrementAction) => s - amount
        )
      )
    )
  )
);
