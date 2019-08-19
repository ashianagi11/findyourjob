import React from 'react'; 
import axios from 'axios'; 
import Result from './result'; 
import {Link} from 'react-router-dom'; 

var skills = []; 
var results = []; 

class Search extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            data: [], 
            matches: [], 
            results, 
            skills, 
            errorMessage: '',
        } 
    }

    // fetching skills from database and updating it to data in state. 
    async componentDidMount() {
        try {
            const res = await axios.get("/api/skills")
            let skillsArray = res.data.map(skill => skill.skill_name) 
            this.setState({
                data: skillsArray,
            })
        } catch(error){
            console.log(error)
        }
    }

    //matching inputted skill to skills stored in data
    onChangedEvent = (e) => {
        let value = e.target.value;
        value = value.toLowerCase(); 
        let matches  = []; 
        if (value.length > 0) {
            const regex = new RegExp(`^${value}\+`, "g"); 
            console.log(regex)
            matches = this.state.data.sort().filter(val => regex.test(val))
        }
       this.setState(()=> ({matches}));
    }
  
    //outputs results of matched skills to user. 
    outputResults () {
        const { matches } = this.state; 
        if (matches.length ===  0 ) {
            return null; 
        } 
        return (
            <ul> 
                {matches.map((item) => <li key={item}>{item}</li>)}
            </ul>
        )
    } 

    //handling input errors 
    handleEnterKey = (e) => {
        const { matches } = this.state;
        if(e.key === 'Enter' && matches.length > 0) {
            skills.push(e.target.value); 
        } else if(e.key === 'Enter' && matches.length === 0) {
            this.setState({
                errorMessage: "Skill does not exist in the database. Try Again!"
            })
         } else if(e.key === 'Backspace') {
            this.setState({
                errorMessage: ''
            })
        }
    }

    //fetching matched jobs from database.
    fetchResults = async skills => {
       skills.map(async function(skill) {
            try {
                const res = await axios.get(`/api/results/${skill}`); 
                let resultsArray = res.data.map(result => result.jobs_name);
                results = results.concat(resultsArray); 
                this.setState({
                    results: results
                })
                console.log(this.state.results, "results");
            } catch(error) {
                console.log(error);
        }   }, this)
    }

    //sorts the job results from most common to least
    compressArray(results) {
            var jobResults = [];
            var copy = results.slice(0); 
            for (var i = 0; i < results.length; i++) {
                var jobCount = 0;	
                for (let j = 0; j < copy.length; j++) {
                    if (results[i] === copy[j]) {
                        jobCount++;
                        delete copy[j];
                    }
                }
                if (jobCount > 0) {
                    var obj = {};
                    obj.value = results[i];
                    obj.count = jobCount;
                    jobResults.push(obj);
                }
            }
            jobResults = jobResults.sort((a,b) => (a.count < b.count) ? 1: -1); 
            console.log(jobResults)
            return jobResults;
        }

    render () {
        return (
            <div>  
                <nav>
                    <Link to="./about" id="about">About</Link>
                </nav>
                <div className="container">
                    <h1>enter your <span id="tech">tech</span> skills</h1>
                    <div className="content">
                        <div>
                            <div className="search">
                                <input onChange={this.onChangedEvent} onKeyDown={(e) => this.handleEnterKey(e)} type="text" placeholder="example: Javascript"></input>
                                <button type="button" onClick={()=> this.fetchResults(this.state.skills)}> 
                                    Search
                                </button>
                            </div>
                            <div className="matchedResults">
                                {this.outputResults()}
                                {this.state.errorMessage}
                            </div>
                        </div>
                    </div>
                    <div className="skills"> 
                        <ul id="skills">
                            skills: 
                            {this.state.skills.map((skill, index) => <li key={index} id="skills">{skill}</li>)}  
                        </ul>
                    </div>
            </div>
            <Result compressArray={this.compressArray} results={this.state.results}/> 
        </div>
        )
    }
}
export default Search; 