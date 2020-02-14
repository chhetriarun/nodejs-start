import React, { Component } from 'react';


export class searchFeedComponent extends Component{
    constructor(){
        super();
        this.state={
            data:{},
            error:{},
            isSubmitting:false
        }

    }
    render(){
        return(
            <div>
            <form className="form-group" onSubmit={this.handleSubmit}>
            <input type="text" name="search"  placeholder="Search Here" className="form-control" onchange = {this.handleChange}>Search</input>
            <button type="submit" className="btn btn-primary">submit</button>
            </form>
            <p>hi</p>
            </div>

        
        )
    }
}
