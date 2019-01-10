import reducer from '../user.reducer';

import {
  CREATE_USER_SUCCESS
} from 'common/constants/actionTypes';

const getState = ({
  user = {}
} = {}) => ({
  payload: user
});

describe('User reducer', () => {
  const scenarios = [
    {
      action: { type: undefined },
      state: undefined,
      expected: {
        exact: true,
        state: []
      }
    },
    {
      action: {
        type: CREATE_USER_SUCCESS,
        payload:
          { name: 'FOO' }
      },
      state: getState(),
      expected: {
        exact: true,
        state:
        { name: 'FOO' }
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
