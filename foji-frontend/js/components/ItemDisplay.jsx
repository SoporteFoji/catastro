import React, { Component } from 'react';


const Item = (props) => {
  const onClick = function() {
    props.onClick(props);
  };
  if(props.item.length){
    return (
      <div className="d-inline">
        <span id={'fund-' + props.id} className="badge badge-pill badge-secondary mb-2 mr-2" onClick={onClick}>
          <div className="icon close-icon"></div>{props.item.join(' / ')}
        </span>
        <input type="text" hidden name={'funding-' + props.id}  readOnly value={props.item.join(' / ')} />
      </div>
    );
  } 
  return null;
};

class ItemDisplay extends Component {
  constructor(props) {
    super(props);
  }

  items() {
    const itemComponents = this.props.items.map(
      (item, index) => <Item key={index} id={index} item={item} onClick={this.props.onClick} />,
    );

    return itemComponents;
  }

  render() {
    return (
      <div className="badges-items">
        {this.items()}
      </div>
    );
  }
}


export default ItemDisplay;
