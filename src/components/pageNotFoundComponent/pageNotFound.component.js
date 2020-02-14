import React from 'react';
import image from '../../../images/404.jpg';
import  './pageNotFound.component.css';
const PageNotFound = () =>{
    return(
        <React.Fragment>
            
        <img src = {image} className="imageMain"></img>
        
        
        </React.Fragment>
    )
}
export default PageNotFound;