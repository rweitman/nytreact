import React from 'react';
import helpers from './utils/Helpers';
var Link = require("react-router").Link;

export default class Result extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			articles: this.props.articles
		};

		this.handleClick = this.handleClick.bind(this);
		this.addSaveButton = this.addSaveButton.bind(this);
	}

	handleClick(article, index, func){
		let newArticles = this.state.articles;
		newArticles.splice(index, 1);
		var x = 1;
		this.setState({articles: newArticles});	
		func(article).then(function() {
			console.log("Updated!");
		}.bind(this));
	}
	
	formatDate(value)
	{
   		return value.getMonth()+1 + "/" + value.getDate() + "/" + value.getYear();
	}


	addSaveButton(article, visibility, index){

		if(visibility){
		return(
			<button className="btn btn-success" onClick={() => this.handleClick(article, index,helpers.postArticle)}>Save</button>
			);
		}
		else {
			return(
			<button className="btn btn-danger" onClick={() => this.handleClick(article, index, helpers.deleteArticle)}>Remove</button>
			);
		}
	}

	render(){
		const articles = this.state.articles;
		const showSave = this.props.showSave;

		const listItems = articles.map((article, i) => 
			


			<p className="well">
			<h4>{article.title}
			<div className="pull-right">
			{this.addSaveButton(article, showSave, i)}
			</div></h4>
			<h5>{article.date}</h5>
			</p>
			);
	
		

		return (
			<div>
			{listItems}
			</div>
			);
			
	}
}