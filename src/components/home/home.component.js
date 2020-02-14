import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.component.css';
// import { Loader } from '../utils/loader';
export class Home extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <h2 className="title">Title</h2>
                    <div className="underline"></div>
                    <div className="content">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    <div className="imagearea"><img src="/home/arun/Desktop/ronaldo.jpg" width="500" height="600" alt="Ronaldo"></img></div>
                        <div className="readmore">
                            <p><Link to="/readMore">Read more</Link></p>
                        </div>

                    </div>
                </div>
                <div className="container">
                    <h2 className="title">Title</h2>
                    <div className="underline"></div>
                    <div className="content">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    <div className="imagearea"><img src="/home/arun/Desktop/ronaldo.jpg" width="500" height="600" alt="Ronaldo"></img></div>
                        <div className="readmore">
                            <p><Link to="/readMore">
                                Read more</Link>
                                </p>
                               
                        </div>
                    </div>
                       
                </div>
                
            </React.Fragment>
                 
            
        )
    }
}