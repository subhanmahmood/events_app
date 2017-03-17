import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import reactMixin from 'react-mixin';
import $ from 'jquery';

import { Events } from '../../../api/events';

UserItem = React.createClass({
   clicked( ) {
      console.log( "clicked" );
   },
   render( ) {
      console.log( "Mounted" );
      return (
         <tr>
            <td>{this.props.user.profile.first_name + " " + this.props.user.profile.last_name}</td>
            <td>{this.props.user.username}</td>
            <td>{this.props.user.profile.phone}</td>
         </tr>
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
      let apologiesExist = true;
      if ( this.data.event.apologies.length == 0 ) {
         apologiesExist = false;
      }

      let confirmedExist = true;
      if ( this.data.event.confirmed.length == 0 ) {
         confirmedExist = false;
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
                        <p className="bold">Where</p>
                        <p>{this.data.event.where}</p>
                        <p className="bold">When</p>
                        <p>{this.data.event.when}</p>
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

                  {confirmedExist
                     ? <table>
                           <thead>
                              <tr>
                                 <th data-field="name">Name</th>
                                 <th data-field="aims">AIMS ID</th>
                                 <th data-field="phone">Phone</th>
                              </tr>
                           </thead>
                           <tbody>
                              {this.renderConfirmed( )}
                           </tbody>
                        </table>
                     : <div className="center">
                        <span className="card-title">
                           No confirmations yet
                        </span>
                     </div>
}
               </div>

               <div className="col s12 m6">
                  <div className="card red white-text">
                     <div className="card-content">
                        <span className="card-title">
                           Apologies
                        </span>
                     </div>
                  </div>

                  {apologiesExist
                     ? <table>
                           <thead>
                              <tr>
                                 <th data-field="name">Name</th>
                                 <th data-field="aims">AIMS ID</th>
                                 <th data-field="phone">Phone</th>
                              </tr>
                           </thead>
                           <tbody>
                              {this.renderApologies( )}
                           </tbody>
                        </table>
                     : <div className="center">
                        <span className="card-title">
                           No apologies yet
                        </span>
                     </div>
}
               </div>

            </div>
         </div>
      )
   }
});

export default ViewEvent;
