import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Events } from '../../../api/events';

import FixedActionButton from '.././fixed-action-button/FixedActionButton';

import Event from './Event';

class Dashboard extends Component {
   renderEvents( ) {
      return this.props.events.map(( event ) => ( <Event key={event._id} event={event}/> ));
   }

   render( ) {
      const currentUser = this.props.currentUser || ''
      let isAdmin = currentUser && Roles.userIsInRole( currentUser, 'admin' );
      return (
         <div>
            <div className="row">
               <div className="col s12 m6 push-m3">
                  {this.renderEvents( )}
               </div>
            </div>
            {isAdmin
               ? <FixedActionButton path="/add-event" iconName="add" color="red"/>
               : ''}
         </div>

      )
   }
}

Dashboard.propTypes = {
   events: PropTypes.array.isRequired
};

export default createContainer( ( ) => {
   return {
      events: Events.find({ }).fetch( ),
      currentUser: Meteor.user( ) || {}
   };
}, Dashboard );
