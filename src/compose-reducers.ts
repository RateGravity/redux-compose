import { AnyAction, Reducer } from './redux';

/**
 * Sequentially combines reducers to produce a composed reducer.
 *
 * The given reducers are invoked first - to - last with
 * the resulting state of each reducer passed as the state
 * into the next reducer.
 *
 * @param reducers An Array of Reducers, called sequentially
 * @returns a reducer that sequentially invokes the given reducers.
 */
export const composeReducers = <S, A extends AnyAction = AnyAction>(
  ...reducers: Array<Reducer<S, A>>
): Reducer<S, A> => (s, action) => reducers.reduce((state, reducer) => reducer(state, action), s)!;
