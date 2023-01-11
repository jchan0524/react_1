import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import NotFound from "../components/NotFound";
import { baseUrl } from "../shared";


export default function Customer(){
    const {id} = useParams(); 
    const [customer, setCustomer] = useState(); 
    const [notFound, setNotFound] = useState(); 
    const [tempCustomer, setTempCustomer] = useState(); 
    const [changed, setChanged] = useState(false); 
    const [error, setError] = useState(); 
    const navigate = useNavigate(); 

    useEffect(() => {
        if(!customer) return; 
        if(!tempCustomer) return; 
        let equal = true; 
        if(customer.name !== tempCustomer.name){
            equal = false; 
        }
        if(customer.industry !== tempCustomer.industry){
            equal = false; 
        }
        if(equal){
            setChanged(false); 
        }
    })


    //Use Effect 
    useEffect(() => {
        
        
        const url = baseUrl + 'api/customers/' + id +'/'; 
        
        fetch(url)
        .then((response)=> {
            if(response.status === 404){
                //Resource not found 
                //Render a 404 
                // navigate('/404'); 
                //or redirect to a new page 
                setNotFound(true)


            }
            if(!response.ok) {
                
                throw new Error("Something went wrong try again later")
                
            }
            return response.json()
        })
        .then((data)=>{
            setCustomer(data.customer); 
            setTempCustomer(data.customer)
            setError(undefined); 
        }).catch((e) => {
            setError(e.message)
        });
    }, []); 
    function deleteCutomer(){
        console.log('deleting...')
    }
    
    function updateCustomer(){
        const url = baseUrl + 'api/customers/' + id + '/'; 
        fetch(url, {
            method:'POST', 
            headers: {
                'Content-Type' : 'application/json'

            }, 
            body: JSON.stringify(tempCustomer)
        }).then((response) => {
             
            if(!response.ok) throw new Error('something went wrong'); 
            return response.json()
        })
        .then((data) => {
            setCustomer(data.customer)
            setChanged(false);
            
            setError(undefined); 
        })
        .catch((e) => {
            
            setError(e.message); 
            
        }); 
    }

    return(
        <>
        {notFound ? <p> The customer with id {id} was not found</p> : null}

        {customer ? (
        <div>
           
            <input 
            className = "m-2 block px-2" 
            type = 'text' 
            value = {tempCustomer.name}
            onChange={(e) => {
                setChanged(true); 
                setTempCustomer({...tempCustomer, name: e.target.value})
                
            }}
            />
            <input 
            className = "m-2 block px-2" 
            type = 'text' 
            value = {tempCustomer.industry} 
            onChange={(e) => {
                setChanged(true)
                setTempCustomer({...tempCustomer, industry: e.target.value
                })
               
            }} 
            />
            {changed ? (
            <>
                <button className="m-2" onClick={(e) => {
                    setTempCustomer({...customer}); 
                    setChanged(false); 
                }}>
                    Cancel
                </button> 
                <button onClick={updateCustomer}>
                    Save
                    </button> 
            </> 
             ) : null
            }
            
        
        <button
        onClick={ (e) => {
            const url = baseUrl + 'api/customers/' + id + '/'; 
            fetch(url, {
                method: 'DELETE', 
                headers: {
                    'Content-Type': 'application/json'
            
            }}).then((response) =>{
                if(!response.ok){
                    throw new Error('something went wrong'); 
                }
                //assume things went well because of error
                setError(undefined)
                navigate('/customers'); 
               

            })
            .catch((e)=>{
                setError(e.message)
            })

     

        }}>
            Delete
        

        </button>
       

        </div> 
        ) : null
      
}     
            {error ? <p>{error}</p>:null}  
        <br/>
        <Link to = '/customers'>Go Back</Link>
        </>




    ) 
}