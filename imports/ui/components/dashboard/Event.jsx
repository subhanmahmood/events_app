import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import $ from 'jquery';
import ReactDOM from 'react-dom';

import {Events} from '../../../api/events';

class Event extends Component {
      constructor() {
            super();
            this.deleteEvent = this
                  .deleteEvent
                  .bind(this);
            this.confirmAttendance = this
                  .confirmAttendance
                  .bind(this);
            this.giveApology = this
                  .giveApology
                  .bind(this);
      }
      ifUserAlreadyExists(userId, collection, event) {
            console.log(event);
            let array;
            if (collection == 'confirmed') {
                  array = event.apologies;
            } else if (collection == 'apologies') {
                  const array = event.confirmed;
            }

            console.log(array);
            const IsInCollection = false;
            for (i = 0; i < array.length; i++) {
                  if (array[i] == userId) {
                        IsInCollection == true;
                  }
            }
            console.log(IsInCollection);
            return IsInCollection;
      }
      deleteEvent() {
            Events.remove(this.props.event._id);
      }
      confirmAttendance() {
            const currentUser = this.props.currentUser || '';
            const eventId = this.props.event._id;

            const userId = currentUser._id;
            const confirmed = this.props.event.confirmed;
            if (Meteor.users.findOne({_id: userId}).username == 'admin') {
                  Materialize.toast("You cannot confirm when logged in as admin!", 2000);
            }
            if (!(this.ifUserAlreadyExists(currentUser._id, 'confirmed', this.props.event))) {
                  Materialize.toast("You cannot confirm when you have given an apology");
            } else {
                  if (confirmed.length == 0) {
                        Events.update({
                              _id: eventId
                        }, {
                              $push: {
                                    "confirmed": userId
                              }
                        });
                  } else {
                        for (i = 0; i < confirmed.length; i++) {
                              if (confirmed[i] == userId) {
                                    console.log("already in array");
                                    i = confirmed.length - 1;
                              } else {
                                    Events.update({
                                          _id: eventId
                                    }, {
                                          $push: {
                                                "confirmed": userId
                                          }
                                    });

                              }
                        }
                  }
            }

      }
      giveApology() {
            const currentUser = this.props.currentUser || '';
            const eventId = this.props.event._id;
            const userId = currentUser._id;
            const apologies = this.props.event.apologies;

            if (Meteor.users.findOne({_id: userId}).username == 'admin') {
                  Materialize.toast("You cannot give an apology when logged in as admin!", 2000);
            }
            if (!(this.ifUserAlreadyExists(currentUser._id, 'confirmed', this.props.event))) {
                  Materialize.toast("You cannot give an apology when you have given a confirmation");
            } else {
                  if (apologies.length == 0) {
                        Events.update({
                              _id: eventId
                        }, {
                              $push: {
                                    "apologies": userId
                              }
                        });
                  } else {
                        for (i = 0; i < apologies.length; i++) {
                              if (apologies[i] == userId) {
                                    i = apologies.length - 1;
                              } else {
                                    Events.update({
                                          _id: eventId
                                    }, {
                                          $push: {
                                                "apologies": userId
                                          }
                                    });
                              }
                        }
                  }
            }

      }
      render() {
            const currentUser = this.props.currentUser || ''
            let isAdmin = currentUser && Roles.userIsInRole(currentUser, 'admin');

            return (
                  <div className="card">
                        <div className="card-content">
                              <span className="card-title">
                                    <a href={"/event/" + this.props.event._id}>
                                          {this.props.event.title}
                                    </a>
                                    {isAdmin
                                          ? <span className="right">
                                                      <a href="" onClick={this.deleteEvent}>
                                                            <i className="material-icons red-text">clear</i>
                                                      </a>
                                                </span>
                                          : ''}
                              </span>
                              <p className="preserve-spaces">{this.props.event.text}</p>
                        </div>
                        <div className="card-action">
                              <a href="#" onClick={this.confirmAttendance} className="green-text">Confirm</a>
                              <a href="#" onClick={this.giveApology} className="red-text">Give apology</a>
                        </div>
                  </div>
            )
      }
}

export default createContainer(() => {
      return {
            currentUser: Meteor.user() || {}
      };
}, Event);
