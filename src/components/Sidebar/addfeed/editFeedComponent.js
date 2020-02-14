import React, { Component } from 'react';
import httpClient from '../../utils/http-client';
import notification from '../../utils/notification';
import { Loader } from '../../utils/loader';

export class editFeedComponent extends Component {
    constructor() {
        super()
        this.state = {
            data: {},
            error: {},
            isLoading:true, 
            isSubmitting: false,
            validForm: false
        }

    }
    handleChange = (event) => {
        let {type,name, value } = event.target
        if(type ==='file'){
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
        let url = `${process.env.REACT_APP_BASE_URL}/feed/${this.state.data._id}?token=${localStorage.getItem('token')}`
        event.preventDefault();
        this.setState({
            isSubmitting: true
        })
        httpClient.upload({
            url:url,
            method:'PUT',
            files:this.state.data['new_image'],
            data:{
                ...this.state.data,
                user:this.state.data.user._id
            }
        })
        .then(data => {
                this.props.history.push('/View-blogs')
                notification.showInfo('Blog edited successfully')
            })
            .catch(err => {
                notification.handleError(JSON.parse(err))
                this.setState({
                    isSubmitting: false
                })
            })
        // console.log(">>>>", this.state.data._id)
        // httpClient.put(`/feed/${this.state.data._id}?token=${localStorage.getItem('token')}`)
        // httpClient.put(`/feed/${this.state.data._id}`, this.state.data, true)

            
    }
    componentDidMount() {

        this.id = this.props.match.params['id']
        httpClient.get(`feed/${this.id}`, true)
            .then((response) => {
                this.setState({ data: response.data })
            })
            .catch(err => {
                notification.handleError(err)
            })
            .finally(() => {
                this.setState({
                    isLoading:false
                })
            })
    }
    render() {
        let imgUrl = process.env.REACT_APP_IMG_URL
        let btn = this.state.isSubmitting
            ? <button disabled className="btn btn-primary">Submitting...</button>
            : <button disabled={!this.state.validForm} className="btn btn-info">Submit</button>
        let content = this.state.isLoading
            ? <p><Loader size={12}></Loader></p>
            : <div className="main">
                <form className="form-group" onSubmit={this.handleSubmit}>
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" name="title" id="title" placeholder="Title" onChange={this.handleChange} value={this.state.data.title}></input>
                    <p>{this.state.error.title}</p>
                    <br></br>
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" name="description" id="description" placeholder="Description" onChange={this.handleChange} value={this.state.data.description}></input>
                    <p>{this.state.error.description}</p>
                    <br></br>
                    <label>Image</label>
                    <img src = {`${imgUrl}/${this.state.data.image}`} alt = "feed_image.png" width = '400px'></img>
                    <br></br>
                    <label>Choose New Image</label>
                    <input type = "file" className="form-control" name="new_image" onChange={this.handleChange}></input> 

                    <br></br>
                    {btn}
                </form>
            </div>

        return (
            <React.Fragment>
                <h2 className="heading">Update Your Blog</h2>
                {content}

            </React.Fragment>
        )
    }

}

