import React from 'react';
import { Crumb } from './Crumb.js'


export class CrumbFeed extends React.Component {
	constructor(props) {
		super(props);
	}



	render() {
		return (
		<div>
			<h1>CRUMB FEED</h1>
			<div>
				{this.props.crumbs.reverse().map((crumb) =>
				<Crumb crumb={crumb} />
				)}
			</div>
	    </div>
	    )
	}
}
