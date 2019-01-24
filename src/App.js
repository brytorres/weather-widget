import React, { Component } from 'react';
import Header from './Components/Header';
import Weather from './Components/Weather';
import './App.scss';

class App extends Component {
	render() {
		return (
			<div className="app">
				<header className="header">
					<h3>Weather Widget</h3>
				</header>

				<Weather />
			</div>
		);
	}
}

export default App;

