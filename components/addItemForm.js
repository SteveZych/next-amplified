import React, {useState, useEffect} from 'react';

// getServerSideProps to fetch available reagents to choose from 
// passed as props to UpdateItemForm as a list of reagents users can choose from


const UpdateItemForm = () => {

    //State to keep track of the form
    const [item, setItem] = useState({
        reagentName: "",
        expirationDate: "",
        receivedDate: "",
        quantity: "",
        addOrRemove: ""
    })

}

export default UpdateItemForm;