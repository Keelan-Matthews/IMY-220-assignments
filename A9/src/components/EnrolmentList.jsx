import React from 'react';

export default class EnrolmentList extends React.Component {

    render() {
        return (
            <div>
                <h1>Select a class</h1>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        Show 7 classes:
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {
                            this.props.classes.map((item, index) => <span className="dropdown-item" data-code={item.code} key={index}>{item.code}</span>)
                        }
                    </div>
                </div>
            </div>
        );
    }
}
