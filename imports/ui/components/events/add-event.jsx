import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import ReactDOM from 'react-dom';

import { Events } from '../../../api/events';

export default class AddEvent extends Component {
   constructor( props ) {
     super();
   this.handleSubmit = this.handleSubmit.bind(this);
   }
   handleSubmit( event ) {
      event.preventDefault( );

      const title = ReactDOM.findDOMNode( this.refs.title ).value.trim( );
      const text = ReactDOM.findDOMNode( this.refs.text ).value.trim( );
      const confirmed = [];
      const apologies = []

      Events.insert({ title: title, text: text , confirmed: confirmed, apologies: apologies});

      FlowRouter.go('/');

   }
   render( ) {
      return (
         <div className="row">
            <div className="col s12 m6 push-m3">
               <div className="card">
                  <div className="card-content">
                     <span className="card-title">Add a new event</span>
                     <form onSubmit={this.handleSubmit}>
                        <div className="row">
                           <div className="col s12 input-field">
                              <input placeholder="Title" ref="title" type="text" className="validate"/>
                           </div>
                           <div className="col s12 input-field">
                              <textarea id="textarea1" ref="text" className="materialize-textarea" placeholder="Description"></textarea>
                           </div>
                           <div className="col s12">
                              <button type="submit" className="btn blue waves-effect waves-light">Sumbit</button>
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
