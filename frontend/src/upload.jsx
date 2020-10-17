import React,{Component} from 'react';
import {Button,Segment,Input,Form,Container } from 'semantic-ui-react'


export default class upload extends Component{
    state={
        selectedFile:null
    }
fileSelectedHandler=(event)=>{
   this.setState({
       selectedFile:event.target.files[0]
   })
}

fileUploadHandler=()=>{
    
}

    render(){
    return(
        <Container text>
    <Form>
    <Input
    type="file"
    onchange={this.fileSelectedHandler}
  
    />
    <Button onClick={this.fileUpload}
    onClick={this.fileUploadHandler} color='black'>Submit</Button>
    </Form>
        </Container>
    )
    }
}