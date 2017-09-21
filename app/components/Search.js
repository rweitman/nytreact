import React from 'react';
import helpers from './utils/Helpers';
var Link = require("react-router").Link;
import Result from './Result';
import Saved from './Saved';

export default class Search extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			term: "",
			rec_number: 5,
			start_year: "",
			end_year: "",
			articles: [],
			results: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.clearResults = this.clearResults.bind(this);
	}

	handleChange(event) {
		var newState = {};
		newState[event.target.id] = event.target.value;
		this.setState(newState);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.setState({ results:false });
		this.component_Update();
		this.setState({ term: "",
			rec_number: 5,
			start_year: "",
			end_year: "", 
		});
	}
	clearResults(){
		this.setState({ term: "",
			rec_number: 5,
			start_year: "",
			end_year: "", 
			results:false,
		});
	}
	component_Update() {
		helpers.runQuery(this.state.term, this.state.start_year, 
			this.state.end_year, this.state.rec_number).then(function(data) {
				let article_data = []
				for(var i=0; i<this.state.rec_number ; i++){
					if(data[i].headline.main && data[i].pub_date && data[i].web_url) {
						article_data.push({
							"title" : data[i].headline.main,
							"date" : data[i].pub_date,
							"url": data[i].web_url
						});
					}
				}
				this.setState({ articles: article_data, results:true });
				
			}.bind(this));
		}
		render(){
			let resultPanel;
			if(this.state.results){
				resultPanel = <Result articles = {this.state.articles} showSave={true}/>
			}
			return(
				<div>
				<div className="row">
				<div className="col-sm-12">
				<div className="panel panel-primary">
				<div className="panel-heading">
				<h1 className="panel-title text-center"><strong><i className="fa  fa-list-alt"></i> Search </strong></h1>
				</div>
				<div className="panel-body">
				<form role="form" onSubmit={this.handleSubmit}>
				<div className="form-group text-center">
				<label for="search">Topic</label>
				<input type="text" className="form-control text-center" id="term" value={this.state.term} onChange={this.handleChange}/>
				</div>
				<div className="form-group text-center">
				<label for="start-year">Start Year</label>
				<input type="text" className="form-control text-center" id="start_year" value={this.state.start_year} onChange={this.handleChange}/>
				</div>
				<div className="form-group text-center">
				<label for="end-year">End Year</label>
				<input type="text" className="form-control text-center" id="end_year" value={this.state.end_year} onChange={this.handleChange}/>
				</div>
				<div className="text-center">
				<button type="submit" className="btn btn-lg btn-default" id="run-search"><i className="fa fa-search"></i> Search</button>
				</div>
				</form>
				</div>
				</div>
				</div>
				</div>
				<div className="row">
				<div className="col-sm-12">
				<div className="panel panel-primary">
				<div className="panel-heading">
				<h3 className="panel-title text-center"><strong><i className="fa fa-table"></i>Results</strong></h3>
				</div>
				<div className="panel-body" id="well-section">

				{resultPanel}
				</div>
				</div>
				</div>
				</div>
				
				<Saved />




				</div>
				);
		}
	}