import React from 'react';
import { expect } from 'chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import { errorItem } from '../js/utils/excelUploadUtils.jsx';


describe('.errorItem()', () => {
  it('Returns an <li> item', () => {
    const errorMessage = "this is an error";
    const liItem = errorItem(errorMessage);
    const wrapper = shallow(liItem);

    expect(wrapper.name()).to.be.equal('li');
  });

  it('Uses the corresponding input string as the content', function () {
    const errorMessage = "this is an error";
    const liItem = errorItem(errorMessage);
    const wrapper = shallow(liItem);

    expect(wrapper.contains(errorMessage)).to.equal(true);
  });
});
