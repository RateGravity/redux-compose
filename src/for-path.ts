import { AnyAction, Reducer } from './redux';

export type CF<V, A extends AnyAction> = V | ((action: A) => V);

/**
 * Given a path expressed as an array of strings, numbers, or functions, and a reducer
 * returns a reducer which applies the given reducer to the state at the given path.
 *
 * In the event that some part of the state is undefined forPath will try to put
 * a reasonable default state in place. In the event that a string key is being used
 * to access the state, this will be a object,
 * In the event that a number key is being used this will be an array.
 *
 * @param path the path into the state
 * @param reducer the reducer to apply to the sub section of the state.
 */
export function forPath<S, K1 extends keyof S, A extends AnyAction = AnyAction>(
  path: [CF<K1, A>],
  reducer: Reducer<S[K1], A>
): Reducer<S, A>;
/**
 * Given a path expressed as an array of strings, numbers, or functions, and a reducer
 * returns a reducer which applies the given reducer to the state at the given path.
 *
 * In the event that some part of the state is undefined forPath will try to put
 * a reasonable default state in place. In the event that a string key is being used
 * to access the state, this will be a object,
 * In the event that a number key is being used this will be an array.
 *
 * @param path the path into the state
 * @param reducer the reducer to apply to the sub section of the state.
 */
export function forPath<
  S,
  K1 extends keyof S,
  K2 extends keyof S[K1],
  A extends AnyAction = AnyAction
>(path: [CF<K1, A>, CF<K2, A>], reducer: Reducer<S[K1][K2], A>): Reducer<S, A>;
/**
 * Given a path expressed as an array of strings, numbers, or functions, and a reducer
 * returns a reducer which applies the given reducer to the state at the given path.
 *
 * In the event that some part of the state is undefined forPath will try to put
 * a reasonable default state in place. In the event that a string key is being used
 * to access the state, this will be a object,
 * In the event that a number key is being used this will be an array.
 *
 * @param path the path into the state
 * @param reducer the reducer to apply to the sub section of the state.
 */
export function forPath<
  S,
  K1 extends keyof S,
  K2 extends keyof S[K1],
  K3 extends keyof S[K1][K2],
  A extends AnyAction = AnyAction
>(path: [CF<K1, A>, CF<K2, A>, CF<K3, A>], reducer: Reducer<S[K1][K2][K3], A>): Reducer<S, A>;
/**
 * Given a path expressed as an array of strings, numbers, or functions, and a reducer
 * returns a reducer which applies the given reducer to the state at the given path.
 *
 * In the event that some part of the state is undefined forPath will try to put
 * a reasonable default state in place. In the event that a string key is being used
 * to access the state, this will be a object,
 * In the event that a number key is being used this will be an array.
 *
 * @param path the path into the state
 * @param reducer the reducer to apply to the sub section of the state.
 */
export function forPath<
  S,
  K1 extends keyof S,
  K2 extends keyof S[K1],
  K3 extends keyof S[K1][K2],
  K4 extends keyof S[K1][K2][K3],
  A extends AnyAction = AnyAction
>(
  path: [CF<K1, A>, CF<K2, A>, CF<K3, A>, CF<K4, A>],
  reducer: Reducer<S[K1][K2][K3][K4], A>
): Reducer<S, A>;
/**
 * Given a path expressed as an array of strings, numbers, or functions, and a reducer
 * returns a reducer which applies the given reducer to the state at the given path.
 *
 * In the event that some part of the state is undefined forPath will try to put
 * a reasonable default state in place. In the event that a string key is being used
 * to access the state, this will be a object,
 * In the event that a number key is being used this will be an array.
 *
 * @param path the path into the state
 * @param reducer the reducer to apply to the sub section of the state.
 */
export function forPath<
  S,
  K1 extends keyof S,
  K2 extends keyof S[K1],
  K3 extends keyof S[K1][K2],
  K4 extends keyof S[K1][K2][K3],
  K5 extends keyof S[K1][K2][K3][K4],
  A extends AnyAction = AnyAction
