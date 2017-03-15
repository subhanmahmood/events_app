import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends Component {
   constructor( ) {
      super( );
      this.handleSubmit = this.handleSubmit.bind( this );
   }
   handleSubmit( event ) {
      event.preventDefault( );
      const username = this.refs.username.value;
      const first_name = this.refs.first_name.value;
      const last_name = this.refs.last_name.value;
      const phone = this.refs.phone.value;
      const password = this.refs.password.value;

      Accounts.createUser({
         username: username,
         first_name: first_name,
         last_name: last_name,
         phone: phone,
         password: password
      }, ( error ) => {
         if ( error ) {
            Materialize.toast( error.reason, 4000 )
         } else {
           FlowRouter.go( '/' );
         }
      });


   }
   render( ) {
      return (
         <div className="container">
            <div className="row">
               <div className="col s12 m6 push-m3">
                  <div className="card-panel white auth-panel">
                     <div className="row">
                        <div className="col s12">
                           <h4>Please Signup</h4>
                        </div>
                     </div>
                     <form onSubmit={this.handleSubmit}>
                        <div className="row">
                           <div className="input-field col s12">
                              <label htmlFor="username">AIMS ID</label>
                              <input id="username" type="text" ref="username"/>
                           </div>
                        </div>
                        <div className="row">
                           <div className="input-field col s12">
                              <label htmlFor="first_name">First Name</label>
                              <input id="first_name" type="text" className="validate" ref="first_name"/>
                           </div>
                        </div>
                        <div className="row">
                           <div className="input-field col s12">
                              <label htmlFor="last_name">Last Name</label>
                              <input id="last_name" type="text" className="validate" ref="last_name"/>
                           </div>
                        </div>
                        <div className="row">
                           <div className="input-field col s12">
                              <label htmlFor="phone">Mobile Number</label>
                              <input id="phone" type="text" className="validate" ref="phone"/>
                           </div>
                        </div>
                        <div className="row">
                           <div className="input-field col s12">
                              <label htmlFor="password">Password</label>
                              <input id="password" type="password" className="validate" ref="password"/>
                           </div>
                        </div>
                        <div className="row">
                           <div className="col s12 center">
                              <button type="submit" className="btn blue white-text">SIGNUP</button>
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}
