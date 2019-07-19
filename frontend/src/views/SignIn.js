import React, { Component } from 'react'

import SignInTemplate from '../templates/SignIn.template'
import requests from '../request'
import urls from '../urls'

export default class SignIn extends Component {
	state = {
        err_state: false,
        err_message: '',
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
            email: this.state.email,
            password: this.state.password
		}
        requests.post('/user/login/', data)
        .then(resp => {
			requests.setToken(resp);
			window.location.href = urls.home.url
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
            err_message: ''
        })
    }
	render() {
		return (
			<div>
				<SignInTemplate onSubmit={this.onSubmit} err_state={this.state.err_state} 
				err_message={this.state.err_message} handleClose={this.handleClose} email={this.state.email} 
				password={this.state.password} onChange={this.onChange} />
			</div>
		)
	}
}
