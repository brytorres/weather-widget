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
            forecast: [],
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
    }

    handleSubmit(event) {
    }

    componentDidMount() {

        const zip = this.props.zip
        const appid = 'b08abc60f5222977c05dc54b137b2d17';
        const units = 'imperial';
        const url = `http://api.openweathermap.org/data/2.5/forecast?zip=${zip}&appid=${appid}&units=${units}`;
        
        axios.get(url).then(response => {
            this.setState({
                city: response.data.city,
                forecast: response.data.list
            });
        })
        .catch(function (error) {
            console.log(error);
            this.setState({
                error: error.message
            });
        });
    }

    render() {
        return (
            <main className="weather">

                <div className="widget">
                    <div className="widget__input">
                        <label htmlFor="zip">ZIP</label>
                        <input type="text" name="zip"/>
                    </div>

                    <div className="widget__data">
                        <div className="data__city">
                            <p className="city-name">Orlando</p>

                            {/* icon here */}
                        </div>

                        <Day isToday={true}  name='Mon' temp='72' />
                        <Day isToday={false} name='Tue' temp='68' />
                        <Day isToday={false} name='Wed' temp='70' />
                        <Day isToday={false} name='Thu' temp='71' />
                        <Day isToday={false} name='Fri' temp='74' />
                    </div>
                </div>

            </main>
        );
    }
}

export default Weather;
