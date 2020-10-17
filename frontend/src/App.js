import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import Login from './Login';
import Register from './Register'
import Bar from './bar'
//import Chart from'./chart'
// import Home from'./home'
import Nutrito from './nutrito'
import Home from './home'
import  MyResponsivePie from './components/Cha';
import Upload from './upload';
import Pakshi from './dateDisp';

//import {Input,Menu,Button,Segment,Form,Header,Container } from 'semantic-ui-react'
 class SignUp extends React.Component {

 render(){
   return(

    // <div className="pie">

    //   <MyResponsivePie/>

    // </div>




          <Router>
            <Bar/>

            <Route path="/Register"exact component={Register}/>
            <Route path="/login"exact component={Login}/>
            <Route path="/nutrito"exact component={Nutrito}/>
            <Route path="/"exact component={Home}/>
            <Route path="/upload"exact component={Upload}/>
            <Route path="/chart"exact component={MyResponsivePie}/>
            <Route path="/pakshi"exact component={Pakshi}/>

          </Router>


   );
 }
}
export default SignUp
