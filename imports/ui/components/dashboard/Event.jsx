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
      this.confirmAttendance = this.confirmAttendance.bind( this );
      this.giveApology = this.giveApology.bind( this );
   }
   deleteEvent( ) {
      Events.remove( this.props.event._id );
   }
   confirmAttendance( ) {
      const currentUser = this.props.currentUser || '';
      const eventId = this.props.event._id;

      const userId = currentUser._id;
      const confirmed = this.props.event.confirmed;
      console.log( confirmed.length );

      if ( confirmed.length == 0 ) {
         Events.update({
            _id: eventId
         }, {
            $push: {
               "confirmed": userId
            }
         });
      } else {
         for ( i = 0; i < confirmed.length; i++ ) {
            if ( confirmed[i] == userId ) {
               console.log( "already in array" );
               i = confirmed.length - 1;
            } else {
               Events.update({
                  _id: eventId
               }, {
                  $push: {
                     "confirmed": userId
                  }
               });

            }
         }
      }

   }
   giveApology( ) {
      const currentUser = this.props.currentUser || '';
      const eventId = this.props.event._id;
      const userId = currentUser._id;
      const apologies = this.props.event.apologies;
      if ( apologies.length == 0 ) {
         Events.update({
            _id: eventId
         }, {
            $push: {
               "apologies": userId
            }
         });
      } else {
         for ( i = 0; i < apologies.length; i++ ) {
            if ( apologies[i] == userId ) {
               i = apologies.length - 1;
            } else {
               Events.update({
                  _id: eventId
               }, {
                  $push: {
                     "apologies": userId
                  }
               });
            }
         }
      }
   }
   render( ) {
      const currentUser = this.props.currentUser || ''
      let isAdmin = currentUser && Roles.userIsInRole( currentUser, 'admin' );

      return (
         <div className="card">
            <div className="card-content">
               <span className="card-title">
                  <a href={"/event/" + this.props.event._id}>
                     {this.props.event.title}
                  </a>
                  {isAdmin
                     ? <span className="right">
                           <a href="" onClick={this.deleteEvent}>
                              <i className="material-icons red-text">clear</i>
                           </a>
                        </span>
                     : ''}
               </span>
               <p className="preserve-spaces">{this.props.event.text}</p>
            </div>
            <div className="card-action">
               <a href="#" onClick={this.confirmAttendance} className="green-text">Confirm</a>
               <a href="#" onClick={this.giveApology} className="red-text">Give apology</a>
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
