import React, { Component } from 'react'
import AccountTemplate from '../templates/Account.template'
import requests from '../request'

requests.auth = true;

export default class Account extends Component {
    state = {
        min_time: 0,
        blocked_sites: [],
        username: '',
        email: ''
    }
    get_settings = () => {
        requests.get('/get-settings/')
        .then(resp => {
            const data = resp.data.data;
            this.setState({
                min_time: data.min_time,
                blocked_sites: data.blocked_sites,
                username: data.user.username,
                email: data.user.email
            })
            requests.setToken(resp)
        })
        .catch(err => requests.redirect())
    }
    onChange = evt => {
        this.setState({
            [evt.target.id]: evt.target.value
        })
    }
    componentDidMount = () => this.get_settings()
    rerender = () => this.get_settings()
    
    render() {
        return (
            <div>
                <AccountTemplate state={this.state} onChange={this.onChange} rerender={this.rerender}/>
            </div>
        )
    }
}
