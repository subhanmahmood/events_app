import React, { Component } from 'react';

import NavBar from '../components/navbar/NavBar';

export default class MainLayout extends Component {
   render( ) {
      return (
         <div>
            <div className="navbar-fixed">
               <NavBar title={this.props.title}/>

            </div>

            <div className="container content">
               {this.props.content}
            </div>

         </div>
      )
   }
}
