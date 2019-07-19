import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
			marginTop: theme.spacing(1),
			textAlign: 'left',
		},
		submit: {
			display: 'block',
			margin: theme.spacing(3, 0),
			marginLeft: 'auto',
			marginRight: 'auto',
		},
  }));

export default function SignInTemplate(props) {
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
				Sign in
        	</Typography>
        <form className={classes.form} onSubmit={props.onSubmit}>
			<TextField
			variant="outlined"
			margin="normal"
			required fullWidth
			name="email"
			label="Email Address"
			type="email"
			id="email"
			autoComplete="email"
			autoFocus
			defaultValue={props.email}
			onChange={props.onChange}
			/>
          	<TextField
			  variant="outlined"
			  margin="normal"
			  required fullWidth
			  name="password"
			  label="Password"
			  type="password"
			  id="password"
			  autoComplete="current-password"
			  defaultValue={props.password}
			  onChange={props.onChange}
			  />
          	<FormControlLabel
            	control={<Checkbox value="remember" color="primary" />}
				label="Remember me"
				checked
          	/>
          	<Button
            	type="submit"
            	variant="contained"
            	color="primary"
            	className={classes.submit}
          	>
            	Sign In
          	</Button>
          	<Grid container justify='space-between'>
            	<Grid item>
              		<Link to="#">
                		Forgot password?
              		</Link>
            	</Grid>
            	<Grid item>
					<Link to="/signup">
                		Don't have an account? Sign Up
              		</Link>
            	</Grid>
          	</Grid>
        </form>
      </div>
    </Container>
  );
}