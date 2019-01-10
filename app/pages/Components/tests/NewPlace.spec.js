import React from 'react';
import { NewPlace } from '../NewPlace';


const createPlace = jest.fn();

const setupGoogleMock = () => {
  /** * Mock Google Maps JavaScript API ** */
  const google = {
    maps: {
      places: {
        AutocompleteService: () => {},
        PlacesServiceStatus: {
          INVALID_REQUEST: 'INVALID_REQUEST',
          NOT_FOUND: 'NOT_FOUND',
          OK: 'OK',
          OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
          REQUEST_DENIED: 'REQUEST_DENIED',
          UNKNOWN_ERROR: 'UNKNOWN_ERROR',
          ZERO_RESULTS: 'ZERO_RESULTS',
        },
      },
      Geocoder: () => {},
      GeocoderStatus: {
        ERROR: 'ERROR',
        INVALID_REQUEST: 'INVALID_REQUEST',
        OK: 'OK',
        OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
        REQUEST_DENIED: 'REQUEST_DENIED',
        UNKNOWN_ERROR: 'UNKNOWN_ERROR',
        ZERO_RESULTS: 'ZERO_RESULTS',
      },
    },
  };
  global.window.google = google;
};

const getProps = ({ place, formOpen, handleClose }) => ({
  classes: {},
  formOpen,
  place,
  createPlace,
  handleClose
});

const getJSX = props => (<NewPlace {...getProps(props)} />);

describe('newPlace', () => {
  describe('snapshots', () => {
    const scenarios = [
      {
        formOpen: true,
        handleClose: jest.fn()
      }
    ];

    scenarios.forEach((props, i) => {
      describe(`Scenario ${i + 1}`, () => {
        it('matches snapshot', () => {
          const wrapper = shallow(getJSX(props));
          expect(wrapper).toMatchSnapshot();
        });
      });
    });
  });
  describe('methods', () => {
    let wrapper;
    let instance;
    beforeAll(() => {
      const props = {
        place: {
          id: 1,
          category: 'dinner',
          name: 'FOO',
          address: '123 main st.',
          description: 'test',
          lat: '100',
          lon: '200'
        },
        formOpen: true,
        handleClose: jest.fn()

      };
      setupGoogleMock();
      wrapper = shallow(<NewPlace {...getProps(props)} createPlace={jest.fn()} />);
      instance = wrapper.instance();
    });

    it('Calls function createPlace onClickSace', () => {
      instance.onClickSave();
      expect(instance.props.createPlace).toHaveBeenCalled();
    });

    it('Calls handle close on form close', () => {
      instance.closeForm();
      expect(instance.props.handleClose).toHaveBeenCalled();
    });

    it('updates the place name', () => {
      instance.onNameChange({ target: { name: 'name', value: 'FOO' } });
      const place = wrapper.state('place');
      expect(place.name).toEqual('FOO');
    });

    it('updates the place address', () => {
      instance.onAddressChange({ target: { name: 'address', value: 'FOO' } });
      const place = wrapper.state('place');
      expect(place.address).toEqual('FOO');
    });

    it('updates the place category', () => {
      instance.onCategoryChange({ target: { name: 'category', value: 'FOO' } });
      const place = wrapper.state('place');
      expect(place.category).toEqual('FOO');
    });

    it('updates the place description', () => {
      instance.onDescriptionChange({ target: { name: 'description', value: 'FOO' } });
      const place = wrapper.state('place');
      expect(place.description).toEqual('FOO');
    });
    it('updates the place suggestion', () => {
      instance.onSuggestionSelected(
        {
          description: 'foo',
          structured_formatting: {
            main_text: 'bar'
          },
          place_id: 1
        }
      );
      const place = wrapper.state('place');
      expect(place.long_name).toEqual('foo');
      expect(place.name).toEqual('bar');
    });
    it('changes alertOpen on close alert', () => {
      instance.closeAlert();
      expect(wrapper.state('alertOpen')).toEqual(false);
    });
  });
});
