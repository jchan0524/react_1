import {useState, useEffect} from 'react'; 

export default function Dictionary(){
    const [word, setWord] = useState('');
    const [word2, setWord2] = useState(''); 
    

    useEffect( () => {
        console.log("state updated", word); 
    }, [word]
    ); //Executes after the state is instantiated allows for it to always check for changes on page load
    useEffect( () => {
        console.log("state updated 2", word2); 
    }, [word2]
    );


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
        <>

        <input type = 'text' onChange={(e) => {
            setWord(e.target.value); 
        
        
        }}
        
        />

        <h2> Let's get the definition for {word} </h2> 


        <input type = 'text' onChange={(e) => {
            setWord2(e.target.value); 
        
        
        }}
        
        />

        <h2> Let's get the definition for {word2} </h2> 
        
        
        
        </>
    )

}