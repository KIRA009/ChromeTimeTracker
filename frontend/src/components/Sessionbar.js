import React from 'react'
import {
    List,
    ListItem,
    ListItemText,
    Grid,
    Typography,
    Paper,
    Divider,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
        paper: {
            minWidth: `60%`,
            padding: theme.spacing(1, 2),
            marginLeft: `auto`,
            marginRight: `auto`,
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
        }
    })
)

export default function Sessionbar(props) {
    const classes = useStyles();
    const session = props.session;
    const id = Object.keys(session)[0];
    const session_info = Object.values(session)[0];
    session_info.start_time = new Date(session_info.start_time);
    session_info.end_time = new Date(session_info.end_time)
    session_info.domains.map(domain => {
        domain.start_time = new Date(domain.start_time)
        domain.end_time = new Date(domain.end_time)
    })
    session_info.domains.sort((a, b) => a.start_time - b.start_time)
    return (
        <Paper classes={{root: classes.paper}}>
            <Typography className={classes.sessionTime}>{session_info.start_time.toString().slice(0, 25) + ` to ` + session_info.end_time.toString().slice(0, 25)}</Typography>
            <Typography className={classes.sessionId} gutterBottom>{id}</Typography>
            <Divider />
            <List>
                {
                session_info.domains.map((domain, key) => (
                        <ListItem key={key}>
                            <Grid container>
                                <Grid item xs={12} sm={10}>
                                    <ListItemText 
                                    primary={<a href={domain.url} rel="noopener noreferrer" target='_blank'><img alt="favicon" src={domain.favicon} className={classes.icon} />{domain.title}</a>} secondary={domain.start_time.toString().slice(0, 24) + ` to ` + domain.start_time.toString().slice(0, 24)} />
                                </Grid>
                                <Grid item xs={12} sm={2} className={classes.rightAlign}>
                                    <Typography>{domain.time} seconds</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                    ))
                }
            </List>
        </Paper>
    )
}
