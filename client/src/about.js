import React from "react"; 

class About extends React.Component {

   render () {
       return (
           <div>
              <h1>more about this <span>project</span></h1>
               <div>
                    <h3>What is this project?</h3>
                    <p> My project is designed for college students or recent graduates who are interested 
                        in learning the types of jobs they qualify for based on their current or potential skills.
                    </p>
               </div>
               <div>
                    <h3>What inspired me to build this website?</h3>
                    <p>
                    I've always been interested in college and career related topics. One of them is job searching. As a recent graduate, 
                    I've struggled and in fact I am still struggling to figure out exactly what job titles can I apply to based on my skills. 
                    While, I was brainstorming ideas for my passion project for the QCC TechWorks program, I automatically wanted to tackle this problem.  
                    </p>
               </div>
        </div>
       )
   }
}
export default About;