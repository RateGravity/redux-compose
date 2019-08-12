import { composeReducers } from '../compose-reducers';

describe('composeReducers', () => {
  it('invokes reducers in order with the output of each', () => {
    const r1 = jest.fn(() => 1);
    const r2 = jest.fn(() => 2);
    const r3 = jest.fn(() => 3);
    const r = composeReducers(r1, r2, r3);
    const action = { type: 'NoType' };
    r(0, action);
    expect(r1).toHaveBeenCalledWith(0, action);
    expect(r2).toHaveBeenCalledWith(1, action);
    expect(r3).toHaveBeenCalledWith(2, action);
  });
  it('returns the result of the last reducer', () => {
    const state = { name: 'foo' };
    const r = composeReducers(() => ({ name: 'bar' }), () => state);
    expect(r({ name: 'baz' }, { type: 'NoType' })).toBe(state);
  });
  it('returns the state if given no reducers', () => {
    const r = composeReducers();
    const state = { name: 'foo' };
    expect(r(state, { type: 'NoType' })).toBe(state);
  });
});
