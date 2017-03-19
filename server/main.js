import { Accounts } from 'meteor/accounts-base';

import '/imports/api/events.js';
import { Events } from '/imports/api/events.js';
import { Messages } from '/imports/api/messages.js';
import '/imports/api/messages.js';
import '/imports/startup/server';

Accounts.onCreateUser( function( options, user ) {
   // Use provided profile in options, or create an empty profile object
   user.profile = options.profile || {};

   // Assigns the first and last names to the newly created user object
   user.profile.first_name = options.first_name;
   user.profile.last_name = options.last_name;
   user.profile.phone = options.phone;

   // Returns the user object
   return user;
});

Events.after.insert( function( userId, doc ) {
   Messages.insert({eventId: doc._id, messages: [ ]});
});


Events.after.remove( function( userId, doc ) {
   Messages.remove({eventId: doc._id});
});
