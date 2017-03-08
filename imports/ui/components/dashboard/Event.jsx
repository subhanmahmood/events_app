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
      }
      deleteEvent() {
            Events.remove(this.props.event._id);
      }
      confirmAttendance() {
            const currentUser = this.props.currentUser || '';
            const eventId = this.props.event._id;

            console.log(eventId);

            const userId = currentUser._id;
            const confirmed = this.props.event.confirmed;
            if (!confirmed) {                  
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
      giveApology() {
            const currentUser = this.props.currentUser || '';
            const eventId = this.props.event._id;
            console.log(eventId);
            const userId = currentUser._id;
            const apologies = this.props.event.apologies;

            for (i = 0; i < apologies.length; i++) {
                  if (apologies[i] == userId) {
                        console.log("already in array");
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
      render() {
            const currentUser = this.props.currentUser || ''
            let isAdmin = currentUser && Roles.userIsInRole(currentUser, 'admin');

            return (
                  <div className="card">
                        <div className="card-content">
                              <span className="card-title">{this.props.event.title} {isAdmin
                                          ? <span className="right">
                                                      <a href="" onClick={this.deleteEvent}>
                                                            <i className="material-icons red-text">clear</i>
                                                      </a>
                                                </span>
                                          : ''}
                              </span>
                              <p>{this.props.event.text}</p>
                              <p>confirmed {this.props.event.confirmed}</p>
                        </div>
                        <div className="card-action">
                              <a href="#" onClick={this.confirmAttendance} className="green-text">Confirm</a>
                              <a href="#" className="red-text">Give apology</a>
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
