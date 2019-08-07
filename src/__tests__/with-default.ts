import { withDefault } from '../with-default';

describe('withDefault', () => {
  it('uses the default value if undefined', () => {
    const reducer = jest.fn(s => s);
    const defaulted = withDefault(2, reducer);
    const action = { type: 'Nothing' };
    defaulted(undefined, action);
    expect(reducer).toHaveBeenCalledWith(2, action);
  });
  it('uses the given value if defined', () => {
    const reducer = jest.fn(s => s);
    const defaulted = withDefault(2, reducer);
    const action = { type: 'Nothing' };
    defaulted(3, action);
    expect(reducer).toHaveBeenCalledWith(3, action);
  });
  it('uses an identity function as a default for the reducer', () => {
    const defaulted = withDefault(2);
    expect(defaulted(undefined, { type: 'Nothing' })).toBe(2);
    expect(defaulted(3, { type: 'Something' })).toBe(3);
  });
});
