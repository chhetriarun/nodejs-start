import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './login.css'
import http from '../utils/http-client'
import notification from "../utils/notification";
const FormTo = {
    email: '',
    password: ''
}
export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                ...FormTo
            },
            error: {
                ...FormTo
            },
            validForm: false,
            isSubmitting: false,
        }
    }
    handleChange = (event) => {
        // console.log("event",event.target)
        const { name, value } = event.target;
        // console.log("name",name)
        // console.log("value",value)
        // console.log("type",type)
        this.setState((previousState) => ({
            data: {
                ...previousState.data,
                [name]: value
            }
        }), () => {
            this.validateError(name)

        })                 // to maintain scope use arrow notation function or bind method
    }
    validateError(fieldName) {
        let errorMsg;
        switch (fieldName) {
            case 'email':
                errorMsg = this.state.data[fieldName]
                    ? ''
                    : 'Please provide email'


                break;
            case 'password':
                errorMsg = this.state.data[fieldName]
                    ? ''
                    : 'Please provide password'
                break;
            default:
                errorMsg = ''
        }
        this.setState((errState) => ({
            error: {
                ...errState.error,
                [fieldName]: errorMsg
            }

        }), () => {
            this.validateForm();

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
    handlesubmit = (event) => {
        event.preventDefault()
        this.setState({
            isSubmitting: true
        })
       
        http.post('/auth/login',this.state.data)
        .then(data=>{
            notification.showSuccess(`Welcome ${data.data.user.username}`);
            localStorage.setItem('user',JSON.stringify(data.data.user)) 
            localStorage.setItem('token',data.data.token)
            this.props.history.push(`/dashboard`)
        })
        .catch(err=>{
            this.setState({
                isSubmitting: false,
            })
            notification.handleError(err);
           
        })
       

    }
    render() {
        let btn = this.state.isSubmitting
            ? <button disabled type="submit" className="btn btn-info">LoggingIn...</button>
            : <button disabled={!this.state.validForm} className="btn btn-primary" type="submit">Login</button>

        return (
            <div className="whole">
                <form className="isForm" onSubmit={this.handlesubmit} noValidate>
                    <h3 className='top'>Log In</h3>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" placeholder="Username" onChange={this.handleChange} />
                        <p>{this.state.error.username}</p>
                    </div>


                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" placeholder="Enter password" onChange={this.handleChange} />
                        <p>{this.state.error.password}</p>
                    </div>



                    <div className="form-group">
                        {btn}

                    </div>
                    <p className="forgot-password">
                        <Link to="/PageNotFound">  Forgot password?</Link>
                    </p>
                    <p className="account">
                        Don't have an Account?
                    <p><Link to="/register">Register Here</Link></p>
                    </p>


                </form>
            </div>
        );
    }
}