import React, { Component } from 'react';
import '../App.scss';

class City extends Component {
    render() {
        return (
            <div className="data__city">
                <p className="city-name">{this.props.city}</p>
                <img className="city__icon" src={`http://openweathermap.org/img/w/${this.props.weatherIcon}.png`} alt="" />
            </div>
        );
    }
}

export default City;
