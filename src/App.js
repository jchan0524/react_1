
import React from 'react';
import './index.css';
import Employee from './components/Employee'; 
import {useState} from 'react'; 
import {v4 as uuidv4} from 'uuid'; 

function App() {
  
  const [role, setRole] = useState('dev'); 
  const [employees, setEmployees] = useState(
    [
      {
        name: "Abby", 
      role:"Developer", 
      img: "https://images.pexels.com/photos/14711370/pexels-photo-14711370.jpeg"
    },
    { 
      name: "Jane", 
    role:"Developer", 
    img: "https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg"
  },
  { 
    name: "Caleb", 
  role:"Developer", 
  img: "https://images.pexels.com/photos/4890733/pexels-photo-4890733.jpeg"
},
{ 
  name: "John", 
role:"Engineer", 
img: "https://images.pexels.com/photos/2741701/pexels-photo-2741701.jpeg"
},
{ 
  name: "Akiva", 
role:"Sitting", 
img: "https://images.pexels.com/photos/2287252/pexels-photo-2287252.jpeg"
},
{ 
  name: "Rob", 
role:"Podcasting", 
img: "https://images.pexels.com/photos/2104252/pexels-photo-2104252.jpeg"
},

    ]); 
  //Can put statements before the return - variables, printing 
  const showEmployees = true; 
  return (
    <div className="App">
      {/* to show js code must use curly brackets before code */}
      {/* Is blank true use question mark */}
      {showEmployees ? ( 
      
        <>
        <input 
        type = 'text' 
        onChange={
          (e) => {console.log(e.target.value); 
            // Use state!!!
            // if it starts with use it is most likely a hook
            setRole(e.target.value); 
        }}
        />
      

        <div className = "flex flex-wrap justify-center">
          {employees.map((employees)=>{
            
            return(
            <Employee 
              key = {uuidv4()}
              name={employees.name} 
              role={employees.role} 
              img={employees.img}
              
              />
            );  
          }

          )}
        
        </div>
        </>
        ):(
      
        <p>
         You cannot see the employees 
        </p>
      )}
     
      
    </div>
  );
}

export default App;
