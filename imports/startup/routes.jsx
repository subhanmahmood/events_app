import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import { mount } from 'react-mounter';

import MainLayout from '../ui/layouts/layout_main';

import Login from '../ui/components/auth/login.jsx';
import Signup from '../ui/components/auth/signup.jsx';

import Dashboard from '../ui/components/dashboard/Dashboard';
import Events from '../ui/components/events/Events';
import AddEvent from '../ui/components/events/add-event';
import ViewEvent from '../ui/components/dashboard/ViewEvent';

FlowRouter.route('/', {
   name: 'home',
   action( ) {
      mount(MainLayout, {
         content: <Dashboard/>,
         title: 'Dashboard'
      })
   }
});

FlowRouter.route('/add-event', {
   name: 'add-event',
   action( ) {
      mount(MainLayout, {
         content: <AddEvent/>,
         title: 'Add Event'
      })
   }
});

FlowRouter.route('/event/:id', {
   action(params) {
      mount(MainLayout, {
         content: <ViewEvent id={params.id}/>,
         title: 'View Event'
      })
   }
});

FlowRouter.route('/sign-in', {
  name: 'sign-in',
  action() {
    mount(Login)
  }
});

FlowRouter.route('/sign-up', {
  name: 'sign-up',
  action() {
    mount(Signup)
  }
});
