import React from 'react'

export default class Event extends React.Component {
	render() {
		return (
			<div className="card">
				<h3 className="card-title">{this.props.name}</h3>
				<div className="card-body">
					<p className="card-text"><span className="fw-bold">Description: </span>{this.props.description}</p>
					<p className="card-text"><span className="fw-bold">Date: </span>{this.props.date}</p>
				</div>
			</div>
		)
	}
}