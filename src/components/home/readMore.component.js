import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './readMore.component.css';
export class readMore extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <React.Fragment>
                <div className="contr">
                    <h2 className="title">Title</h2>
                    <div className="underline"></div>
                    <div className="aboutauthor">
                        <div className="author">
                            <div className="authorname">Author: Somebody </div>
                            <div className="date">Date: 2019 : 12 : 12</div>
                        </div>
                    </div>
                    <div className="wrapper">
                        <div className="text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    
</div>
                    </div>

                </div>


            </React.Fragment>

        )
    }
}