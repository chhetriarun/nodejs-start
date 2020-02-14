import React, { Component } from 'react';
import './register.component';
import { Link } from 'react-router-dom'
import http from '../utils/http-client'
import notification from '../utils/notification'
const formTo = {
	Firstname: '',
	Lastname: '',
	address: '',
	email: '',
	phone: '',
	username: '',
	password: '',
	gender: '',
	dob: ''

}
export class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				...formTo
			},
			error: {
				...formTo
			},
			validForm: false,
			isSubmitting: false
		}


	}
	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({
			isSubmitting: true,
		})
		http.post('/auth/register', this.state.data)
			.then((data) => {
				notification.showInfo("registration successful please login to continue");
				this.setState({
					isSubmitting: false
				})
				this.props.history.push('/')
			})
			.catch(err => {
				notification.handleError(err);
				this.setState({
					isSubmitting: false
				})
			})

	}
	handleChange = (event) => {
		const { name, value } = event.target;
		// console.log("name>>", name)
		// console.log("value>>", value)
		this.setState((previousState) => ({
			data: {
				...previousState.data,
				[name]: value
			}

		}), () => {
			this.validateError(name)
		})
	}
	validateError(fieldName) {
		let errorMsg;
		switch (fieldName) {
			case 'Firstname':
				errorMsg = this.state.data[fieldName]
					? ''
					: 'Please provide Firstname'
				break;
			case 'Lastname':
				errorMsg = this.state.data[fieldName]
					? ''
					: 'Please provide Lastname'
				break;
			case 'email':
				errorMsg = this.state.data[fieldName]
					? this.state.data[fieldName].includes('@')
						? ''
						: 'Invalid email format'
					: 'Please provide email';
				break;
			case 'address':
				errorMsg = this.state.data[fieldName]
					? ''
					: 'Please provide address'
				break;
			case 'phone':
				errorMsg = this.state.data[fieldName]
					? ''
					: 'Please provide phone-number'
				break;
			default:
				errorMsg = '';
		}
		this.setState((errState) => ({
			error: {
				...errState.error,
				[fieldName]: errorMsg
			}
		}), () => {
			this.validateForm();// console.log("state",this.state) 
		})
	}
	validateForm() {
		let btnEnabledStatus;
		const errors = Object
			.values(this.state.error)
			.filter(err => err);
		if (errors.length) {
			btnEnabledStatus = false;
		} else {
			btnEnabledStatus = true;
		}

		this.setState({
			validForm: btnEnabledStatus
		})

	}


	render() {
		let btn = this.state.isSubmitting
			? <button disabled className="btn btn-info" type="submit">submitting...</button>

			: <button disabled={!this.state.validForm} className="btn btn-primary" type="submit">Submit</button>


		return (
			<div className="mainDiv">
				<h2>Registration page</h2>
				<p>Please fill in the form to register</p>
				<form className="form-group" onSubmit={this.handleSubmit} noValidate>
					<label htmlFor="name">name</label>
					<input type="text" id="Name" className="form-control" name="name" placeholder="name" onChange={this.handleChange}></input>
					<p>{this.state.error.name}</p>

					<label htmlFor="email">email</label>
					<input type="text" id="email" className="form-control" name="email" placeholder="email" onChange={this.handleChange}></input>
					<p>{this.state.error.email}</p>
					<label htmlFor="phone">phone</label>
					<input type="text" id="phone" className="form-control" name="phone" placeholder="phone" onChange={this.handleChange}></input>
					<label htmlFor="address">address</label>
					<input type="text" id="address" className="form-control" name="address" placeholder="address" onChange={this.handleChange}></input>
					<p>{this.state.error.address}</p>
					<label htmlFor="username">username</label>
					<input type="text" id="username" className="form-control" name="username" placeholder="username" onChange={this.handleChange}></input>
					<label htmlFor="password">password</label>
					<input type="text" id="password" className="form-control" name="password" placeholder="password" onChange={this.handleChange}></input>
					<label htmlFor="gender">gender</label>
					<br></br>
					<div>
						<input className="gender" id="gender" type="radio" name="gender" value="male" onChange={this.handleChange} />Male
                        <input className="gender" id="gender1" type="radio" name="gender" value="female" onChange={this.handleChange} />Female
                        <input className="gender" id="gender2" type="radio" name="gender" value="others" onChange={this.handleChange} />Others
                    </div>
					<br></br>
					<label htmlFor="dob">dob</label>
					<input type="text" id="dob" className="form-control" name="dob" placeholder="dob" onChange={this.handleChange}></input>
					<br></br>
					{btn}
					<p className="account">
						Back to <Link to="/">Login</Link>
					</p>
				</form>
			</div>


		);
	}
}
