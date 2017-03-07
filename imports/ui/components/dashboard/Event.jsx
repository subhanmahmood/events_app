import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import $ from 'jquery';
import ReactDOM from 'react-dom';

import { Events } from '../../../api/events';

class Event extends Component {
   constructor( ) {
      super( );
      this.deleteEvent = this.deleteEvent.bind( this );
   }
   deleteEvent( ) {
      Events.remove( this.props.event._id );
   }
   render( ) {
      const currentUser = this.props.currentUser || ''
      let isAdmin = currentUser && Roles.userIsInRole( currentUser, 'admin' );
      return (
         <div className="card" ref="dvsv">
            <div className="card-content">
               <span className="card-title">{this.props.event.title} {isAdmin
                     ? <span className="right" ref="dbdfb">
                           <a href="" onClick={this.deleteEvent}>
                              <i className="material-icons red-text">clear</i>
                           </a>
                        </span>
                     : ''}
               </span>
               <p>{this.props.event.text}</p>
            </div>
            <div className="card-action">
               <a href="#" className="green-text">Confirm</a>
               <a href="#" className="red-text">Give apology</a>
            </div>
         </div>
      )
   }
}

export default createContainer( ( ) => {
   return {
      currentUser: Meteor.user( ) || {}
   };
}, Event );