>(
  path: [CF<K1, A>, CF<K2, A>, CF<K3, A>, CF<K4, A>, CF<K5, A>],
  reducer: Reducer<S[K1][K2][K3][K4][K5], A>
): Reducer<S, A>;
/**
 * Given a path expressed as an array of strings, numbers, or functions, and a reducer
 * returns a reducer which applies the given reducer to the state at the given path.
 *
 * In the event that some part of the state is undefined forPath will try to put
 * a reasonable default state in place. In the event that a string key is being used
 * to access the state, this will be a object,
 * In the event that a number key is being used this will be an array.
 *
 * @param path the path into the state
 * @param reducer the reducer to apply to the sub section of the state.
 */
export function forPath<
  S,
  K1 extends keyof S,
  K2 extends keyof S[K1],
  K3 extends keyof S[K1][K2],
  K4 extends keyof S[K1][K2][K3],
  K5 extends keyof S[K1][K2][K3][K4],
  K6 extends keyof S[K1][K2][K3][K4][K5],
  A extends AnyAction = AnyAction
>(
  path: [CF<K1, A>, CF<K2, A>, CF<K3, A>, CF<K4, A>, CF<K5, A>, CF<K6, A>],
  reducer: Reducer<S[K1][K2][K3][K4][K5][K6], A>
): Reducer<S, A>;
/**
 * Given a path expressed as an array of strings, numbers, or functions, and a reducer
 * returns a reducer which applies the given reducer to the state at the given path.
 *
 * In the event that some part of the state is undefined forPath will try to put
 * a reasonable default state in place. In the event that a string key is being used
 * to access the state, this will be a object,
 * In the event that a number key is being used this will be an array.
 *
 * @param path the path into the state
 * @param reducer the reducer to apply to the sub section of the state.
 */
export function forPath<
  S,
  K1 extends keyof S,
  K2 extends keyof S[K1],
  K3 extends keyof S[K1][K2],
  K4 extends keyof S[K1][K2][K3],
  K5 extends keyof S[K1][K2][K3][K4],
  K6 extends keyof S[K1][K2][K3][K4][K5],
  K7 extends keyof S[K1][K2][K3][K4][K5][K6],
  A extends AnyAction = AnyAction
>(
  path: [CF<K1, A>, CF<K2, A>, CF<K3, A>, CF<K4, A>, CF<K5, A>, CF<K6, A>, CF<K7, A>],
  reducer: Reducer<S[K1][K2][K3][K4][K5][K6][K7], A>
): Reducer<S, A>;
/**
 * Given a path expressed as an array of strings, numbers, or functions, and a reducer
 * returns a reducer which applies the given reducer to the state at the given path.
 *
 * In the event that some part of the state is undefined forPath will try to put
 * a reasonable default state in place. In the event that a string key is being used
 * to access the state, this will be a object,
 * In the event that a number key is being used this will be an array.
 *
 * @param path the path into the state
 * @param reducer the reducer to apply to the sub section of the state.
 */
export function forPath<
  S,
  K1 extends keyof S,
  K2 extends keyof S[K1],
  K3 extends keyof S[K1][K2],
  K4 extends keyof S[K1][K2][K3],
  K5 extends keyof S[K1][K2][K3][K4],
  K6 extends keyof S[K1][K2][K3][K4][K5],
  K7 extends keyof S[K1][K2][K3][K4][K5][K6],
  K8 extends keyof S[K1][K2][K3][K4][K5][K6][K7],
  A extends AnyAction = AnyAction
>(
  path: [CF<K1, A>, CF<K2, A>, CF<K3, A>, CF<K4, A>, CF<K5, A>, CF<K6, A>, CF<K7, A>, CF<K8, A>],
  reducer: Reducer<S[K1][K2][K3][K4][K5][K6][K7][K8], A>
): Reducer<S, A>;
/**
 * Given a path expressed as an array of strings, numbers, or functions, and a reducer
 * returns a reducer which applies the given reducer to the state at the given path.
 *
 * In the event that some part of the state is undefined forPath will try to put
 * a reasonable default state in place. In the event that a string key is being used
 * to access the state, this will be a object,
 * In the event that a number key is being used this will be an array.
 *
 * @param path the path into the state
 * @param reducer the reducer to apply to the sub section of the state.
 */
