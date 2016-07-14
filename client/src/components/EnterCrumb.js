import React from 'react';

export class EnterCrumb extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
		<div>
		  <form>
        	<input
          		type="text"
          		placeholder="Enter your crumb..."
          	/>
      	  </form>
	    </div>
	    )
	}
}
