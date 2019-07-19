import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles(theme => ({
	paper: {
    	marginTop: theme.spacing(8),
    	display: 'flex',
    	flexDirection: 'column',
    	alignItems: 'center',
    	backgroundColor: theme.palette.background.paper,
  	},
  	avatar: {
    	margin: theme.spacing(1),
    	backgroundColor: theme.palette.secondary.main,
  	},
  	form: {
    	width: '100%',
		marginTop: theme.spacing(3),
		textAlign: 'left',
  	},
  	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	'signed-in-link': {
		padding: '30px 0'
	}
}));

export default function SignUpTemplate(props) {
	const classes = useStyles();
  	return (
    	<Container component="main" maxWidth="xs">
      		<CssBaseline />
			<Dialog
			open={props.err_state}
			onClose={props.handleClose}
			>
				<DialogTitle id="alert-dialog-title">{props.err_message}</DialogTitle>
			</Dialog>
      		<div className={classes.paper}>
        		<Avatar className={classes.avatar}>
          			<LockOutlinedIcon />
        		</Avatar>
        		<Typography component="h1" variant="h5">
          			Sign up
        		</Typography>
        		<form className={classes.form} method="POST" onSubmit={props.onSubmit}>
          			<Grid container spacing={2}>
            			<Grid item xs={12}>
              				<TextField
                			autoComplete="name"
							variant="outlined"
							required
							fullWidth
							id="username"
							label="Username"
							autoFocus
							defaultValue={props.username}
							onChange={props.onChange}
							/>
            			</Grid>
            			<Grid item xs={12}>
              				<TextField
							variant="outlined"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							defaultValue={props.email}
							onChange={props.onChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
							variant="outlined"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							defaultValue={props.password}
							onChange={props.onChange}
							/>
						</Grid>
          			</Grid>
          			<Grid container justify="space-between">
						<Grid item>
					  	<Button
							type="submit"
							variant="contained"
							color="primary"
							className={classes.submit}
							>
								Sign Up
						</Button>
						</Grid>
            			<Grid item className={classes['signed-in-link']}>
              				<Link to="/signin">
                				Already have an account? Sign in
              				</Link>
            			</Grid>
          			</Grid>
        		</form>
      		</div>
    </Container>
  );
}