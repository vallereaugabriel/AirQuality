import 'jsdom-global/register'
import React from 'react'
import { expect } from 'chai'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Dashboard from '../src/dashboard'
import { ADD_SEARCH, addSearch } from '../src/actions'
import history from '../src/reducers'

Enzyme.configure({ adapter: new Adapter() });

const props = {
  saveSearch: function() {},
  searches: []
};

describe('<Dashboard />', () => {
  it('should render self', () => {
    const wrapper = mount(<Dashboard {...props} />);
    expect(wrapper.find('h1').text()).to.equal('Air quality');
    expect(wrapper.find('input')).to.have.length(1);
    expect(wrapper.find('button').text()).to.equal('Submit');
  });

  it('should update state if input is modified', () => {
    const wrapper = mount(<Dashboard {...props} />);
    wrapper.setState({ value: 'Zenica' });
    expect(wrapper.state('value')).to.equal('Zenica');
    wrapper.find('input').simulate('change', {target: {value: "Hainaut"}});
    expect(wrapper.state('value')).to.equal('Hainaut');
  });
})

describe('actions', () => {
  it('should create an action to add an history entry', () => {
    const text = 'Zenica';
    const expectedAction = {
      type: ADD_SEARCH,
      text
    };
    expect(addSearch(text)).to.deep.equal(expectedAction);
  });
})

describe('reducers', () => {
  it('should return the initial state', () => {
    expect(history(undefined, {})).to.be.an('array').that.is.empty;
  });

  it('should handle ADD_SEARCH', () => {
    expect(
      history([], {
        type: ADD_SEARCH,
        text: 'Hainaut'
      })
    ).to.deep.equal(['Hainaut']);

    expect(
      history(['Zenica'], {
        type: ADD_SEARCH,
        text: 'Hainaut'
      })
    ).to.deep.equal(['Zenica', 'Hainaut']);
  });
})
