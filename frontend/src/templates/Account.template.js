import React, { useState, useRef } from 'react'
import clsx from 'clsx'
import {
    Sidebar, Appbar
} from '../components'
import requests from '../request'
import { makeStyles } from '@material-ui/core/styles';
import { 
    CssBaseline,
    Paper,
    Typography,
    TextField,
    List,
    ListItem,
    Button,
    FormControlLabel,
    Checkbox
} from '@material-ui/core/'

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
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(5, 1),
        justifyContent: 'flex-start',
        ...theme.mixins.toolbar,
    },
    paper: {
        marginTop: 40,
        padding: theme.spacing(4),
        width: `50%`,
        marginLeft: `auto`,
        marginRight: `auto`,
        [theme.breakpoints.down('sm')]: {
            width: `70%`,
        },
        [theme.breakpoints.down('xs')]: {
            width: `90%`,
        }
    },
    textfield: {
        marginTop: 30,
        marginBottom: 10,
    },
    img: {
        margin: 10,
    },
    domains:{
        fontSize: `1.2rem`,
        fontWeight: 300,
    },
    addButton: {
        marginLeft: `auto`,
        display: `block`
    },
    delButton: {
        top: -50,
        marginLeft: `auto`,
    }
}))

export default function AccountTemplate(props) {
    requests.auth = true;
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const classes = useStyles();
    const domains = useRef();
    const new_domain = useRef();
    const min_time = useRef();
    const helper = useRef();
    const onChange = evt => {
        let sites = Array.from(domains.current.querySelectorAll('input')).slice(0, props.state.blocked_sites.length)
        let to_show = false;
        for (var index in sites) {
            if (sites[index].checked) {
                to_show = true;
                break
            }
        }
        if (show !== to_show)
            setShow(to_show)
    }
    const onAddClick = evt => {
        let value = new_domain.current.value;
        if (value === '')
            return;
        requests.post('/block-site/', {value: value})
        .then(resp => props.rerender())
        .catch(err => {
            helper.current.innerHTML = err.response.data.data
            setTimeout(() => helper.current.innerHTML = '', 2000)
        })
    }
    const onDelClick = evt => {
        let sites = Array.from(domains.current.querySelectorAll('input')).slice(0, props.state.blocked_sites.length)
        let to_delete = [];
        for (var index in sites) {
            if (sites[index].checked)
                to_delete.push(sites[index].id)
        }
        requests.post('/unblock-sites/', {sites: to_delete})
        .then(resp => {
            setShow(false)
            props.rerender()
        })
    }
    const onMinClick = evt => {
        let min_time_val = parseInt(min_time.current.value, 10);
        if (min_time_val === '')
            return
        requests.post('/change-mintime/', {min_time:min_time_val})
        .then(resp => {})
        .catch(err => console.log(err.response.data.data))
        .then(() => props.rerender())
    }
    const copyToken = evt => {
        evt.persist()
        requests.get('/get-token/')
        .then(resp => {
            let input = document.createElement('input');
            input.value = resp.data.data.token;
            document.body.append(input);
            input.select();
            document.execCommand('copy');
            input.remove();
            evt.target.innerHTML = 'Token copied to clipboard'
            setTimeout(() => evt.target.innerHTML = 'Copy new token to clipboard', 2000)
        })
    }
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
                <Paper className={classes.paper}>
                    <Typography variant='h5' component='h2'>Settings</Typography>
                    <TextField
                        id="email"
                        label="Email"
                        value={props.state.email}
                        fullWidth
                        className={classes.textfield}
                        onChange={props.onChange}
                        inputProps={{readOnly:true, required:true}}
                    />
                    <TextField
                        id="username"
                        label="Username"
                        value={props.state.username}
                        fullWidth
                        className={classes.textfield}
                        inputProps={{readOnly:true, required:true}}
                        onChange={props.onChange}
                    />
                    <TextField
                        id="min_time"
                        label="Minimum Time for Tracking a website"
                        value={props.state.min_time}
                        className={classes.textfield}
                        fullWidth
                        margin="dense"
                        onChange={props.onChange}
                        inputRef={min_time}
                        inputProps={{type:'number'}}
                    />
                    <Button variant='contained' color='primary' className={classes.addButton} onClick={onMinClick}>Change min time</Button>
                    <Typography style={{margin:`20px 0`}}>Domains blocked from tracking</Typography>
                    <Button variant='contained' color='secondary' className={classes.delButton} style={{display: show ? `block` : `none`}}
                    onClick={onDelClick}>Delete</Button>
                    <List component="nav" aria-label="main mailbox folders" ref={domains}>
                        {props.state.blocked_sites.map((item, index) => (
                            <ListItem button key={item}>
                                <img alt='domain-icon' src={`http://s2.googleusercontent.com/s2/favicons?domain_url=${item}`} className={classes.img}/>
                                <FormControlLabel
                                value="start"
                                control={<Checkbox color="primary" inputProps={{id: item}}/>}
                                label={<Typography variant='h6' component='h3' className={classes.domains}>{item}</Typography>}
                                onChange={onChange}
                                />
                            </ListItem>
                        ))}
                        {!props.state.blocked_sites.length && <p>No sites blocked</p>}
                        <TextField
                        id="new_domain"
                        label="Add new domain to block tracking"
                        className={classes.textfield}
                        fullWidth
                        margin="dense"
                        inputRef={new_domain}
                        />
                        <strong><small ref={helper}></small></strong>
                        <Button variant='contained' color='primary' className={classes.addButton} onClick={onAddClick}>Add</Button><br/>
                        <Button variant='contained' color='primary' className={classes.addButton} onClick={evt => copyToken(evt)}>Copy new token to clipboard</Button>
                    </List>
                </Paper>
            </main>
        </div>
    )
}
