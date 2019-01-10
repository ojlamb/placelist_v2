import { _mapStateToProps } from '../Home';

const getState = () => ({
  session: { active: false, user: {} }
});

describe('Home', () => {
  describe('_mapStateToProps', () => {
    it('returns the expected props', () => {
      expect(_mapStateToProps(getState()))
        .toMatchObject({ session: { active: false, user: {} } });
    });
  });
});
