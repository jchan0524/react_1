function Employee(props) {
    return( 
        <>
        {/* Props are not supposed to be changed in child only parent in app.js */}
        <h3> Employee {props.name} </h3>
        <p>{props.role ? props.role : "No role"}</p>
    </>
    )
}
export default Employee; 