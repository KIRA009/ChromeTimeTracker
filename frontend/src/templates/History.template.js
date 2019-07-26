import React, { useState } from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core/'

import {
    Sidebar, Appbar, Sessionbar
} from '../components'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(5, 1),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
    },
    drawerHeader: {
        alignItems: 'center',
        padding: theme.spacing(5, 1),
        justifyContent: 'flex-start',
        ...theme.mixins.toolbar,
    },
}))

export default function HistoryTemplate(props) {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    return (
        <div>
            <CssBaseline />
            <Appbar open={open} setOpen={setOpen}/>
            <Sidebar open={open} setOpen={setOpen}/>
            <main
            className={clsx(classes.content, {
            [classes.contentShift]: open,
            })}
            >
                <div className={classes.drawerHeader}>
                {
                    props.sessions.map((item, index) => (
                        <Sessionbar session={item} key={index} rerender={props.rerender}/>
                    ))
                }
                </div>
            </main>
        </div>
    )
}
