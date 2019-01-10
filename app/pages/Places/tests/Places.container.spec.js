import { _mapStateToProps } from '../Places';

const getState = () => ({
  places: [{ id: 1 }, { id: 2 }]
});

describe('Places', () => {
  describe('_mapStateToProps', () => {
    it('returns the expected props', () => {
      expect(_mapStateToProps(getState()))
        .toMatchObject({ places: [{ id: 1 }, { id: 2 }] });
    });
  });
});
