import React from 'react';
import PropTypes from "prop-types";
import axios from 'axios';

export default class DynamicForm extends React.Component {
  static propTypes = {
    action: PropTypes.string.isRequired,
    success_msg: PropTypes.string,
    error_msg: PropTypes.string,
  };

  static defaultProps = {
    success_msg: "Form submitted succesfully",
    error_msg: "Form submission has failed",
  };

  constructor(props) {
    super(props);
    this.state = {error: false, success: false};
  }

  onSubmit = (e) => {
    console.log(e);
    e.preventDefault();
  };

  handleSubmit = (e) => {
    const formData = new FormData(e.target);
    let data = {};

    e.preventDefault();

    for (let entry of formData.entries()) data[entry[0]] = entry[1];

    axios.post(this.props.action, data).then(() => {
      this.setState({success: true});
    }).catch(() => {
      this.setState({error: true});
    });
  };

  render() {
    let alert = '';
    if(this.state.error) alert = (<div className="alert alert-danger">{this.props.error_msg}</div>)
    if(this.state.success) alert = (<div className="alert alert-success">{this.props.success_msg}</div>)

    return <form action={this.props.action} onSubmit={this.handleSubmit}>
      <div className="message-container" ref={(input) => { this.textInput = input; }}>{alert}</div>
      {this.props.children}
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>;
  }
}

