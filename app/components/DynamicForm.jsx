import React from 'react';
import PropTypes from "prop-types";
import axios from 'axios';

export default class DynamicForm extends React.Component {
	static propTypes = {
		action: PropTypes.string.isRequired,
		method: PropTypes.string.isRequired,
		data_path: PropTypes.string,
		success_msg: PropTypes.string,
		error_msg: PropTypes.string,
	};

	static defaultProps = {
		success_msg: "Form submitted succesfully",
		error_msg: "Form submission has failed",
		method: "post",
		data_path: null
	};

	constructor(props) {
		super(props);
		this.state = {error: false, success: false, data: {}};

		this.syncData();
	}

	syncData = () => {
		if(this.props.data_path) {
			axios.get(this.props.data_path).then(({data}) => { this.setState({data}); })
		}
	};

	handleSubmit = (e) => {
		const formData = new FormData(e.target);
		let data = {};

		e.preventDefault();

		for (let entry of formData.entries()) data[entry[0]] = entry[1];

		React.Children.forEach(this.props.children, child => {
			if(child.props.type === 'checkbox') data[child.props.name] = !!data[child.props.name];
			if(child.props.type === 'number') data[child.props.name] = parseInt(data[child.props.name]) || 0;
		});

		axios[this.props.method](this.props.action, data).then(() => {
			this.setState({success: true});
			this.syncData();
		}).catch(() => {
			this.setState({error: true});
		});
	};

	render() {
		let alert = '';
		if (this.state.error) alert = (<div className="alert alert-danger">{this.props.error_msg}</div>);
		if (this.state.success) alert = (<div className="alert alert-success">{this.props.success_msg}</div>);

		return <form action={this.props.action} method={this.props.method} onSubmit={this.handleSubmit}>
			<div className="message-container" ref={(input) => { this.textInput = input; }}>{alert}</div>
			{React.Children.map(this.props.children, child => React.cloneElement(child, {value: this.state.data[child.props.name]}))}
			<button type="submit" className="btn btn-primary">Submit</button>
		</form>;
	}
}

