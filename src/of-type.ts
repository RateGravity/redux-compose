import { AnyAction, Reducer } from './redux';

export type ActionPredicate<NA extends A, A extends AnyAction = AnyAction> =
  | ((action: A) => action is NA)
  | NA['type'];

/**
 * Given a type predicate and a reducer returns a reducer that
 * only invokes the given reducer if the action matches the predicate.
 *
 * Given a string the string is compared to the type field of actions.
 * Given a function the function is passed the action and should return true or false.
 * Given an array of string or functions matches the action if any condition would be met.
 *
 * @param types either a string, function, or array of either
 * @param reducer the reducer to invoke when the type is matched.
 */
export const ofType = <S, NA extends A, A extends AnyAction = AnyAction>(
  types: ActionPredicate<NA, A> | Array<ActionPredicate<NA, A>>,
  reducer: Reducer<S, NA>
): Reducer<S, A> => {
  if (types === null || types === undefined) {
    throw new Error(
      'please specify a type string, action predicate, or an array of type string or action predicate'
    );
  }
  const t = (Array.isArray(types) ? types : [types]).map(item => {
    if (typeof item === 'string') {
      return (a: A): a is NA => a.type === item;
    }
    return item;
  });
  return (state: S, action: A) => {
    if (t.some(p => p(action))) {
      return reducer(state, action as NA);
    }
    return state!;
  };
};
