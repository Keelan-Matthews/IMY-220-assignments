import React from 'react';
import { createRoot } from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import io from 'socket.io-client';
import EnrolmentList from './components/EnrolmentList.jsx';

const socket = io.connect('http://localhost:3000');
class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			classes: []
		};
	}
	
	componentDidMount() {
		socket.on('classes', (classes) => {
			this.setState({classes: classes});
		});
	}

	render() {
		return (
			<div className="container">
				<EnrolmentList classes={this.state.classes} />
			</div>
		);
	}
}

createRoot(document.getElementById('root')).render(<Index />);

