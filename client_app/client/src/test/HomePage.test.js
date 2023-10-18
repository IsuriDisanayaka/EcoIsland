

import React from 'react';
import { shallow } from 'enzyme';
import HomePage from '../screen/HomePage';

describe('HomePage', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<HomePage />);
        expect(wrapper.exists()).toBe(true);
    });

    it('handles the getting started button click', () => {
        const wrapper = shallow(<HomePage />);
        wrapper.find('.text').simulate('click');
        
    });

    it('handles the sign-in button click', () => {
        const wrapper = shallow(<HomePage />);
        wrapper.find('.button').at(0).simulate('click');
        
    });

    it('handles the sign-up button click', () => {
        const wrapper = shallow(<HomePage />);
        wrapper.find('.button').at(1).simulate('click');
       
    });

    it('handles the login button click', () => {
        const wrapper = shallow(<HomePage />);
        
        wrapper.find('.loginButton').simulate('click');
      
    });

});
