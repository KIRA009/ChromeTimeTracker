import React from 'react'
import { Link } from 'react-router-dom'
import urls from '../urls'
import {
    Drawer,
    List,
    Divider,
    ListItem,
    ListItemText,
    IconButton
} from '@material-ui/core/'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        justifyContent: 'flex-end',
        ...theme.mixins.toolbar,
    },
    drawerPaper: {
        width: drawerWidth,
    },
}))

export default function Sidebar(props) {
    const tabs = [
        {
            url: urls.home.url,
            name: 'Home'
        },
        {
            url: urls.account.url,
            name: 'Account'
        },
        {
            url: urls.history.url,
            name: 'History'
        }
    ]
    const classes = useStyles();
    return (
        <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.open}
        classes={{
            paper: classes.drawerPaper,
        }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={() => props.setOpen(false)}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
                <List>
                {tabs.map((tab, index) => (
                    <Link to={tab.url} key={tab.name}> 
                        <ListItem button>
                            <ListItemText primary={tab.name} />
                        </ListItem>
                    </Link>
                ))}
                </List>
            <Divider />
        </Drawer>
    )
}
