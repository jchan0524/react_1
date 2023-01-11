import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import NotFound from "../components/NotFound";
import { baseUrl } from "../shared";


export default function Customer(){
    const {id} = useParams(); 
    const [customer, setCustomer] = useState(); 
    const [notFound, setNotFound] = useState(); 
    const navigate = useNavigate(); 
    useEffect(() => {
        console.log('useEffect'); 
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
            return response.json()
        })
        .then((data)=>{
            setCustomer(data.customer); 
        });
    }, []); 
    return(
        <>
        {notFound ? <p> The customer with id {id} was not found</p> : null}

        {customer ? (
        <div>
            <p>{customer.id}</p>
            <p>{customer.name}</p>
            <p>{customer.industry}</p>
            
        </div> 
        ) : null
      
}
        <Link to = '/customers'>Go Back</Link>
        
        
        
        
        </>




    ) 
}