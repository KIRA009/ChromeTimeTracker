import React, { Component } from 'react'

import HomeTemplate from '../templates/Home.template'
import Piechart from '../components/Piechart'
import requests from '../request'

requests.auth = true;

export default class Home extends Component {
    getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    state = {
        total_time: 0,
        domains: [],
        colors: []
    }
    componentDidMount() {
        requests.get('/get-details/')
        .then(resp => {
            this.setState({
                total_time: resp.data.data.total_time,
                domains: resp.data.data.domains,
                colors: resp.data.data.domains.map(domain => this.getRandomColor())
            });
        })
        .catch(err => {
            console.log(err)
            requests.redirect()
        })
    }
    
    render() {
        const piechart = <Piechart state={this.state}/>;
        return (
            <div>
                <HomeTemplate state={this.state} canvas={piechart}/>
            </div>
        )
    }
}
