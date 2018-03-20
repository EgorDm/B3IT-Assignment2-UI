import React from 'react';
import PropTypes from "prop-types";
import axios from "axios/index";

export default class FormInput extends React.Component {
	static propTypes = {
		name: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		placeholder: PropTypes.string,
		options: PropTypes.array,
        value: PropTypes.any
	};

	static defaultProps = {
		placeholder: "",
		options: [],
		value: null
	};

	constructor(props) {
		super(props);
		this.state = {value: null};
	}

	componentWillReceiveProps(props) {
		this.setState({value: props.value});
	}

	handleChange = (evt) => {
		if (this.props.type === 'checkbox') {
			this.setState({
				value: !this.state.value
			});
		} else {
			this.setState({
				value: evt.target.value
			});
		}
	};

	render() {
		if (this.props.type === 'checkbox') {
			return <div className="form-check mb-3">
				<input type={this.props.type} className="form-check-input" name={this.props.name}
				       placeholder={this.props.placeholder} checked={this.state.value ? this.state.value : false} onChange={this.handleChange} value="true" {...this.props.options}/>
				<label className="form-check-label" htmlFor={this.props.name}>{this.props.label}</label>
			</div>;
		}
		return <div className="form-group">
			<label htmlFor={this.props.name}>{this.props.label}</label>
			<input type={this.props.type} className="form-control" name={this.props.name}
			       placeholder={this.props.placeholder} value={this.state.value ? this.state.value : "" } onChange={this.handleChange} {...this.props.options}/>
		</div>;
	}


}

