import React, { Component } from 'react';
import Weather from './Components/Weather';
import './App.scss';

class App extends Component {
	render() {
		return (
			<div className="app">
				<nav className="nav">
					<h3 className="nav__brand_title">Weather Widget</h3>
				</nav>

				<Weather zip="32801"/>
			</div>
		);
	}
}

export default App;

