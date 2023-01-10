
import React from 'react';
import '../index.css';
import Employee from '../components/Employee'; 
import {useState} from 'react'; 
import {v4 as uuidv4} from 'uuid'; 
import AddEmployee from '../components/AddEmployee';
import EditEmployee from '../components/EditEmployee';
import Header from '../components/Header'; 



function Employees() {
  
  const [role, setRole] = useState('dev'); 
  const [employees, setEmployees] = useState(
    [
      {
        id : 1,
        name: "Abby", 
      role:"Developer", 
      img: "https://images.pexels.com/photos/14711370/pexels-photo-14711370.jpeg"
    },
    { 
      id : 2,
      name: "Jane", 
    role:"Developer", 
    img: "https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg"
  },
  { 
    id : 3,
    name: "Caleb", 
  role:"Developer", 
  img: "https://images.pexels.com/photos/4890733/pexels-photo-4890733.jpeg"
},
{ 
  id : 4,
  name: "John", 
role:"Engineer", 
img: "https://images.pexels.com/photos/2741701/pexels-photo-2741701.jpeg"
},
{ 
  id : 5,
  name: "Akiva", 
role:"Sitting", 
img: "https://images.pexels.com/photos/2287252/pexels-photo-2287252.jpeg"
},
{ 
  id : 6,
  name: "Rob", 
role:"Podcasting", 
img: "https://images.pexels.com/photos/2104252/pexels-photo-2104252.jpeg"
},

    ]);
    function updateEmployee(id, newName, newRole){
      const updatedEmployees = employees.map((employee)=>{
        if(id===employee.id){
          return{...employee, name: newName, role: newRole}
        }
        return employee; 
      }); 
      setEmployees(updatedEmployees); 
    } 

    function newEmployee(name, role, img){
      const newEmployee = {
        id: uuidv4(),
        name: name,
        role: role, 
        img: img,
      };
      setEmployees([...employees, newEmployee])


    }

  //Can put statements before the return - variables, printing 
  const showEmployees = true; 
  return (
    <div className="App">
      
      {/* to show js code must use curly brackets before code */}
      {/* Is blank true use question mark */}
      {showEmployees ? ( 
      
        <>
       
        
      

        <div className = "flex flex-wrap justify-center">
          {employees.map((employee)=>{
            const editEmployee = (
            <EditEmployee 
            id={employee.id}
            name={employee.name} 
            role={employee.role}
            updateEmployee={updateEmployee}
             />

            ); 
          
            
            return (
            <Employee 
              key = {employee.id}
              id={employee.id}
              name={employee.name} 
              role={employee.role} 
              img={employee.img}
              editEmployee = {editEmployee}
              
              />
            );  
          }

          )}
        
        </div>
        <AddEmployee newEmployee ={newEmployee} 
        />
        </>
        ):(
      
        <p>
         You cannot see the employees 
        </p>
      )}
     
      
    </div>
  );
}

export default Employees;
