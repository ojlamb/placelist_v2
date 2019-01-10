import { _mapStateToProps } from '../Login';

const getState = () => ({
  session: { active: false, user: {} }
});

describe('Map', () => {
  describe('_mapStateToProps', () => {
    it('returns the expected props', () => {
      expect(_mapStateToProps(getState()))
        .toMatchObject({ session: { active: false, user: {} } });
    });
  });
});
