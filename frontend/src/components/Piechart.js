import React, { useRef } from 'react';

const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const draw_pie_chart = (ctx, data, total_time) => {
    let rem_time = total_time;
    const cx = 150, cy = 150, rad = 100;
    let over = false;
    for (var index in data) {
        let domain_name = data[index][0];
        let time = data[index][1]
        let rem_perc = rem_time / total_time;
        let color = getRandomColor();
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        if (rem_perc <= 0.1)
            over = true;
        ctx.arc(cx, cy, rad, 0, 2 * Math.PI * rem_perc);
        ctx.lineTo(cx, cy)
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
        rem_time -= time;
        if (over)
            break
    }
}

export default function Piechart(props) {
    const canvas = useRef(null);
    if (canvas.current !== null) {
        const ctx = canvas.current.getContext('2d');
        canvas.current.width = canvas.current.height = 300;
        const total_time = props.state.total_time;
        draw_pie_chart(ctx, props.state.domains, total_time)
    }
    return (
        <canvas ref={canvas}></canvas>
    )
}
