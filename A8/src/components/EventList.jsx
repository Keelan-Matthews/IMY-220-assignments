import React from 'react'
import Event from './Event.jsx'
import DateForm from './DateForm.jsx'
import PropTypes from 'prop-types'

export default class EventList extends React.Component {

    constructor(props) {
        super(props)
        this.filterEvents = this.filterEvents.bind(this)
        this.onDateChange = this.onDateChange.bind(this)
        this.state = {eventsDate: this.props.theDate}
    }

    filterEvents(events, theDate) {
        return events.filter((event) => event.date === theDate)
    }

    onDateChange(isDate, newDate) {
        if (isDate) {
            this.setState({eventsDate: newDate})
        }
    }

    render() {
        return (
            <React.Fragment>
                <DateForm events={this.props.events} onDateChange={this.onDateChange} />
                <h2>Events on the {this.state.eventsDate}</h2>
                <div className="row">
                    {this.filterEvents(this.props.events, this.state.eventsDate).map((event, index) => (
                        <div className="col-4" key={index}>
                            <Event name={event.name} description={event.description} date={event.date} />
                        </div>
                    ))}
                </div>
            </React.Fragment>
        )
    }
}

EventList.propTypes = {
    events: PropTypes.array.isRequired,
    theDate: PropTypes.string.isRequired
}