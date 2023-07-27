import React, {useState, useEffect} from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import * as mutations from '../src/graphql/mutations';
import {v4 as uuidv4} from 'uuid';
import {reagentTemplateData} from './reagentTemplateData';

const AddItemForm = () => {

    //State to keep track of the form
    const [item, setItem] = useState({
        reagentName: "",
        expirationDate: "",
        receivedDate: "",
        quantity: "",
        addOrRemove: "Add"
    })

    const [listReagents, setListReagents] = useState([]);

    //Query for existing reagents and put them in a table on page load
    useEffect(() =>{
        reagentTemplateData().then(data => setListReagents(data));
    }, [])

}

export default UpdateItemForm;