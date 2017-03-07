import React, { Component } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import $ from 'jquery';

class NavBar extends Component {
   constructor( props ) {
      super( props );
      this.logout = this.logout.bind( this );
   }

   logout( ) {
      Meteor.logout( );
      FlowRouter.go('/sign-in')
   }
   render( ) {
      return (
         <div>
            <ul id="dropdown1" className="dropdown-content">
               <li>
                  <a href="#!" onClick={this.logout}>Logout</a>
               </li>
            </ul>
            <nav className="red">
               <div className="nav-wrapper">
                  <a href="#" className="brand-logo light-text">MKA Woking</a>
                  <ul id="nav-mobile" className="right hide-on-med-and-down">
                     <li>
                        <a className="dropdown-button" data-activates="dropdown1">{this.props.currentUser.username || ''}</a>
                     </li>
                  </ul>
               </div>
               <nav className="red darken-1">
                  <div className="nav-wrapper">
                     <div className="col s12 currentPage">
                        <a href="#!" className="breadcrumb">{this.props.title}</a>
                     </div>
                  </div>
               </nav>
            </nav>
         </div>
      )
   }
   componentDidMount( ) {
      $( document ).ready( function( ) {
         $( ".dropdown-button" ).dropdown( );
      });
   }
}

export default createContainer( ( ) => {
   return {
      currentUser: Meteor.user( ) || {}
   };
}, NavBar );
