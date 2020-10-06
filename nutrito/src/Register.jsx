import React from 'react';
import axios from 'axios';
import {Button,Segment,Form,Container } from 'semantic-ui-react'

import "./App.css";

import swal from "sweetalert";

 class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    //this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeAge=this.onChangeAge.bind(this);
    this.onChangeHeight=this.onChangeHeight.bind(this);
    this.onChangeWeight=this.onChangeWeight.bind(this);
    //this.onChangeGender = this.onChangeGender.bind(this);
    //this.onClick=this.onClick.bind(this);







    this.state = {
      email: '',
      password: '',
      name: '',
      gender: '',
      //phone: '',

      age:'',
      weight:'',
      height:''

    }
  }

  onChangeHeight(e) {
    this.setState({
      height: e.target.value
    })
  }
  onChangeWeight(e){
    this.setState({
      weight: e.target.value
    })
  }
  onChangeAge(e){
  this.setState({
    age: e.target.value
  })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  // onChangeNumber(e) {
  //   this.setState({
  //     phone: e.target.value
  //   })
  // }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

 /*  onChangeGender(e) {
    this.setState({
      gender: e.target.value
    })
  } */

  handleChange = (e, { value }) => this.setState({ value, gender:value})//gender



  // onClick = nr => () => {
  //   this.setState({
  //     gender: nr
  //   });
  // };


  onSubmit(e) {
    e.preventDefault();



    const data = {
      name: this.state.name,
      email: this.state.email,
      age:this.state.age,
      height:this.state.height,
      weight:this.state.weight,
      gender: this.state.gender,
      password: this.state.password,


      // phone: this.state.phone,



    }
    console.log(data);

    const encodeForm = (data) => {
      return Object.keys(data)
          .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
          .join('&');
    }

    axios.post('http://localhost:8080/register', encodeForm(data))
        .then(function (response) {
            console.log(response);
            if (response.data.code === 200)
            {
            //alert("Data Added successfully.")
            swal({
              title: "Registration Successfull",
              text: "          ",
              icon: "success",
              timer: 2000,
              button: false 
            })
            .then(function(){
              window.location.href = "/login"
            })

            }
            else
            {
              //alert("Registration Fail.")
              swal({
                title: "Registration Fail.",
                text: "           ",
                icon: "error",
                timer: 2000,
                button: false
              })

            }
        })
        .catch(function (error) {
            console.log(error);
    });

  }

   render(){
    const { value } = this.state
     return(

       <Container text>
              <div className="form-out-box">
              <Segment>
                <div className="title">
                <div className="ui medium header">CREATE ACCOUNT</div>
                </div>


                <Form className="form" method="post" onSubmit={this.onSubmit} action="http://localhost:8080/signup">

                <div className = "field">
                  <Form.Input
                      label="Name"
                      icon="user"
                      type="text"
                    //   error="wrong"
                    //   success="right"
                      name="name"
                     // pattern="[A-Za-z]{3,}"
                      title="Name cannot contain numbers and minimum of 3 characters"
                      value={this.state.name}
                      onChange={this.onChangeName}
                      required


                    />
                    </div>
                    <div className = "field">
                      <Form.Input
                      label="Email"
                      icon="envelope"
                      group
                      type="email"
                      validate
                    //   error="wrong"
                    //   success="right"
                      name="email"
                      title="Please enter a valid email address"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                      required

                    />
                    </div>

                    {/* <div class = "field">
                    <Form.Input
                      label="Phone Number"
                      icon="tty"
                      group
                      validate
                    //   error="wrong"
                    //   success="right"
                      name="phone"
                      type="tel"
                      //pattern="[0-9]{10}"
                      title="Please enter a valid Phone Number of 10 digits"
                      value={this.state.phone}
                      onChange={this.onChangeNumber}
                      required
                    />
                    </div> */}

                 <div className = "field">
                  <Form.Input
                      label="Age"
                      icon=""
                      type="text"
                    //   error="wrong"
                    //   success="right"
                      name="Age"
                     // pattern="[A-Za-z]{3,}"
                      title=""
                      value={this.state.age}
                      onChange={this.onChangeAge}
                      required


                    />
                    </div>
                    <div className = "pcf">
                  <Form.Input
                      label="Height"
                      icon=""
                      type="text"
                    //   error="wrong"
                    //   success="right"
                      name="Age"
                     // pattern="[A-Za-z]{3,}"
                      title=""
                      value={this.state.height}
                      onChange={this.onChangeHeight}
                      required


                    />
                    <div className = "field">
                  <Form.Input
                      label="Weight"
                      icon=""
                      type="text"
                    //   error="wrong"
                    //   success="right"
                      name="Weight"
                     // pattern="[A-Za-z]{3,}"
                      title=""
                      value={this.state.weight}
                      onChange={this.onChangeWeight}
                      required


                    />
                    </div>
                    </div>

                    <div className = "field">
                    <Form.Input
                      label="Password"
                      icon="lock"
                      group
                      type="password"
                      validate
                    //   error="wrong"
                    //   success="right"
                      name="password"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                      value
                      value={this.state.password}
                      onChange={this.onChangePassword}

                    />
                    </div>

                    <div>
                      <Segment>
                       <Form.Group inline>
                       <label>Gender</label>
                          <div>
                          <Form.Radio
                            label='Female'
                             value='f'
                             checked={value === 'f'}
                             onChange={this.handleChange}
                          />
                          <Form.Radio
                            label='Male'
                            value='m'
                            checked={value === 'm'}
                            onChange={this.handleChange}

                          />
                           <Form.Radio
                            label='Other'
                            value='o'
                            checked={value === 'o'}
                            onChange={this.handleChange}

                          />
                          </div>


                        </Form.Group>
                        </Segment>
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
export default SignUp
