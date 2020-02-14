import React, { Component } from 'react'
import './addFeed.component'
import http from '../../utils/http-client'
import notification from "../../utils/notification";

export class addFeed extends Component {
    constructor() {
        super()
        this.state = {
            data: {},
            error: {},
            isSubmitting: false,
            validForm: false
        }
    }
    handleChange = (event) => {
       
        let { name, value, type } = event.target
        if (type === 'file') {
            value = event.target.files
        }
        this.setState((previousState) => ({
            data: {
                ...previousState.data,
                [name]: value
            }
        }), () => {
            this.validatError(name)
        })

    }
    validatError(fieldName) {
        let errorMsg
        switch (fieldName) {
            case 'title'
                : errorMsg = this.state.data[fieldName]
                    ? ''
                    : 'Title is required'
                break;
            case 'description'
                : errorMsg = this.state.data[fieldName]
                    ? this.state.data[fieldName].length > 10
                        ? ''
                        : 'Character must be greater than 10'
                    : 'Description is required'

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
            this.validateForm()
        })
    }
    validateForm() {
        let isFormValid
        let errors = Object
            .values(this.state.error)
            .filter(err => err)
        if (errors.length) {
            isFormValid = false
        }
        else {
            isFormValid = true
        }
        this.setState({
            validForm: isFormValid
        })
    }


    handleSubmit = (event) => {
        let url = `${process.env.REACT_APP_BASE_URL}/feed?token=${localStorage.getItem('token')}`
         this.setState({
            isSubmitting: true
        })
        event.preventDefault();
        http.upload({
            url: url,
            method: 'POST',
            data: this.state.data,
            files: this.state.data.image
        })
            .then(data => {
                console.log("im at then")
                this.props.history.push('/View-blogs');
                notification.showSuccess('New Blog added');
            })
            .catch(err => {
                console.log('here at error');
                notification.handleError(JSON.parse(err));
                this.setState({
                    isSubmitting: false
                })
            })

        // http.post('/feed', this.state.data, true)
        //     .then(data => {
        //         this.props.history.push('/View-blogs')
        //         notification.showSuccess('Blog added successfully')
        //     })
        //     .catch(err => {
        //         notification.handleError(JSON.parse(err))
        //         this.setState({
        //             isSubmitting: false
        //         })
        //     })


    }
    render() {
        let btn = this.state.isSubmitting
            ? <button disabled className="btn btn-primary">Submitting...</button>
            : <button disabled={!this.state.validForm} className="btn btn-info">Submit</button>
        return (
            <React.Fragment>
                <div className="main">
                    <h2 className="heading">Add Something New</h2>
                    <form className="form-group" onSubmit={this.handleSubmit}>
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" name="title" id="title" placeholder="Title" onChange={this.handleChange}></input>
                        <p>{this.state.error.title}</p>
                        <br></br>
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" name="description" id="description" placeholder="Description" onChange={this.handleChange}></input>
                        <p>{this.state.error.description}</p>
                        <label>Choose Image</label>
                        <input type="file" className="form-control" onChange={this.handleChange} name="image"></input>
                        
                        <br></br>
                        {btn}
                    </form>
                </div>
            </React.Fragment>
        )
    }

}