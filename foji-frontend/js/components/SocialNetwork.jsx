import React, { Component } from 'react';


class SocialNetwork extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 'facebook',
      value: {
        facebook: '',
        instagram: '',
        twitter: '',
        youtube: '',
        pinterest: '',
        vimeo: '',
      },
    };

    this.input = React.createRef();
    this.onBlur = this.onBlur.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount(){
    if(this.props.currents){
      const initialVal = this.state.value;
      Object.keys(initialVal).map(rs => {
        initialVal[rs] = this.props.currents[rs] || '';
        }
      );
      this.setState({value: initialVal})
    }
  }
  onClick(e) {
    this.setState({
      current: e.currentTarget.id,
    }, () => { this.input.current.focus(); });
  }

  onChange(e) {
    const { current } = this.state;
    const { target } = e;
    const self = this;

    this.setState(
      function (state, props) {
        const { value } = state;

        value[current] = target.value;

        return {
          value,
        };
      }, function () {
        if(self.props.onChange){
          self.props.onChange(target, 'social_networks');
        }
      }
    );
  }

  onBlur(e){
    let value = e.currentTarget.value;
    let current = this.state.current;
    let valid = new RegExp(/^https?:\/\//);
    let new_state = this.state.value;
    let data = {};
    if(value.length && !valid.test(value)){
      data.value = ("https://" + value);
      data.name = e.currentTarget.name;
      data.form = {};
      data.form.id = "orchestra";
      new_state[current] = data.value;
      this.setState({
        value: new_state,
       }, function () {
        if(this.props.onChange){
          this.props.onChange(data, 'social_networks');
        }
      });
    }
  }

  render() {
    const { current, value } = this.state;

    return (
      <>
        <ul className="nav social-tabs">
          <li id="facebook" className={'nav-item' + (this.state.current === 'facebook' ? ' active' : '')} onClick={this.onClick}>
            <a className="nav-link">
              <div className="social-icon facebook-icon"></div>
            </a>
            <input type="text" name="socialnetwork-facebook" value={value['facebook']} hidden readOnly />
          </li>
          <li id="instagram" className={'nav-item' + (this.state.current === 'instagram' ? ' active' : '')} onClick={this.onClick}>
            <a className="nav-link">
              <div className="social-icon instaram-icon"></div>
            </a>
            <input type="text" name="socialnetwork-instagram" value={value['instagram']} hidden readOnly />
          </li>
          <li id="twitter" className={'nav-item' + (this.state.current === 'twitter' ? ' active' : '')} onClick={this.onClick}>
            <a className="nav-link">
              <div className="social-icon twitter-icon"></div>
            </a>
            <input type="text" name="socialnetwork-twitter" value={value['twitter']} hidden readOnly />
          </li>
          <li id="youtube" className={'nav-item' + (this.state.current === 'youtube' ? ' active' : '')} onClick={this.onClick}>
            <a className="nav-link">
              <div className="social-icon youtube-icon"></div>
            </a>
            <input type="text" name="socialnetwork-youtube" value={value['youtube']} hidden readOnly />
          </li>
          <li id="pinterest" className={'nav-item' + (this.state.current === 'pinterest' ? ' active' : '')} onClick={this.onClick}>
            <a className="nav-link">
              <div className="social-icon pinterest-icon"></div>
            </a>
            <input type="text" name="socialnetwork-pinterest" value={value['pinterest']} hidden readOnly />
          </li>
          <li id="vimeo" className={'nav-item' + (this.state.current === 'vimeo' ? ' active' : '')} onClick={this.onClick}>
            <a className="nav-link">
              <div className="social-icon vimeo-icon"></div>
            </a>
            <input type="text" name="socialnetwork-vimeo" value={value['vimeo']} hidden readOnly />
          </li>
        </ul>
        <input ref={this.input} name={current} value={value[current]} onChange={this.onChange} onBlur={this.onBlur} tabIndex="0" className="form-control socials p-4" />
      </>
    );
  }
}


SocialNetwork.defaultProps = {
  onChange: (name, value) => {},
};


export default SocialNetwork;
