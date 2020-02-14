import React, { Component } from 'react';
import httpClient from '../../utils/http-client';
import notification from '../../utils/notification';
import moment from 'moment'
import { Link } from 'react-router-dom';
import { Loader } from '../../utils/loader';
export class viewBlogsComponent extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: true,
            feeds: []

        };

    }
    formatDate(date) {
        return moment(date).format("MMM Do YY")

    }
    componentDidMount() {
        httpClient.get('/feed', true)
            .then((data) => {
                this.setState({
                    feeds: data.data
                });
            })
            .catch(err => {
                notification.handleError(err);
            })
            .finally(() => {
                this.setState({
                    isLoading: false
                });
            })
    }
    handleRemove(id, i) {
        // TODO GET PERMISSION FROM USER
        httpClient.delete(`feed/${id}`,true)
            .then((data) => {
                this.state.feeds.splice(i, 1)
                this.setState({
                    feeds: this.state.feeds
                })
                notification.showInfo("Feed Deleted Successfully")
            })
            .catch(err => {
                notification.handleError(err)
            })
    }
    render() {
        let IMG_URL = process.env.REACT_APP_IMG_URL
        let rowData = this.state.feeds.map((item, i) => (
            <tr key={item._id}>
                <td>{i + 1}</td>
                <td>{item.title}</td>
                <td> <img src={`${IMG_URL}/${item.image}`} alt="feed.img" width="200px"></img> </td>
                <td>{this.formatDate(item.createdAt)}</td>
                <td>
                    <Link to={`/edit-blogs/${item._id}`}>
                        <button className="btn btn-info">
                            <i className="material-icons">edit</i>
                        </button>
                    </Link>
                    <button className="btn btn-danger">
                        <i className="material-icons" onClick={() => this.handleRemove(item._id, i)}>delete</i>

                    </button>


                </td>
            </tr>
        ))
        let content = this.state.isLoading
            ? <p><Loader size={12} ></Loader></p>
            : <table className="table">
                <thead>
                    <tr>
                        <th>s.n</th>
                        <th>Title</th>
                        <th>Image</th>
                        <th>Date/Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rowData}
                </tbody>
            </table>
        return (
            
            content
        )


    }
}














