import React from 'react';

export class Crumb extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
		<li>{ this.props.crumb }</li>
	    )
	}
}
