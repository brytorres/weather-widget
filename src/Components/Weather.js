import React, { Component } from 'react';
import axios from 'axios';
import Day from './Day';
import '../App.scss';

class Weather extends Component {
    constructor(props) {
        super(props);

        this.state = {
            zipCode: this.props.zip,
            city: [],
            current: [],
            weatherIcon: '',
            forecast: [],
            error: ''
        };

        this.getCurrentWeather = this.getCurrentWeather.bind(this);
        this.getWeatherForecast = this.getWeatherForecast.bind(this);
    }

    getCurrentWeather(url) {
        return axios.get(url);
    }

    getWeatherForecast(url) {
        return axios.get(url);
    }

    componentDidMount() {

        const zip = this.props.zip
        const appid = 'b08abc60f5222977c05dc54b137b2d17';
        const units = 'imperial';
        const currentUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${appid}&units=${units}`;
        const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?zip=${zip}&appid=${appid}&units=${units}`;
        
        axios.all([this.getCurrentWeather(currentUrl), this.getWeatherForecast(forecastUrl) ])
        .then(axios.spread((current, forecast) => {
            this.setState({
                city: current.data.name,
                weatherIcon: current.data.weather[0].icon,
                current: Math.floor(current.data.main.temp),
                forecast: forecast.data.list
            });
        }));

    }

    render() {
        const { city, current, forecast, weatherIcon } = this.state

        console.log(city);

        return <main className="weather">
            <div className="widget">
              <div className="widget__input">
                <label htmlFor="zip">ZIP</label>
                <input type="text" name="zip" />
              </div>

              <div className="widget__data">
                <div className="data__city">
                  <p className="city-name">{city}</p>

                  <img src={ `http://openweathermap.org/img/w/${weatherIcon}.png`} alt="" />
                </div>

                <Day isToday={true} name="Today" temp={current} />
                <Day isToday={false} name="Tue" temp="68" />
                <Day isToday={false} name="Wed" temp="70" />
                <Day isToday={false} name="Thu" temp="71" />
                <Day isToday={false} name="Fri" temp="74" />
              </div>
            </div>
          </main>;
    }
}

export default Weather;
