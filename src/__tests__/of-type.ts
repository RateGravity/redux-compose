import { ofType } from '../of-type';
import { Reducer } from '../redux';

interface NameAction {
  type: 'Name';
  payload: {
    name: string;
  };
}

interface NotNameAction {
  type: 'NotName';
}

interface OtherAction {
  type: 'Other';
}

describe('ofType', () => {
  describe('null or undefined type', () => {
    it('throws an error if a null type is specified', () => {
      expect(() => ofType(null!, s => s)).toThrow();
    });
    it('throws an error if a undefined type is specified', () => {
      expect(() => ofType(undefined!, s => s)).toThrow();
    });
  });
  describe('type string', () => {
    it('invokes the reducer function if the types match', () => {
      const reducer = jest.fn(s => s);
      const typed = ofType('Name', reducer);
      const state = {};
      const action: NameAction = { type: 'Name', payload: { name: 'MyAction' } };
      typed(state, action);
      expect(reducer).toHaveBeenLastCalledWith(state, action);
    });
    it('doesnt invoke the reducer if the types dont match', () => {
      const reducer = jest.fn(s => s);
      const typed = ofType('Name', reducer);
      const state = {};
      const action: NotNameAction = { type: 'NotName' };
      typed(state, action);
      expect(reducer).not.toHaveBeenCalled();
    });
    it('returns the state from the reducer when invoked', () => {
      const state = { name: 'bar' };
      const typed = ofType('Name', () => state);
      const action: NameAction = { type: 'Name', payload: { name: 'MyAction' } };
      expect(typed({ name: 'foo' }, action)).toBe(state);
    });
    it('returns the input state when the reducer is not invoked', () => {
      const typed = ofType('Name', () => ({ name: 'foo' }));
      const action: NotNameAction = { type: 'NotName' };
      const state = { name: 'bar' };
      expect(typed(state, action)).toBe(state);
    });
  });
  describe('type predicate', () => {
    it('invokes the reducer function if the types match', () => {
      const reducer = jest.fn(s => s);
      const typed = ofType((a): a is NameAction => a.type === 'Name', reducer);
      const state = {};
      const action: NameAction = { type: 'Name', payload: { name: 'MyAction' } };
      typed(state, action);
      expect(reducer).toHaveBeenLastCalledWith(state, action);
    });
    it('doesnt invoke the reducer if the types dont match', () => {
      const reducer = jest.fn(s => s);
      const typed = ofType((a): a is NameAction => a.type === 'Name', reducer);
      const state = {};
      const action: NotNameAction = { type: 'NotName' };
      typed(state, action);
      expect(reducer).not.toHaveBeenCalled();
    });
    it('returns the state from the reducer when invoked', () => {
      const state = { name: 'bar' };
      const typed = ofType((a): a is NameAction => a.type === 'Name', () => state);
      const action: NameAction = { type: 'Name', payload: { name: 'MyAction' } };
      expect(typed({ name: 'foo' }, action)).toBe(state);
    });
    it('returns the input state when the reducer is not invoked', () => {
      const typed = ofType((a): a is NameAction => a.type === 'Name', () => ({ name: 'foo' }));
      const action: NotNameAction = { type: 'NotName' };
      const state = { name: 'bar' };
      expect(typed(state, action)).toBe(state);
    });
  });
  describe('type array', () => {
    it('type string array', () => {
      const reducer: Reducer<{}, NameAction | NotNameAction> = jest.fn(s => s!);
      const typed = ofType(['Name', 'NotName'], reducer);
      const state = {};
      typed(state, { type: 'Name', payload: { name: 'MyAction' } } as NameAction);
      typed(state, { type: 'NotName' } as NotNameAction);
      typed(state, { type: 'Other' } as OtherAction);
      expect(reducer).toHaveBeenCalledTimes(2);
    });
    it('type predicate array', () => {
      const reducer: Reducer<{}, NameAction | NotNameAction> = jest.fn(s => s!);
      const typed = ofType(
        [
          (a): a is NameAction => a.type === 'Name',
          (a): a is NotNameAction => a.type === 'NotName'
        ],
        reducer
      );
      const state = {};
      typed(state, { type: 'Name', payload: { name: 'MyAction' } } as NameAction);
      typed(state, { type: 'NotName' } as NotNameAction);
      typed(state, { type: 'Other' } as OtherAction);
      expect(reducer).toHaveBeenCalledTimes(2);
    });
    it('mixed type string type predicate array', () => {
      const reducer: Reducer<{}, NameAction | NotNameAction> = jest.fn(s => s!);
      const typed = ofType(['Name', (a): a is NotNameAction => a.type === 'NotName'], reducer);
      const state = {};
      typed(state, { type: 'Name', payload: { name: 'MyAction' } } as NameAction);
      typed(state, { type: 'NotName' } as NotNameAction);
      typed(state, { type: 'Other' } as OtherAction);
      expect(reducer).toHaveBeenCalledTimes(2);
    });
  });
});
