import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';

export default class Login extends Component {
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

        Meteor.loginWithPassword(username, password, (error) => {
            if (error) {
                Materialize.toast(error.reason, 4000);
            } else {

                FlowRouter.go('/');

            }
        });

    }
    goToSigup() {
        FlowRouter.go('/sign-up');
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 m6 push-m3">
                        <div className="card-panel white auth-panel">
                            <div className="row">
                                <div className="col s12">
                                    <h4>Please login</h4>
                                </div>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <label htmlFor="aimsID">AIMS ID</label>
                                        <input id="aimsID" type="text" ref="username"/>
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
                                        <button type="submit" className="btn blue white-text">LOGIN</button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12 center">
                                        <a onClick={this.goToSigup} href="">Haven't got an account, sign up here</a>
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
