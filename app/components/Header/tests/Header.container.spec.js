import { _mapStateToProps } from '../Header';

const getState = () => ({
  session: { active: false, user: {} }
});

describe('Header', () => {
  describe('_mapStateToProps', () => {
    it('returns the expected props', () => {
      expect(_mapStateToProps(getState()))
        .toMatchObject({ session: { active: false, user: {} } });
    });
  });
});
