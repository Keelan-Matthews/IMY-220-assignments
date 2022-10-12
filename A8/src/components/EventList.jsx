import React from 'react'
import Event from './Event.jsx'

export default class EventList extends React.Component {
    filterEvents(events, theDate) {
        return events.filter((event) => event.date === theDate)
    }

    render() {
        return (
            <React.Fragment>
                <h2>Events on the {this.props.theDate}</h2>
                <div className="row">
                    {this.filterEvents(this.props.events, this.props.theDate).map((event, index) => (
                        <div className="col-4" key={index}>
                            <Event name={event.name} description={event.description} date={event.date} />
                        </div>
                    ))}
                </div>
            </React.Fragment>
        )
    }
}