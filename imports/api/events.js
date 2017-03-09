import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Events = new Mongo.Collection('events');

if(Meteor.isServer) {
  Meteor.publish('event', function(id) {
    check(id, String);
    return Events.find({ _id: id });
  });
}
