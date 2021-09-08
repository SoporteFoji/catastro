import React from 'react';
import ReactDOM from 'react-dom';

import FundingAjax from './components/FundingAjax.jsx';

const funding_form = document.getElementById('funding-ajax');
if (funding_form) {
  const orchestraId = funding_form.dataset.orchestraId;
  ReactDOM.render(
    <FundingAjax orchestraId={orchestraId} />,
    funding_form,
  );
}