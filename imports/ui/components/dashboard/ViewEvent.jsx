import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import reactMixin from 'react-mixin';

import { Events } from '../../../api/events';

UserItem = React.createClass({
   render( ) {
      return (
         <li className="collection-item">
            {this.props.user.username}
         </li>
      )
   }
})

ViewEvent = React.createClass({
   mixins: [ReactMeteorData],

   getMeteorData( ) {

      const subscription = Meteor.subscribe( 'event', this.props.id );
      const Event = Events.findOne({ _id: this.props.id });
      let ready = subscription.ready( );
      let userConfirmed = [ ];
      let userApologies = [ ];

      if ( ready ) {

         const confirmed = Event.confirmed;
         for ( i = 0; i < confirmed.length; i++ ) {
            let user = Meteor.users.findOne({_id: confirmed[i]})
            userConfirmed[i] = user
         }

         const apologies = Event.apologies;
         for ( i = 0; i < apologies.length; i++ ) {
            let user = Meteor.users.findOne({_id: apologies[i]})
            userApologies[i] = user
         }

      }
      return { ready: ready, event: Event, confirmed: userConfirmed, apologies: userApologies }

   },

   renderConfirmed( ) {
      return this.data.confirmed.map(( user ) => ( <UserItem key={user._id} user={user}/> ));
   },
   renderApologies( ) {
      return this.data.apologies.map(( user ) => ( <UserItem key={user._id} user={user}/> ));
   },

   render( ) {

      if ( !this.data.ready ) {
         return <div>Loading...</div>;
      }

      return (
         <div>
            <div className="row">
               <div className="col s12 m12">
                  <div className="card">
                     <div className="card-content">
                        <span className="card-title">{this.data.event.title}
                        </span>
                        <p>{this.data.event.text}</p>
                     </div>
                  </div>
               </div>
            </div>
            <div className="row">

               <div className="col s12 m6">
                  <div className="card green white-text">
                     <div className="card-content">
                        <span className="card-title">
                           Confirmed
                        </span>
                     </div>
                  </div>
                  <ul className="collection">
                     {this.renderConfirmed( )}
                  </ul>
               </div>

               <div className="col s12 m6">
                  <div className="card red white-text">
                     <div className="card-content">
                        <span className="card-title">
                           Apologies
                        </span>
                     </div>
                  </div>
                  <ul className="collection">
                     {this.renderApologies( )}
                  </ul>
               </div>

            </div>
         </div>
      )
   }
});

export default ViewEvent;
