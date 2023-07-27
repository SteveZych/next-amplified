import React, {useState, useEffect} from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import * as mutations from '../src/graphql/mutations';
import {v4 as uuidv4} from 'uuid';
import {reagentTemplateData} from './reagentTemplateData';

//ITEMS ARE INSTANCES OF A REAGENT//

const AddItemForm = () => {

    //State to keep track of the form
    const [item, setItem] = useState({
        reagentID: "",
        reagent: "",
        expirationDate: "",
        receivedDate: "",
        quantity: ""
    })

    const [listReagents, setListReagents] = useState([]);

    //Query for existing reagents and put them in state on page load
    useEffect(() =>{
        reagentTemplateData().then(data => setListReagents(data));
    }, [])

    //Handles form submit to create a new item
    const handleSubmit = async(e) => {
        e.preventDefault();

        //create a unique id
        let uniqueID = uuidv4();

        let newItem = {
            id: uniqueID,
            reagentID: item.reagentID,
            reagentName: item.reagent,
            expirationDate: item.expirationDate,
            receivedDate: item.receivedDate,
            quantity: item.quantity
        }
        
        const itemParams = {
            input: newItem
        };
       
        try{
            await API.graphql(graphqlOperation(mutations.createItem, itemParams));
            
            setItem({
                id: "",
                reagentID: "",
                reagent: "",
                expirationDate: "",
                receivedDate: "",
                quantity: ""
            });
            //Recall the newly submitted data from API
            reagentTemplateData().then(data => setListReagents(data));
            console.log('Successfully added new item.')
        }catch (err){
            console.log(err)
        }
    }

    return(
        <div>
             <form className="" onSubmit={handleSubmit}>
                <div>
                    <select value={item.reagent} onChange={(e) => setItem({ ...item, reagent: e.target.value })}>
                        {listReagents.map((option, index) =>{
                            return <option key={index}>{option}</option>
                        })}
                    </select>
                </div>
                <div className="reagentName-form">
                    <p><label htmlFor="reagentName">Reagent Name</label></p>
                    <p><input
                        name="reagentName"
                        type="text"
                        value={reagent.name}
                        placeholder="Reagent Names"
                        onChange={(e) => setReagent({ ...reagent, name: e.target.value })}
                        required
                    /></p>
                </div>
                
                <div className="submit-form">
                    <button className="btn" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )

}

export default UpdateItemForm;