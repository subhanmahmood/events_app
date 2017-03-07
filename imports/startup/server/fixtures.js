import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  const userExists = Meteor.users.findOne();

  if (!userExists) {
    const userId = Accounts.createUser({
      username: 'admin',
      password: '123456'
    });

    Roles.addUsersToRoles(userId, ['admin']);
  }
});
