import React, { Component } from 'react'
import {Grid} from '@material-ui/core'
import Statusbars from './Statusbars'

const cx = 250, cy = 250, rad = 200;
const get_rad = deg => 2 * Math.PI * deg;
const styles = {
    statusbars: {
        padding: 30
    }
}

export default class Piechart extends Component {
    constructor(props) {
        super(props);
        this.over = false
    }
    state = {
        len: 0
    }
    draw_pie_chart = (ctx, data, total_time) => {
        let colors = this.props.state.colors;
        let rem_time = total_time;
        for (var index in data) {
            let time = data[index][1][1]
            let rem_perc = rem_time / total_time;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            if (rem_perc <= 0.1)
                this.over = true;
            ctx.arc(cx, cy, rad, 0, get_rad(rem_perc));
            ctx.lineTo(cx, cy)
            ctx.fillStyle = colors[index];
            ctx.fill();
            ctx.closePath();
            rem_time -= time;
            if (this.over) {
                break
            }
        }
        if (this.state.len === 0)
            this.setState({len: parseInt(index, 10)})
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const ctx = this.refs.canvas.getContext('2d');
        this.refs.canvas.width = this.refs.canvas.height = 500;
        const total_time = this.props.state.total_time;
        this.draw_pie_chart(ctx, this.props.state.domains, total_time)
    }
    
    render() {
        return (
            <Grid container>
                <Grid item xs={12} sm>
                    <canvas ref='canvas'></canvas>
                </Grid>
                <Grid item xs={12} sm style={styles.statusbars}>
                    <Statusbars domains={this.props.state.domains} colors={this.props.state.colors} len={this.state.len} over={this.over}/>
                </Grid>
            </Grid>
        )
    }
}
