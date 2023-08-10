import React, {useState, useEffect} from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import * as mutations from '../src/graphql/mutations';
import {v4 as uuidv4} from 'uuid';
import Input from '/components/input';
import Select from '/components/select';

const UpdateItemForm = ({id}) =>{

     //State to keep track of the form
     const [update, setUpdate] = useState({
        dateUpdated: "",
        addedOrRemoved: "",
        quantity: "",
        comment: "",
    })

    //Handles form submit to update exisiting item
    const handleSubmit = async(e) => {
        e.preventDefault();

        //create a unique id
        let uniqueID = uuidv4();

        let newUpdate = {
            id: uniqueID,
            itemID: id,
            dateUpdated: update.dateUpdated,
            addedOrRemoved: update.addedOrRemoved,
            quantity: update.quantity,
            comment: update.comment
        }
        
        const newUpdateParams = {
            input: newUpdate
        };
       
        try{
            await API.graphql(graphqlOperation(mutations.createUpdatedItem, newUpdateParams));
            
            setUpdate({
                dateUpdated: "",
                addedOrRemoved: "",
                quantity: "",
                comment: "",
            });
           
            console.log('Successfully updated item.')
        }catch (err){
            console.log(err)
        }
    }

    return(
        <div>
            <form className="" onSubmit={handleSubmit}>
                <Select
                    label={"Add or Remove"}
                    value={update.addedOrRemoved}
                    onChange={(e) => setUpdate({...update, addedOrRemoved: e.target.value})}
                >
                    <option>Add</option>
                    <option>Remove</option>
                </Select>
                <Input 
                    htmlFor={"dateUpdated"}
                    label={"Date Updated"}
                    name={"dateUpdated"}
                    type={"date"}
                    value={update.dateUpdated}
                    placeHolder={"Date Updated"}
                    onChange={(e) => setUpdate({ ...update, dateUpdated: e.target.value })} 
                    />
                <Input 
                    htmlFor={"quantity"}
                    label={"Quantity"}
                    name={"quantity"}
                    type={"number"}
                    value={update.quantity}
                    placeHolder={"Quantity"}
                    onChange={(e) => setUpdate({ ...update, quantity: e.target.value })} 
                    />
                <Input 
                    htmlFor={"comment"}
                    label={"Comment"}
                    name={"comment"}
                    type={"text"}
                    value={update.comment}
                    placeHolder={"Comments"}
                    onChange={(e) => setUpdate({ ...update, comment: e.target.value })} 
                    />
                
                <div className="submit-form">
                    <button className="btn" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateItemForm;
    