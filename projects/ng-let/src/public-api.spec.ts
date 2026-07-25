import * as publicApi from './public-api';

describe('public API', () => {
  it('exports exactly the documented surface', () => {
    expect(Object.keys(publicApi).sort()).toEqual(['NgLetDirective', 'NgLetModule']);
  });
});
