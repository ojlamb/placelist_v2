import { _mapStateToProps } from '../PlaceDetail';

const getState = () => ({
  places: [{ id: 1 }]
});

describe('Place Detail', () => {
  describe('_mapStateToProps', () => {
    it('returns the expected props', () => {
      expect(_mapStateToProps(getState()))
        .toMatchObject({ place: { id: 1 } });
    });
  });
});
