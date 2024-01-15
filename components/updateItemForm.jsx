import React, {useState, useEffect} from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import * as mutations from '../src/graphqlcopy/mutations';
import {v4 as uuidv4} from 'uuid';
import Input from '/components/input';
import Select from '/components/select';
import Button from "/components/button";
import Textarea from "/components/textarea";

const UpdateItemForm = ({id, reagentName, reagentLot}) =>{

     //Form open or close state
     const [formState, setFormState] = useState(false);

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

    const handleFormChange = () =>{
        setFormState(!formState);
        setUpdate({
            dateUpdated: "",
            addedOrRemoved: "",
            quantity: "",
            comment: "",
        });
    }

    return(
        <div>
            {formState ? 
            <div className="overlayForm">
                <form className="form" >

                    <p>{reagentName}</p>
                    <p>{reagentLot}</p>
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
                    <Textarea 
                        htmlFor={"comments"}
                        label={"Comments"}
                        name={"comments"}
                        type={"text"}
                        value={update.comment}
                        placeHolder={"Comments"}
                        onChange={(e) => setUpdate({ ...update, comment: e.target.value })} 
                        />
                    
                    <div className="submit-form">
                        <Button click={()=> handleSubmit()}>Submit</Button>
                    </div>
                    <div>
                        <Button click={() => handleFormChange()}>Cancel</Button>
                    </div>
                </form>
            </div>
            :
            <div><Button click={() => handleFormChange()}>+/-</Button></div>}
        </div>
    )
}

export default UpdateItemForm;
    