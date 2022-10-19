import React from 'react';
import { createRoot } from 'react-dom/client';
import io from 'socket.io-client';
import EnrolmentList from './components/EnrolmentList.jsx';

const socket = io.connect('http://localhost:3000');
class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			classes: []
		};
		this.getEnrolledStudents = this.getEnrolledStudents.bind(this);
	}
	
	componentDidMount() {
		socket.on('classes', (classes) => {
			this.setState({classes: classes});
		});
	}

	getEnrolledStudents(e) {
		socket.emit('getEnrolledStudents', e.target.dataset.code);
	}

	render() {
		return (
			<div className="container">
				<EnrolmentList classes={this.state.classes} getEnrolledStudents={this.getEnrolledStudents} />
			</div>
		);
	}
}

createRoot(document.getElementById('root')).render(<Index />);

