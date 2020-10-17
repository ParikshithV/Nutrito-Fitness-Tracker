import React,{Component} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import {Button,Segment,Form,Container } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom';
import "./App.css";
//import {Pie, Doughnut} from 'react-chartjs-2';
import  MyResponsivePie from './components/Cha';

export default class LogIn extends Component {
    constructor(props) {
      super(props);
       const token=localStorage.getItem("token")
       let loggedIn=true
       if(token==null)
       {
           loggedIn=false
       }

      this.onChangeP = this.onChangeP.bind(this);
      this.onChangeC = this.onChangeC.bind(this);
      this.onChangeF = this.onChangeF.bind(this);
     // this.onChangeCalories = this.onChangeCalories.bind(this);
      this.onCalculate=this.onCalculate.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onChangeinName=this.onChangeinName.bind(this);
      this.onsearchdate=this.onsearchdate.bind(this);

      var today = new Date(),

      date = "0"+today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

      this.state = {

         protein: '',
         carbo: '',
         fat:'',
         calories:'',
         calculate:'',
         loggedIn,
         inName:'',
         currentDate: date
      }


    }

    onChangeinName(e){
      this.setState({
        inName: e.target.value
      })
    }

    onChangeP(e) {
        this.setState({
          protein: e.target.value
        })
      }

    onChangeC(e) {
      this.setState({
        carbo: e.target.value
      })
    }
    onChangeF(e) {
      this.setState({
        fat: e.target.value
      })
    }
    onsearchdate(){
      window.location.href = "/pakshi"
    }

    onCalculate(){
        var protein = parseInt(document.getElementById("protein").value);
        var carbo = parseInt(document.getElementById("carbo").value);
        var fat = parseInt(document.getElementById("fat").value);
        var cal_p = protein*4;
        var cal_c = carbo*4;
        var cal_f = fat*9;


         var calculate=eval(cal_c + cal_p + cal_f);
         document.getElementById("cal").setAttribute('value',calculate);
         this.setState({calories:calculate});
    }


    onSubmit(e) {
      e.preventDefault();



      const data = {
        protein:this.state.protein,
        carbo:this.state.carbo,
        fat:this.state.fat,
        calculate:this.state.calories,
        inName:this.state.inName,
        currentDate:this.state.currentDate


      }

      console.log(data);

      const encodeForm = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
            .join('&');
      }

      axios.post('http://localhost:8080/save', encodeForm(data), {credentials: 'include'})
          .then(function (response) {
              console.log(response);
              if (response.status === 200)
              {
              //alert("Successfully Login")
              swal({
                title: "INPUT Successfull!",
                text: "     ",
                icon: "success",
                timer: 2000,
                button: false
              })
              .then(function(){
                window.location.href = "/nutrito"
                //sessionStorage.setItem('usertoken',response.data)
              })
              }
              else
              {
                // alert("Password incorrect")
                swal({
                  title: "Input failed",
                  text: "Please restart session",
                  icon: "error",
                  timer: 2000,
                  button: false
                })
              }

          })

          .catch(function (error) {
              console.log(error);
              swal({
                title: "Input invalid",
                text: "Please restart session",
                icon: "error",
                timer: 2000,
                button: false
              })
      });


    }

    render()
    {


       if(this.state.loggedIn===false){
         return<Redirect to="/"/>
       }
      return(
        <Container text>
          <div class="form-out-box">
              <div>
               <Segment>
                <div class="title">
                   <div class="ui medium header">Add new intake data:</div>
                </div>

               <div class="chart_form">
               <div>
                 <Form className="form" method="post" onSubmit={this.onSubmit} action="http://localhost:4000/save">
                 <div class = "field">
                  <Form.Input label='Intake NickName' type="text" name="inName" id="inName" value={this.state.inName} onChange={this.onChangeinName} required/>
                  <Form.Input label='DATE' type="text" type="" id="date1" name=""required value={this.state.currentDate}/>
                  </div>
                  <div class="field">
                    <div class='pcf'>
                      <div>
                       <Form.Input label="Protein" type="text" name="protein" id="protein" value={this.state.protein} onChange={this.onChangeP} required/>
                       </div>

                       <div>
                       <Form.Input label="Carbohydrate" type="text" name="carbohydrate" id="carbo" value={this.state.carbo} onChange={this.onChangeC} required/>
                       </div>

                       <div>
                       <Form.Input label="Fats"type="text" name="fat" id="fat" value={this.state.fat} onChange={this.onChangeF} required/>
                       </div>
                    </div>

                     <div>
                     <Form.Input label="Calorie Intake" type="text" name="calories" id="cal" value={this.state.calories}/>
                     <Button type='button' onClick={this.onCalculate} color='black'>Calculate</Button>
                     <Button type='submit' color='black'>Submit</Button>

                     </div>

                     </div>

                      <div className="form_button">
                      <Button type='button' onClick={this.onsearchdate} color='black'>SEARCH BY DATE</Button>

                      </div>

                      </Form>

                    </div>
                    <Segment>
                    <div className="pie">
                      {/* <Doughnut
                       data={status}
                       options={{
                         title:{
                         display:true,
                         text:'Tracking',
                         fontSize:20
                               },
                          legend:{
                        display:true,
                         position:'right'
                        }
                        }}
                      />  */}

                        <MyResponsivePie/>

                      </div>
                    </Segment>

                  </div>

                </Segment>
              </div>

            </div>
          </Container>
        );
      }
    }
