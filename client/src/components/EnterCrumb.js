import React from 'react';

export class EnterCrumb extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		}
	}

	handleCrumbChange(e) {
		console.log(e.target.value);
		this.setState({
			value: e.target.value
		})
	}





	render() {
		return (
	    <div>
	    	<div>
	    		<input type="text" id="configname" name="configname" onChange={this.handleCrumbChange.bind(this)} />
	    	</div>
	    	<div>
	    		<button type="button" onClick={() => this.props.addCrumb(this.state.value)}> Try </button>
	    	</div>
	    </div>
	    );
	}
}
