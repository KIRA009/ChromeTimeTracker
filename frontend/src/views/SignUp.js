import React, { Component } from 'react'

import SignUpTemplate from '../templates/SignUp.template'
import requests from '../request'
import urls from '../urls'

export default class SignIn extends Component {
    state = {
        err_state: false,
        err_message: null,
        username: null,
        email: null,
        password: null
    }
    onChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }
    onSubmit = (event) => {
        event.preventDefault();
        let data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        requests.post('/user/register/', data)
        .then(resp => {
            window.location.href = urls.signin.url
        })
        .catch(err => {
            this.setState({
                err_state: true,
                err_message: err.response.data.data
            })
        })
    }
    handleClose = () => {
        this.setState({
            err_state: false,
            err_message: null
        })
    }
    render() {
        return (
        <div>
            <SignUpTemplate onSubmit={this.onSubmit} err_state={this.state.err_state} err_message={this.state.err_message} handleClose={this.handleClose}
            email={this.state.email} username={this.state.username} password={this.state.password} onChange={this.onChange}/>
        </div>
        )
    }
}
