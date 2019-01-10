import reducer from '../session.reducer';

import {
  LOGIN_USER_SUCCESS, LOG_OUT
} from 'common/constants/actionTypes';

const getState = ({
  session = {}
} = {}) => ({
  payload: session
});

describe('Session reducer', () => {
  const scenarios = [
    {
      action: { type: undefined },
      state: undefined,
      expected: {
        exact: true,
        state: { active: false, user: {} }
      }
    },
    {
      action: {
        type: LOGIN_USER_SUCCESS,
        payload:
          { session: { jwt: 'FOO', user: { id: 1 } } }
      },
      state: getState(),
      expected: {
        exact: true,
        state:
        { active: true, payload: {}, user: { session: { jwt: 'FOO', user: { id: 1 } } } }
      }
    },
    {
      action: {
        type: LOG_OUT
      },
      state: getState(),
      expected: {
        exact: true,
        state:
        { active: false, user: {} }
      }
    },
  ];

  scenarios.forEach(({ action, state, expected }, i) => {
    describe(`Scenario ${i + 1}`, () => {
      it('returns the expected state', () => {
        const method = expected.exact ? 'toEqual' : 'toMatchObject';
        expect(reducer(state, action))[method](expected.state);
      });
    });
  });
});
