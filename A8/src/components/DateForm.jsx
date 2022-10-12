import React from 'react'
import PropTypes from 'prop-types'

export default class DateForm extends React.Component {
    constructor(props) {
        super(props)
        this.handleDateChange = this.handleDateChange.bind(this)
    }

    handleDateChange(e) {
        const theDate = e.target.value
        const isDate = this.props.events.some((event) => event.date === theDate)
        this.props.onDateChange(isDate, theDate)
    }

    render() {
        return (
            <input type="text" placeholder='0000/00/00' onChange={this.handleDateChange} />
        )
    }
}

DateForm.propTypes = {
    events: PropTypes.array.isRequired,
    onDateChange: PropTypes.func.isRequired
}