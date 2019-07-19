import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import urls from './urls'

function App() {
	return (
	<div className="App">
		<Router>
			{
				Object.entries(urls).map((arr, index) => (
					<Route path={arr[1].url} component={arr[1].component} key={index}/>
				))
			}
		</Router>
	</div>
  );
}

export default App;
