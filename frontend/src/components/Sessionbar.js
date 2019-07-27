import React, {useRef, useState} from 'react'
import {
    List,
    ListItem,
    ListItemText,
    Grid,
    Typography,
    Paper,
    Divider,
    Checkbox,
    Button,
    FormControlLabel,
    Slide
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import requests from '../request'

const useStyles = makeStyles(theme => ({
        paper: {
            width: `60%`,
            padding: theme.spacing(1, 2),
            marginLeft: `auto`,
            marginRight: `auto`,
            marginBottom: 20,
            [theme.breakpoints.down('sm')]: {
                width: `80%`,
            },
            [theme.breakpoints.down('xs')]: {
                width: `100%`,
            }
        },
        sessionId: {
            fontSize: theme.typography.pxToRem(13),
            flexShrink: 0,
        },
        sessionTime: {
            fontSize: theme.typography.pxToRem(18),
            color: theme.palette.text.secondary,
            [theme.breakpoints.down('xs')]: {
                fontSize: theme.typography.pxToRem(15),
            }
        },
        rightAlign: {
            textAlign: `right`
        },
        icon: {
            width: 15,
            position: `relative`,
            marginRight: 5,
            top: 2
        },
        deleteButton: {
            margin: theme.spacing(1, 1),
            marginLeft: `auto`,
        }
    })
)

export default function Sessionbar(props) {
    const [show, setShow] = useState(false);
    const session_ref = useRef();
    const classes = useStyles();
    const session = props.session;
    const id = Object.keys(session)[0];
    const session_info = Object.values(session)[0];
    var length = session_info.domains.length;
    var sliders = new Array(length).fill(true);
    const [slide, setSlide] = useState(sliders);
    if (slide.length !== length) {
        sliders = slide.filter(el => el === true)
        setSlide(sliders)
    }
    session_info.start_time = new Date(session_info.start_time);
    session_info.end_time = new Date(session_info.end_time)
    session_info.domains.map(domain => {
        domain.start_time = new Date(domain.start_time)
        domain.end_time = new Date(domain.end_time)
    });
    session_info.domains.sort((a, b) => a.start_time - b.start_time)
    const onChange = evt => {   
        let children = session_ref.current.children;
        setShow(false);
        let length = session_ref.current.querySelectorAll('input').length;
        for (var ind=0; ind<length; ind++) {
            if (children[ind].querySelector('input[type="checkbox"]').checked) {
                setShow(true);
                break;
            }    
        }
    }
    const del_domains = evt => {
        requests.auth = true;
        let children = session_ref.current.children;
        let domains = [];
        for (var ind=0; ind<length; ind++) {
            var child = children[ind].querySelector('input[type="checkbox"]');
            if (child.checked) {
                domains.push(child.id)
                sliders[ind] = false;
            }
        }
        requests.post('/delete-domains/', {domains: domains})
        .then(resp => {
            setShow(false);
            setSlide(sliders);
            props.rerender();
        })
    }
    return (
        <Paper classes={{root: classes.paper}}>
            <Button variant="contained" color="secondary" className={classes.deleteButton} style={{display: (show ? `block` : `none`)}} onClick={del_domains}>Delete</Button>
            <Typography className={classes.sessionTime}>{session_info.start_time.toString().slice(0, 25) + ` to ` + session_info.end_time.toString().slice(0, 25)}</Typography>
            <Divider />
            <List ref={session_ref}>
                {
                session_info.domains.map((domain, index) => (
                    <Slide in={slide[index]} direction='left'  timeout={150} key={domain.id}>
                        <ListItem>
                            <Grid container>
                                <Grid item xs={12} sm={10}>
                                <FormControlLabel
                                value="start"
                                control={<Checkbox color="primary" inputProps={{id: domain.id}}/>}
                                label={<ListItemText primary={<a href={domain.url} rel="noopener noreferrer" target='_blank'><img alt="favicon" src={domain.favicon} className={classes.icon} />{domain.title}</a>} secondary={domain.start_time.toString().slice(0, 24) + ` to ` + domain.end_time.toString().slice(0, 24)} />}
                                onChange={onChange}
                                />
                                </Grid>
                                <Grid item xs={12} sm={2} className={classes.rightAlign}>
                                    <Typography>{domain.time} seconds</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                    </Slide>
                    ))
                }
            </List>
        </Paper>
    )
}   
