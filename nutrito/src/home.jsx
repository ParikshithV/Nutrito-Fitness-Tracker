// import React from 'react';
// import './home.css'
// import { Segment,Header,Image,Button, Icon,Container } from 'semantic-ui-react';
// import img from './42295f388c51feaa17e365b024324bcf_pin-by-lyudmila-zhuravel-on-food-_3642-2733.png'

// class home extends React.Component {
//     render(){
//         return(
//             <div className="home">
//             <div className="ui container">
            
//             <div className="text">
//             <div className="img">
//             <Image src={img} size='small'/> 
//             </div>
           
//             {/* <img src={img}  class="img"/> */}
//               <div>
//                      <h2> </h2>
//                      <h1 className="ui inverted header">NUTRITO.</h1>
//                      <h2 className="text1">Balance Your World </h2>
                     
//                     <Button basic inverted size="huge">
//                     Way To Fitness
//                     <Icon name="arrow circle right"/>
//                     </Button>

                    
//               </div>  
                
             

             
                       
//             </div>
//             </div>
            

            
//             </div>
            
            
               
//         );
//     }
// }
// export default  home

import PropTypes from 'prop-types'
import React, { Component } from 'react'


import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}


class DesktopContainer extends Component {

  render() {

    return (
      <Responsive >
        <Visibility>
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 600, marginLeft:7,marginRight:7 }}
            vertical
          >
              
           
              <Container text>
    <Header
      as='h1'
      content='NUTRITO.'
      inverted
      style={{
        fontSize: '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop:  '2em',
      }}
    />
    <Header
      as='h2'
      content='Balance Your World'
      inverted
      style={{
        fontSize: '1.7em',
        fontWeight: 'normal',
        marginTop:'1.5em',
        marginBottom:'5em'
      }}
    />
     
    <Button size="huge" color='black' icon="bicycle"  href='/nutrito'  >
            
       
    </Button>
        
   
  </Container>
          </Segment>
          
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              HEADING
            </Header>
            <p style={{ fontSize: '1.33em' }}>
             CONTENT
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
              HEADING
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              CONTENT
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image bordered rounded size='large' src='' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              HEADING
            </Header>
            <p style={{ fontSize: '1.33em' }}>CONTENT</p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
             HEADING
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              <Image avatar src='' />
      
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em' }}>
        HEADING
        </Header>
        <p style={{ fontSize: '1.33em' }}>
        CONTENT
        </p>
       

        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <a href='#'>QUOTES</a>
        </Divider>

        <Header as='h3' style={{ fontSize: '2em' }}>
          HEADING
        </Header>
        <p style={{ fontSize: '1.33em' }}>
         CONTENT
        </p>
        
      </Container>
    </Segment>

  {/* Footer */}
    <Segment inverted vertical style={{ padding: '8em 0em' }}>
      <Container> 
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                
              <List.Item as='a'>No Need To Contact Us</List.Item>
                
                
              </List>
            </Grid.Column>
            <Grid.Column width={4}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item as='a'>Self-Service</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Extras
              </Header>
              <p>
              Nothing to See Here Scroll Up
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  
          
        </Visibility>

      </Responsive>
    )
  }
}




export default DesktopContainer