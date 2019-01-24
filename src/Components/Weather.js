import React, { Component } from 'react';
import axios from 'axios';
import Day from './Day';
import City from './City';
import '../App.scss';

class Weather extends Component {
    constructor(props) {
        super(props);

        this.state = {
            zipCode: this.props.zip,
            city: [],
            current: [],
            forecast: [],
            weatherIcon: '',
            error: '',
            errorState: 'hide',
            success: false
        };

        this.handleZipInput = this.handleZipInput.bind(this);
        this.getWeather = this.getWeather.bind(this);
    }

    // Handle ZIP code input
    handleZipInput(event) {
        this.setState({ zipCode: event.target.value }, () =>{
            if ( this.state.zipCode.length === 5 ) { this.getWeather(); } 
        });
    }

    // Gets current states zipCode and fetches both current and forecasted weather data.
    // That response data is then used to set state.
    getWeather() {
        const zip = this.state.zipCode
        const appid = '94396816709a67bb9a7a501867dc94ba';
        const units = 'imperial';
        const currentUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${appid}&units=${units}`;
        const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?zip=${zip}&appid=${appid}&units=${units}`;
        
        const requests = [
            axios.get(currentUrl),
            axios.get(forecastUrl)
        ];
        
        axios.all(requests)
        .then(axios.spread((current, forecast) => {
            if (this.state.city !== current.data.name){
                this.setState({
                    city: current.data.name,
                    weatherIcon: current.data.weather[0].icon,
                    current: Math.floor(current.data.main.temp),
                    forecast: forecast.data.list,
                    error: '',
                    errorState: 'hide',
                    success: true
                });
            }
        }))
        .catch(error => {
            if (error.response) {
                console.log(error.response.data.message);
                this.setState({
                    error: error.response.data.message,
                    errorState: 'show'
                });
            }
        });   
    }

    componentDidMount() {
        if ( this.state.zipCode.length === 5 ) { this.getWeather(); } 
    }

    render() {
        const { city, current, forecast, weatherIcon, error, errorState, success } = this.state
        let weatherForecast = {};
        let errorMessage = '';
        let count = 0;

        // Set error message
        error ? (errorMessage = `${error}. Please try again.`) : (errorMessage = "");

        // Get weather data for each day and push to object
        for (let i = 1; i < forecast.length; i++) {
            if (i === 0 || (i % 8 === 0) ){
                var d = new Date(forecast[i]["dt_txt"]);
                var dayName = d.toString().split(' ')[0];

                weatherForecast[count] = {
                    day: dayName,
                    temp: Math.floor(forecast[i].main.temp),
                }

                count++;
            }
        }

        return (
            <div className="widget">

                <div className="widget__input">
                    <label htmlFor="zip">ZIP</label>
                    <input type="text" placeholder={this.state.zipCode} value={this.state.value} onChange={this.handleZipInput} maxLength="5" />
                </div>

                {success ?  (
                    <div className="widget__data">
                        <City city={city} weatherIcon={weatherIcon} />

                        <Day isToday={true} name="Today" temp={current} />

                        {Object.entries(weatherForecast).map(forecast => (
                            <Day isToday={false}
                                name={forecast[1].day}
                                temp={forecast[1].temp}
                                key={forecast[1].day}
                            />
                        ))}
                    </div>
                ) : (
                    <div>
                        <h3>There was an issue retrieving weather data.</h3>
                        <h3>Please check the ZIP code and try again.</h3>
                    </div>
                )}


                <div className="widget__error-area">
                    <p className={`widget__error-message_${errorState}`}>{errorMessage}</p>
                </div>
            </div>
        );
    }
}

export default Weather;
