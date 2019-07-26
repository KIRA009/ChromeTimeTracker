import React, { Component } from 'react'

import HistoryTemplate from '../templates/History.template'
import requests from '../request'

requests.auth = true;

export default class History extends Component {
    state = {
        sessions: [],
    }
    get_sessions = () => {
        requests.get('/get-sessions/')
        .then(resp => {
            this.setState({
                sessions: resp.data.data.sessions
            })
            requests.setToken(resp);
        })
        .catch(err => {
            console.log(err)
            requests.redirect();
        })
    }
    componentDidMount = () => this.get_sessions()
    rerender = () => this.get_sessions()

    render() {
        return (
            <HistoryTemplate sessions={this.state.sessions} rerender={this.rerender}/>
        )
    }
}
