import React, { Component } from 'react';
import '../App.scss';

class Day extends Component {
    render() {
        const { isToday, name, temp } = this.props;
        let dayName, day;

        // Set day and dayName strings
        isToday ? dayName = 'Today' : dayName = name;
        isToday ? day = 'today' : day = 'day';

        return (
            <div className={ `data__${day}` }>
                <p className="day__name">{dayName}</p>
                <p className="day__temp">{temp}</p>
            </div>
        );
    }
}

export default Day;
