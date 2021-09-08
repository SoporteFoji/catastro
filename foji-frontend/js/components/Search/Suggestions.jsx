import React from 'react';

const Suggestions = (props) => {
    if(props.results){
        const options = props.results.map(r => (
            <div><a href={'/orquesta/' + r.id} ><strong key={r.id}>
            {r.id} - {r.name} - {r.area.province.region.name}
          </strong></a></div>
          ));
          return <div className="autocomplete-items">{options}</div>;        
    } else {
        return <ul></ul>
    }
};

export default Suggestions;
