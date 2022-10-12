import React from 'react'
import PropTypes from 'prop-types'

export default class Event extends React.Component {
	render() {
		return (
			<div className="card">
				<p className="card-header">{this.props.name}</p>
				<div className="card-body">
					<p className="card-text"><span className="fw-bold">Description: </span>{this.props.description}</p>
					<p className="card-text"><span className="fw-bold">Date: </span>{this.props.date}</p>
				</div>
			</div>
		)
	}
}

Event.propTypes = {
	name: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired
}