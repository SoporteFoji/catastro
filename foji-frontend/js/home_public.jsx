import React from 'react';
import ReactDOM from 'react-dom';

import PublicList from './components/Public/PublicList.jsx';

const public_list = document.getElementById('public-list');
if (public_list) {
  
  ReactDOM.render(
    <PublicList  />,
    public_list,
  );
}
