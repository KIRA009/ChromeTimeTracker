import React, { Component } from 'react'

import HomeTemplate from '../templates/Home.template'
import Piechart from '../components/Piechart'
import requests from '../request'

requests.auth = true;

export default class Home extends Component {
    state = {
        total_time: 0,
        domains: []
    }
    componentDidMount() {
        requests.get('/get-details/')
        .then(resp => {
            this.setState({
                total_time: resp.data.data.total_time,
                domains: resp.data.data.domains
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    render() {
        return (
            <div>
            <HomeTemplate state={this.state} canvas={<Piechart state={this.state} />}/>
            </div>
        )
    }
}