export function forPath<
  S,
  K1 extends keyof S,
  K2 extends keyof S[K1],
  K3 extends keyof S[K1][K2],
  K4 extends keyof S[K1][K2][K3],
  K5 extends keyof S[K1][K2][K3][K4],
  K6 extends keyof S[K1][K2][K3][K4][K5],
  K7 extends keyof S[K1][K2][K3][K4][K5][K6],
  K8 extends keyof S[K1][K2][K3][K4][K5][K6][K7],
  K9 extends keyof S[K1][K2][K3][K4][K5][K6][K7][K8],
  A extends AnyAction = AnyAction
>(
  path: [
    CF<K1, A>,
    CF<K2, A>,
    CF<K3, A>,
    CF<K4, A>,
    CF<K5, A>,
    CF<K6, A>,
    CF<K7, A>,
    CF<K8, A>,
    CF<K9, A>
  ],
  reducer: Reducer<S[K1][K2][K3][K4][K5][K6][K7][K8][K9], A>
): Reducer<S, A>;
/**
 * Given a path expressed as an array of strings, numbers, or functions, and a reducer
 * returns a reducer which applies the given reducer to the state at the given path.
 *
 * In the event that some part of the state is undefined forPath will try to put
 * a reasonable default state in place. In the event that a string key is being used
 * to access the state, this will be a object,
 * In the event that a number key is being used this will be an array.
 *
 * @param path the path into the state
 * @param reducer the reducer to apply to the sub section of the state.
 */
export function forPath<
  S,
  K1 extends keyof S,
  K2 extends keyof S[K1],
  K3 extends keyof S[K1][K2],
  K4 extends keyof S[K1][K2][K3],
  K5 extends keyof S[K1][K2][K3][K4],
  K6 extends keyof S[K1][K2][K3][K4][K5],
  K7 extends keyof S[K1][K2][K3][K4][K5][K6],
  K8 extends keyof S[K1][K2][K3][K4][K5][K6][K7],
  K9 extends keyof S[K1][K2][K3][K4][K5][K6][K7][K8],
  K10 extends keyof S[K1][K2][K3][K4][K5][K6][K7][K8][K9],
  A extends AnyAction = AnyAction
>(
  path: [
    CF<K1, A>,
    CF<K2, A>,
    CF<K3, A>,
    CF<K4, A>,
    CF<K5, A>,
    CF<K6, A>,
    CF<K7, A>,
    CF<K8, A>,
    CF<K9, A>,
    CF<K10, A>
  ],
  reducer: Reducer<S[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10], A>
): Reducer<S, A>;
/**
 * Given a path expressed as an array of strings, numbers, or functions, and a reducer
 * returns a reducer which applies the given reducer to the state at the given path.
 *
 * In the event that some part of the state is undefined forPath will try to put
 * a reasonable default state in place. In the event that a string key is being used
 * to access the state, this will be a object,
 * In the event that a number key is being used this will be an array.
 *
 * @param path the path into the state
 * @param reducer the reducer to apply to the sub section of the state.
 */
export function forPath<S, A extends AnyAction = AnyAction>(
  path: Array<CF<string | number, A>>,
  reducer: Reducer<unknown, A>
): Reducer<S, A> {
  return (state: S | undefined, action: A) => {
    const pathParts = path.map(part => (typeof part === 'function' ? part(action) : part));
    const states: unknown[] = [];
    const subState = pathParts.reduce((s: any, part) => {
      // handle the case of an undefined state
      // by creating intermediary state objects
      if (s === undefined || s === null) {
        // number keys are arrays, everything else is an object
        s = typeof part === 'number' ? [] : {};
      }
      states.push(s);
      return s[part];
    }, state);
    const v = reducer(subState, action);
    // if the's no changes
    // return state as-is
    if (state !== undefined && v === subState) {
      return state;
    }
    // rebuild the states in reverse order
    return pathParts.reduceRight((s, part) => {
      // grab the next intermediate state
      const n = states.pop();
      if (Array.isArray(n)) {
        const p = Number(part);
        // hanlde cases where we're
        // putting items past the end of
        // a smaller array
        if (n.length < p) {
          return [...n, ...Array(p - n.length), s];
        }
        return [...n.slice(0, p), s, ...n.slice(p + 1)];
      }
      return {
        ...n,
        [part]: s
      };
    }, v) as S;
  };
}
