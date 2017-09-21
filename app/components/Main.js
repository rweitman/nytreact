import React from 'react';
import Saved from './Saved';
import Search from './Search';
import helpers from './utils/Helpers';
var Link = require("react-router").Link;

export default class Main extends React.Component{
	

	render(){
		return (
			<div>
			<div className="container">
			<div className="row">
			<div className="jumbotron">
			<h2 className="text-center">New York Times Article Scrubber</h2>
			</div>
			<div className="col-sm-offset-1 col-sm-10">
			
			<div className="row">
			<div className="col-sm-offset-1 col-sm-10">
			{this.props.children}
			</div>
			</div>
			</div>
			</div>
			</div>
			</div>
			);
	}
}
