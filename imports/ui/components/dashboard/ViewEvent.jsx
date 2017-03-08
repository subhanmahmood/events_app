import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import reactMixin from 'react-mixin';

import {Events} from '../../../api/events';

reactMixin(ViewEvent, ReactMeteorData);
class ViewEvent extends Component {
    constructor() {
        super();
    }
    getMeteorData() {
        return {
            event: Events.findOne({_id: this.props.params.id})
        }
    }

    render() {
        const currentUser = this.props.currentUser || ''
        let isAdmin = currentUser && Roles.userIsInRole(currentUser, 'admin');

        return (
            <div className="card">
                <div className="card-content">
                    <span className="card-title">{this.data.event.title}
                    </span>
                    <p>{this.data.event.text}</p>
                    <p>confirmed {this.data.event.confirmed}
                    </p>
                </div>
            </div>
        )
    }
}

export default createContainer(() => {
    return {
        currentUser: Meteor.user() || {}
    };
}, ViewEvent);
