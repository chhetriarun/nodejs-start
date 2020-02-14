import React, { Component } from 'react';
import './bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import ReactDOM from 'react-dom';
// import { Login } from './components/login/login'
// import { Register } from './components/register/register.component'
import Routing from './routing.js';

class App extends Component {
  render() {
    return (
      
          <div>
           <Routing></Routing>
           <ToastContainer/>
          </div> 
          //  {/* <Login></Login> */}
          //  {/* <Register></Register> */}
          
       
      
    );
  }
}

export default App;
