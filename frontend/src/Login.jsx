import React,{Component} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import {Button,Segment,Form,Container } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom';
import "./App.css";



export default class LogIn extends Component {
    constructor(props) {
      super(props);

      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onChangeName = this.onChangeName.bind(this);

        const token=localStorage.getItem("token")
        let loggedIn=true
        if(token==null)
        {
            loggedIn=false
        }

      this.state = {
         userName: '',
         password: '',
         loggedIn
      }
    }
    state = {
      userName: {
        value: "",
        valid: false
      },
      password: {
        value: "",
        valid: false
      }
      };


      changeHandler = event => {
        this.setState({ [event.target.name]: { value: event.target.value, valid: !!event.target.value } });
      };

      onChangeName(e) {
        this.setState({
          userName: e.target.value
        })
      }




    onChangePassword(e) {
        this.setState({
          password: e.target.value
        })
      }

    onChangeEmail(e) {
      this.setState({
        email: e.target.value
      })
    }

    onSubmit(e) {
      e.preventDefault();

      const data = {
        userName: this.state.userName,
        password: this.state.password,
      }

      console.log(data);

      const encodeForm = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
            .join('&');
      }

      axios.post('http://localhost:8080/login', encodeForm(data), {headers: {'Accept': 'application/json'}})
      .then(function (response) {
                   console.log(response);
                   if (response.status === 200)
                   {

                     localStorage.setItem("token","qwewrrttyyuuiioppiassdfdgfhgjhk")
                   //alert("Successfully Login")
                   swal({
                     title: "Successfully Login!",
                     text: "     ",
                     icon: "success",
                     timer: 2000,
                     button: false
                   })
                   .then(function(){
                    window.location.href = "/nutrito"
                   })
                   }
                   else
                   {
                     // alert("Password incorrect")
                     swal({
                       title: "Incorrect username or password",
                       text: "     ",
                       icon: "error",
                       timer: 2000,
                       button: false
                     })
                   }

               })
               .catch(function (error) {
                   console.log(error);
                   swal({
                     title: "Incorrect username or password",
                     text: "     ",
                     icon: "error",
                     timer: 2000,
                     button: false
                   })
           });


    }

    render()
    {
      if(this.state.loggedIn){
         return <Redirect to="/nutrito"/>
      }
        return(
           <Container text>
            <div class="form-out-box">
              <Segment>
                <div class="title">
                <div class="ui medium header">LogIn</div>
                </div>
              <Form className="form" method="post" onSubmit={this.onSubmit} action="http://localhost:4000/login">


              <div class = "field">
                <Form.Input
                    label="Username"
                    icon="user"
                    type="text"
                  //   error="wrong"
                  //   success="right"
                    name="userName"
                   // pattern="[A-Za-z]{3,}"
                    title="Username cannot contain numbers and minimum of 3 characters"
                    value={this.state.userName}
                    onChange={this.onChangeName}
                    required
                  />
                  </div>



                  <div class = "field">
                  <Form.Input

                                       icon="lock"
                                       label='Password'
                                       type="password"
                                       validate
                                       name="password"

                                       value={this.state.password}
                                       onChange={this.onChangePassword}
                                       required
                  />
                  </div>



                   <div className="form_button">
                   <Button type='submit' color='black'>Submit</Button>
                   </div>

              </Form>
            </Segment>
       </div>
    </Container>
    );
    }
      }
