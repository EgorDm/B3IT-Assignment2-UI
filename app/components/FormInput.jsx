import React from 'react';
import PropTypes from "prop-types";

export default class FormInput extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    options: PropTypes.array,
  };

  static defaultProps = {
    placeholder: "",
    options: [],
  };

  render() {
    if(this.props.type === 'checkbox') {
      return <div className="form-check mb-3">
        <input type={this.props.type} className="form-check-input" name={this.props.name}
               placeholder={this.props.placeholder} {...this.props.options}/>
        <label className="form-check-label" htmlFor={this.props.name}>{this.props.label}</label>
      </div>;
    }
    return <div className="form-group">
      <label htmlFor={this.props.name}>{this.props.label}</label>
      <input type={this.props.type} className="form-control" name={this.props.name}
             placeholder={this.props.placeholder} {...this.props.options}/>
    </div>;
  }
}

