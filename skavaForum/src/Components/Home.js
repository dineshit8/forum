import React, { Component } from "react";
import data1 from "./QuestionList.json";
import ReactDOM from 'react-dom';
import "./Home.css";
import axios from 'axios';
import Qa from './Qapage';
export class Home extends Component {
constructor(props)
{
	super(props);
	this.state = {data:""};
	this.myref = React.createRef();
	this.navigateQuestion = this.navigateQuestion.bind(this);
}
componentWillMount() {
	var self = this;
	axios({
		method: 'get',
		url: 'http://localhost:4000/api/rest/getQuestions',
		config: { headers: {'Content-Type': 'application/json' }},
		credentials: 'same-origin'
		})
		.then((response) => {
			self.setState({data : response && response.data && response.data.message ? response.data.message : ""});
		})
		.catch(function (response) {
			console.log(response);
	});
}
render(){
	var self = this;
	return(
		 this.state.data.length ?
		 	
            <div className="homePage">
            	<div className="questContainer">
	                <div className="questTitle">Questions</div>
	                <div className="LoginAskQuestion"></div>
                	<div className="ListQuestions">
		                {
		                    this.state.data.map(function(questions,i){
			                    return <div className={"parentListDiv list_0" + i} uid={questions.userId}>
			                      <div className="questionTitle" qid={questions.questionId} ref = {self.myref} onClick={self.navigateQuestion.bind(this) } >{questions.title}</div> <br/>
			                      <div className="questionDesc" qid={questions.questionId} ref = {self.myref} >{questions.description} </div> <br/>
								  <div className="questionTag">
									{
										questions.relatedTags.map(function(tags,j)
										{
											return <div className="tagsBackground">{tags}</div>
										})
									}
								  </div>  
							     </div>;
		                	})
		                }   
            		</div>
            	</div>
            	<div className="popularTags">
            		<div className="popularTagTitle">Popular Tags</div>
            		<div className="tagsName">
            		{
            			this.state.data.map(function(tagid,i){
			                    return <div className={"tag_0" + i}>
			                      		<div className="tagsBackground tagAlign">{tagid.title}</div>
			                    </div>;
			                })
            		}	
            		</div>
            	</div>
           </div>
		   : "Please Wait... "
		)
	}
navigateQuestion(self)
{
	var QuestionId = self ? self.target.getAttribute("qid") : "";
	window.location.href = "/Qa?id="+QuestionId;
}
}
export default Home;