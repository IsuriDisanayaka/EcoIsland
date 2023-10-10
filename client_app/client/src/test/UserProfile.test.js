
import React from 'react';
import { shallow } from 'enzyme';
import UserProfile from '../screen/UserProfile';

describe('UserProfile', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<UserProfile />);
        expect(wrapper.exists()).toBe(true);
    });

    it('displays the user profile data', () => {
        const wrapper = shallow(<UserProfile />);
       
        expect(wrapper.find('#fristName').prop('value')).toBe('First Name Value');
        expect(wrapper.find('#lastName').prop('value')).toBe('Last Name Value');
        
    });

    it('handles the update user button click', () => {
        const wrapper = shallow(<UserProfile />);
        wrapper.find('.user-profile-Updatebutton').simulate('click');
      
    });

    it('handles the cancel update button click', () => {
        const wrapper = shallow(<UserProfile />);
        wrapper.find('.user-profile-cancelbutton').simulate('click');
       
    });

    it('handles the confirm update button click', () => {
        const wrapper = shallow(<UserProfile />);
        wrapper.find('.user-profile-confirmbutton').simulate('click');
        
    });

    it('handles the delete user button click', () => {
        const wrapper = shallow(<UserProfile />);
        wrapper.find('.user-profile-deletebutton').simulate('click');
       
    });

    
});
