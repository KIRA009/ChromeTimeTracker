import React from 'react'
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton
} from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
}))
export default function Appbar(props) {
    const classes = useStyles();
    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
            [classes.appBarShift]: props.open,
            })}
            >
            <Toolbar>
                <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={() => props.setOpen(true)}
                edge="start"
                className={clsx(classes.menuButton, props.open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    My Browser History
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
