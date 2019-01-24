import React, { Component } from 'react';
import '../App.scss';

class Day extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        const { isToday, name, temp } = this.props;
        console.log(isToday)
        let dayName, day;

        isToday ? dayName = 'Today' : dayName = name;
        isToday ? day = 'today' : day = 'day';

        console.log(day)

        return (
            <div className={ `data__${day}` }>
                <p className="day__name">{dayName}</p>
                <p className="day__temp">{temp}</p>
            </div>
        );
    }
}

export default Day;
