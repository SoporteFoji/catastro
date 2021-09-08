import React from 'react';
import { expect } from 'chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { spy } from 'sinon';


before(function () {
  Enzyme.configure({ adapter: new Adapter() });
});
