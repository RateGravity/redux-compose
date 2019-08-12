export interface Action<Type extends string> {
  type: Type;
}

export type AnyAction = Action<string>;

export type Reducer<S, A extends AnyAction = AnyAction> = (state: S | undefined, action: A) => S;
