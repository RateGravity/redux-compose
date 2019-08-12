import { Reducer } from '../redux';
import { forPath } from '../for-path';

describe('forPath', () => {
  describe('path literals', () => {
    it('calls inner reducer with substate', () => {
      const reducer: Reducer<number> = jest.fn((s = 0) => s);
      const pathed: Reducer<{ a: { b: number } }> = forPath(['a', 'b'], reducer);
      const action = { type: 'Answer' };
      pathed({ a: { b: 42 } }, action);
      expect(reducer).toHaveBeenCalledWith(42, action);
    });
    it('mixes string and number indexes', () => {
      const reducer: Reducer<number> = jest.fn((s = 0) => s);
      const pathed: Reducer<{ a: [string, number, boolean] }> = forPath(['a', 1], reducer);
      const action = { type: 'Answer' };
      pathed({ a: ['no', 42, false] }, action);
      expect(reducer).toHaveBeenCalledWith(42, action);
    });
    it('returns the updated state deep in the object', () => {
      const reducer: Reducer<number> = () => 7;
      const pathed: Reducer<{ query: { question: string; answer: number } }> = forPath(
        ['query', 'answer'],
        reducer
      );
      expect(
        pathed(
          { query: { question: 'What is the meaning of life', answer: 42 } },
          { type: 'Question' }
        )
      ).toEqual({
        query: { question: 'What is the meaning of life', answer: 7 }
      });
    });
    it('returns the updated state deep in an array', () => {
      const reducer: Reducer<number> = () => 7;
      const pathed: Reducer<{ query: [string, number, boolean] }> = forPath(['query', 1], reducer);
      expect(pathed({ query: ['no', 42, false] }, { type: 'Question' })).toEqual({
        query: ['no', 7, false]
      });
    });
    it('returns the same state if the substate doesnt change', () => {
      const reducer: Reducer<number> = (s = 0) => s;
      const pathed: Reducer<{ v: number[] }> = forPath(['v', 1], reducer);
      const state = { v: [1, 2, 3] };
      expect(pathed(state, { type: 'Nothing' })).toBe(state);
    });
    it('initalizes the state when the path doesnt exist', () => {
      const reducer: Reducer<number> = () => 2;
      const pathed: Reducer<Record<string, { value: number }>> = forPath(['a', 'value'], reducer);
      expect(pathed({}, { type: 'Nothing' })).toEqual({
        a: {
          value: 2
        }
      });
    });
    it('initalizes missing array elements to empty', () => {
      const reducer: Reducer<number> = () => 2;
      const pathed: Reducer<number[]> = forPath([3], reducer);
      expect(pathed([], { type: 'Nothing' })).toEqual([, , , 2]);
    });
  });
  describe('path part functions', () => {
    it('invokes the function with the action', () => {
      const pathFunc = jest.fn((a: any) => a.index as string);
      const pathed: Reducer<Record<string, number>> = forPath([pathFunc], (v = 0) => v + 1);
      const action = { type: 'AddOne', index: 'a' };
      pathed({ a: 0 }, action);
      expect(pathFunc).toHaveBeenCalledWith(action);
    });
    it('deeply sets the state from the function result', () => {
      const pathFunc = (a: any) => a.index as string;
      const pathed: Reducer<Record<string, number>> = forPath([pathFunc], (v = 0) => v + 1);
      const action = { type: 'AddOne', index: 'a' };
      expect(pathed({ a: 1 }, action)).toEqual({
        a: 2
      });
    });
  });
});
