import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import { mount } from 'react-mounter';
import { Session } from 'meteor/session';

import MainLayout from '../ui/layouts/layout_main';

import Login from '../ui/components/auth/login.jsx';
import Signup from '../ui/components/auth/signup.jsx';

import Dashboard from '../ui/components/dashboard/Dashboard';
import Events from '../ui/components/events/Events';
import AddEvent from '../ui/components/events/add-event';
import ViewEvent from '../ui/components/dashboard/ViewEvent';

let exposed = FlowRouter.group({ });

let loggedIn = FlowRouter.group({
   triggersEnter: [function( ) {
         let route;
         if (!(Meteor.loggingIn( ) || Meteor.userId( ))) {
            route = FlowRouter.current( );
            if ( route.route.name !== 'sign-in' || route.route.name !== 'sign-up' ) {
               Session.set( 'redirectAfterLogin', route.path );
            }
            return FlowRouter.go( 'sign-in' );
         }
      }
   ]
});

loggedIn.route('/', {
   name: 'home',
   action( ) {
      mount(MainLayout, {
         content: <Dashboard/>,
         title: 'Dashboard'
      })
   }
});

loggedIn.route('/add-event', {
   name: 'add-event',
   action( ) {
      mount(MainLayout, {
         content: <AddEvent/>,
         title: 'Add Event'
      })
   }
});

loggedIn.route('/event/:id', {
   action( params ) {
      mount(MainLayout, {
         content: <ViewEvent id={params.id}/>,
         title: 'View Event'
      })
   }
});

exposed.route('/sign-in', {
   name: 'sign-in',
   action( ) {
      mount( Login )
   }
});

exposed.route('/sign-up', {
   name: 'sign-up',
   action( ) {
      mount( Signup )
   }
});
