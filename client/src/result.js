import React from "react";

const Result = ({compressArray, results}) => {
    return (
        <div className="resultContainer">
            <div className="disclaimer">
                <h2 style={{color:"red"}}>Results:</h2>
                <h4>Based on your skills, the following job titles are sorted 
                    from most appropriate for you in descending order.
                    Start your job search with these job titles. Good Luck!
                </h4>
            </div>
            <div className="results">
                <ul> 
                    {compressArray(results).map((item, index) =>
                    <li key={index} id="jobsResults"> {item.value} </li>)}
                </ul>
            </div>
        </div>
    
    )
}

export default Result; 
