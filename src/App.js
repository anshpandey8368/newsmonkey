import React, { Component } from 'react';
import Nav from './components/Nav';
import Card from './components/Card';


export class app extends Component {

  render() {
    return (
      <div>
        <Nav />
        <Card />
        
      </div>
    )
  }

}


export default app;