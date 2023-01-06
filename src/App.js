
import React from 'react';
import './App.css';
import Employee from './components/Employee'; 
import {useState} from 'react'; 

function App() {
  
  const [role, setRole] = useState('dev'); 
  console.log("we are about to list the employees"); 
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
      

        
        <Employee name = "Justin" role="intern" />
        <Employee name = "John" />
        <Employee name = "Abby" role = {role}  />
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
