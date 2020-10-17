import axios from 'axios';
import { ResponsivePie } from '@nivo/pie'
import React from "react";
import { Segment,Container,Form,Button } from 'semantic-ui-react'
import  MyResponsivePie from './components/Cha';
import swal from "sweetalert";

// TODO: This is missing functionality for sub-menu here from SUI core examples.
// The "Publish To Web" item should contain a sub-menu.

// const DropdownExampleDropdown = () => (
//   <Dropdown text='File'>
//     <Dropdown.Menu>
//       <Dropdown.Item text='New' />
//       <Dropdown.Item text='Open...' description='ctrl + o' />
//       <Dropdown.Item text='Save as...' description='ctrl + s' />
//       <Dropdown.Item text='Rename' description='ctrl + r' />
//       <Dropdown.Item text='Make a copy' />
//       <Dropdown.Item icon='folder' text='Move to folder' />
//       <Dropdown.Item icon='trash' text='Move to trash' />
//       <Dropdown.Divider />
//       <Dropdown.Item text='Download As...' />
//       <Dropdown.Item text='Publish To Web' />
//       <Dropdown.Item text='E-mail Collaborators' />
//     </Dropdown.Menu>
//   </Dropdown>
// )
export default class dateDisp extends React.Component {
     constructor(props) {
      super(props);
      // this.onChangeName = this.onChangeName.bind(this);
       this.onSubmit = this.onSubmit.bind(this);
       this.onChangecDate=this.onChangecDate.bind(this);
       this.onClickBack=this.onClickBack.bind(this);

       var today = new Date(),
       date = "0"+today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();


    this.state={

        cDate:''

     }

 }

onChangecDate(e){
  this.setState({
    cDate: e.target.value
  })
}
onClickBack(){
    window.location.href = "/nutrito"
}

onSubmit(e){
    e.preventDefault();
    const data={
        tDate:this.state.cDate
    }
    console.log(data);
    const encodeForm = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
            .join('&');
      }
      axios.post('http://localhost:8080/pakshi', encodeForm(data), {headers: {'Accept': 'application/json'}})
      .then(function (response) {
          console.log(response);
          window.location.href = "/pakshi"

      })
}
 render()
{

return(
  <Container text>

  <div className="form_button">
    <Button type='button' onClick={this.onClickBack} color='black'>Go back</Button>
  </div>

    <div class="form-out-box">
      <div>
        <Segment>
          <div class="title">
            <div class="ui medium header">DATE WISE</div>
          </div>

          <div class="chart_form">
            <div>
              <Form className="form" method="post" onSubmit={this.onSubmit} action="http://localhost:4000/pakshi">
                <div class = "field">
                  <Form.Input label='ENTER DATE' type="text" name="cDate" pattern="^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$" title="Enter date in DD-MM-YYY format"
                  id="cDate" value={this.state.cDate} onChange={this.onChangecDate} placeholder="dd-mm-yyyy" required/>
                </div>

                <div className="form_button">
                  <Button type='submit' color='black'>Submit</Button>
                </div>

              </Form>

            </div>
          </div>

          <Segment>
            <div className="pie">
              <MyResponsivePie/>
            </div>
          </Segment>

        </Segment>
      </div>
    </div>
  </Container>


)
}


}
