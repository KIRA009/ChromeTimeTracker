import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

export default function Statusbars(props) {
    const domains = props.domains;
    let useStyles = {
        status_div: {
            '&:before': {
                content: "''",
                display: `inline-block`,
                height: 20,
                width: 20,
                position: `relative`,
                top: 10,
                margin: 5,
                borderRadius: `50%`
            }
        },
    };
    for (var index in props.colors) {
        useStyles['div' + index] = {
            '&:before': {
                backgroundColor: props.colors[index]
            }
        }
    }
    let classes = makeStyles(useStyles)();
    if (domains.length === 0)
        return null
    return (
        domains.map((domain, index) => (index <= props.len) && (
            <div key={index} className={classes.status_div + ` ` + classes['div' + index]}>
                { (index === props.len)? 'Others' : domain[1][0] }
            </div>
        ))
    )
}
