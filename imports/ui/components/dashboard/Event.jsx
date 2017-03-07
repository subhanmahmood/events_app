import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

class RemoveEvent extends Component {
   render( ) {
      return (
         <span className="right">
            <i className="material-icons red-text">clear</i>
         </span>
      )
   }
}

export default class Event extends Component {
   render( ) {
      const currentUser = Meteor.user( );

      let isAdmin = currentUser && Roles.userIsInRole( currentUser, 'admin' );
      console.log( isAdmin );

      return (
         <div className="card">
            <div className="card-content">
               <span className="card-title">{this.props.event.title} {isAdmin
                     ? <RemoveEvent/>
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
