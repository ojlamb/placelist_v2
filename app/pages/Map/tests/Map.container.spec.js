import { _mapStateToProps } from '../Map';

const getState = () => ({
  places: [{ id: 1 }, { id: 2 }]
});

describe('Map', () => {
  describe('_mapStateToProps', () => {
    it('returns the expected props', () => {
      expect(_mapStateToProps(getState()))
        .toMatchObject({ places: [{ id: 1 }, { id: 2 }] });
    });
  });
});
