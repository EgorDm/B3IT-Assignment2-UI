import React from 'react';
import PropTypes from "prop-types";

export default class Panel extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  render() {
    return <div className={'card ' + this.props.className}>
      <div className="card-header">{this.props.title}</div>
      <div className="card-body">
        {this.props.children}
      </div>
    </div>;
  }
}

