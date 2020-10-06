import React from 'react';
import {Menu} from 'semantic-ui-react'
import "./App.css";
import {connect} from 'react-redux';

class menu extends React.Component{

    changeTab() {
    localStorage.removeItem("token")
             }

    state = { activeItem: 'home' }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    render(){

    const token=localStorage.getItem("token")
    let loggedIn=true
    if(token==null)
    {
        loggedIn=false
    }

     const userLinks=(      
          <Menu.Menu position='right'>
           <Menu.Item  
           onClick={() => this.changeTab()}
            name='LOG_OUT'
            icon="users"
            href='/'            
           />
          </Menu.Menu>
         );
        
      
     
      const guestLinks= (
        <Menu.Menu position='right'>
        <Menu.Item
        name='LOGIN'
        icon="users"
        href='/login'
      />  
       <Menu.Item
        name='SIGN UP'
        icon='sign in icon'
        href='/register'
       />
      </Menu.Menu>
      );
      
      return(
        
        <div class="nav">  
        <div class="ui inverted segment"> 
        <Menu inverted pointing secondary >
            <Menu.Item
              name='HOME'
              icon="home"
              href='/'
            />            
            
            {loggedIn?userLinks:guestLinks}
            
              
        </Menu>
        </div> 
        </div>
          
        
      );
    }
}

export default menu ;