import React from 'react'; 

let userSkills = [];  //storing the user's skills 
class Search extends React.Component {
    constructor(props) {
        super(props); 
        this.data = [
            {1: "java"},
            {2: "javascript"},
            {3: "sql"}
        ]
        this.state = {
            matches: [],
            errorMessage: '',
        } 
    }
    
    //function to match characters. 
    onChangedEvent = (e) => {
        let value = e.target.value; //capture the char as user types
        value = value.toLowerCase(); 
        let matches  = []; 
        //matching input value to stored data
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`); 
            let skillsName = this.data.map((val,index) => val[index+1])
            matches = skillsName.sort().filter(val => regex.test(val))
        }
       this.setState(()=> ({matches})); 
    }

    outputResults () {
        const { matches } = this.state; 
        //if nothing is matched then output null. 
        if (matches.length ===  0 ) {
            return null; 
        } 
        //return the matched array. 
        return (
            <ul> 
                {matches.map((item) => <li key={item}>{item}</li>)}
            </ul>
        )
    }

    handleEnterKey = (e) => {
        const { matches } = this.state;
        if(e.key === 'Enter' && matches.length > 0) {
            userSkills.push(e.target.value); 
        } else if(e.key === 'Enter' && matches.length === 0) {
            this.setState({
                errorMessage: "error"
            })
         } else if(e.key === 'Backspace') {
            this.setState({
                errorMessage: ""
            })
        }
    }

    render () {
        return (
            <div>  
                <input onChange={this.onChangedEvent} onKeyDown={(e) => this.handleEnterKey(e)} type="text"/> 
                {this.outputResults()}
                {this.state.errorMessage} 
            </div>
        )
    }
}

export default Search; 