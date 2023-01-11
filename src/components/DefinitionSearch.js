import {useState, useEffect} from 'react'; 
import { useNavigate } from 'react-router-dom';

export default function DefinitionSearch(){
    const [word, setWord] = useState('');
    const navigate = useNavigate(); 
    




    /**
     * UseEffect notes ****
     * 
     * No dependency array -> update for any state change
     * Empty dependency array --> execute once 
     *      -For initial page load everything is set up -> only need it once 
     *      -For example you use state if you want to fetch data from database on load but want all of the data user entered in after initial load
     * Passing in data--> only execute when those state variables are changed
     *  Does not depend on other state variables not in array (Does not wait around for the other varible to update) ---- allows to keep one variable updated and leave the other alone
     */


    return (
        <form 
        className='flex space-between space-x-2 max-w-[300px]'
        onSubmit={() => {
            
            navigate('/dictionary/' + word); 

        }}>

        <input 
        className='shrink  min-w-0 px-2 py-1 rounded'
        placeholder='Enter Word'
        type = 'text' onChange={(e) => {
            setWord(e.target.value); 
        
        
        }}
        
        />
        <button className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded'>Search</button>
        
        </form>
    )


}