import { AnyAction, Reducer } from './redux';

/**
 * Given a default state and reducer return a reducer that uses the default
 * state when the store is uninitialized.
 *
 * If no reducer is provided a reducer which just returns its input state unmodified
 * is used.
 *
 * @param defaultState The default state to use if the state of the store is undefined
 * @param reducer The reducer to invoke, if undefined the state will be returned as-is
 */
export const withDefault = <S, A extends AnyAction = AnyAction>(
  defaultState: S,
  reducer: (definedState: S, action: A) => S = s => s
): Reducer<S, A> => (state = defaultState, action) => reducer(state, action);
