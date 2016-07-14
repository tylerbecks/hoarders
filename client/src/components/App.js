import React from 'react';
import { EnterCrumb } from './EnterCrumb.js'
import { CrumbFeed } from './CrumbFeed.js'

class App extends React.Component {
	constructor(props){
		super(props)
		
		this.state = {
			crumbs: ['hello', 'bread', 'crumbs'],
			token: true
		}

	}

	handleClick(e) {
		this.setState({
			token: !this.state.token
		});
	}

	render(){
		if ( this.state.token === true ) {
		return (
		  <div>
		  	<EnterCrumb />
		  	<div>
		  	<CrumbFeed crumbs={this.state.crumbs} />
		  	</div>
		  	<button onClick={this.handleClick.bind(this)}>test</button>
		  </div>
		);
		} else {
			return (
				<div>
					<h1>Success</h1>
					<button onClick={this.handleClick.bind(this)}>test</button>
				</div>);
		}
	}
}

export default App