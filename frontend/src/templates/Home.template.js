import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { 
    CssBaseline,
    Paper
} from '@material-ui/core/'

import Sidebar from '../components/Sidebar'
import Appbar from '../components/Appbar'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
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
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        justifyContent: 'flex-start',
        ...theme.mixins.toolbar,
    },
    canvas: {
        minWidth: `70%`,
        marginTop: 90,
        marginLeft: `auto`,
        marginRight: `auto`
    }
}));

export default function HomeTemplate(props) {    
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    return (
    <div>
        <CssBaseline />
        <Appbar open={open} setOpen={setOpen} />
        <Sidebar open={open} setOpen={setOpen} />
        <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
        >
            <div className={classes.drawerHeader}>
                <Paper className={classes.canvas}>
                    {props.canvas}
                </Paper>
            </div>
        </main>
    </div>
  );
}
