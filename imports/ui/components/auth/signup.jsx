import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';

export default class Signup extends Component {
    constructor() {
        super();
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        const username = this.refs.username.value;
        const password = this.refs.password.value;

        Accounts.createUser({username, password});
        FlowRouter.go('/');
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 m6 push-m3">
                        <div className="card-panel white auth-panel">
                            <div className="row">
                                <div className="col s12">
                                    <h4>Please Signup</h4>
                                </div>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <label htmlFor="username">Username</label>
                                        <input id="username" type="text" ref="username"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <label htmlFor="password">Password</label>
                                        <input id="password" type="password" className="validate" ref="password"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12 center">
                                        <button type="submit" className="btn blue white-text">SIGNUP</button>
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
