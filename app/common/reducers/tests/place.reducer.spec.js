import reducer from '../place.reducer';

import {
  LOAD_PLACES_SUCCESS,
  CREATE_PLACE_SUCCESS,
  GET_PLACE_SUCCESS,
  UPDATE_PLACE_SUCCESS,
  DELETE_PLACE_SUCCESS
} from 'common/constants/actionTypes';

const getState = ({
  places = []
} = {}) => ({
  payload: places
});

describe('Place reducer', () => {
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
        type: LOAD_PLACES_SUCCESS,
        payload: {
          places: [
            { id: 1 },
            { id: 2 }
          ]
        }
      },
      state: getState(),
      expected: {
        exact: true,
        state: {
          places: [
            { id: 1 },
            { id: 2 }
          ]
        }
      }
    },
    {
      action: {
        type: GET_PLACE_SUCCESS,
        payload:
          { id: 1 }
      },
      state: [
        { id: 1 },
        { id: 2 }
      ],
      expected: {
        exact: true,
        state:
            [{ id: 1 }],
      }
    },
    {
      action: {
        type: CREATE_PLACE_SUCCESS,
        payload:
          { id: 3 }
      },
      state: [
        { id: 1 },
        { id: 2 }
      ],
      expected: {
        exact: true,
        state: [
          { id: 1 },
          { id: 2 },
          { id: 3 }
        ],
      }
    },
    {
      action: {
        type: UPDATE_PLACE_SUCCESS,
        payload:
          { id: 3, category: 'dinner', description: 'good food' }
      },
      state: [
        { id: 1 },
        { id: 2 }
      ],
      expected: {
        exact: true,
        state: [
          { id: 1 },
          { id: 2 },
          { id: 3, category: 'dinner', description: 'good food' }
        ],
      }
    },
    {
      action: {
        type: DELETE_PLACE_SUCCESS,
        payload:
          { id: 1 }
      },
      state: [
        { id: 1 },
        { id: 2 }
      ],
      expected: {
        exact: true,
        state:
            [{ id: 2 }],
      }
    }
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
