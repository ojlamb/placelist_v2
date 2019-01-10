import React from 'react';
import { EditPlace } from '../EditPlace';

const updatePlace = jest.fn();
const handleClose = jest.fn();

const getProps = ({ place, formOpen }) => ({
  classes: {},
  formOpen,
  place,
  updatePlace,
  handleClose,
});

const getJSX = props => (<EditPlace {...getProps(props)} />);

describe('EditPlace', () => {
  describe('snapshots', () => {
    const scenarios = [
      {
        place: {
          id: 1,
          category: 'dinner',
          name: 'FOO',
          address: '123 main st.',
          description: 'test'
        },
        formOpen: true,
      },
      {
        place: {
          id: 2,
          category: 'drinks',
          name: 'FOO',
          address: '123 main st.',
          description: 'test'
        },
        formOpen: false,
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
          description: 'test'
        },
        formOpen: true,
      };
      wrapper = shallow(<EditPlace {...getProps(props)} updatePlace={jest.fn()} handleClose={jest.fn()} />);
      instance = wrapper.instance();
    });

    it('Calls function updatePlace onClickSace', () => {
      instance.onClickSave();
      expect(instance.props.updatePlace).toHaveBeenCalled();
    });

    it('Calls handle close on form close', () => {
      instance.closeForm();
      expect(instance.props.handleClose).toHaveBeenCalled();
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
  });
});
