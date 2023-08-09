import React, {useState, useEffect} from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import * as mutations from '../src/graphql/mutations';
import {v4 as uuidv4} from 'uuid';
import {reagentTemplateData} from '../functions/reagentTemplateData';

//ITEMS ARE INSTANCES OF A REAGENT//

const AddItemForm = () => {

    //State to keep track of the form
    const [item, setItem] = useState({
        reagentID: "",
        reagentName: "",
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
           
            console.log('Successfully added new item.')
        }catch (err){
            console.log(err)
        }
    }

    return(
        <div>
             <form className="" onSubmit={handleSubmit}>
                <div>
                    <p><label htmlFor="">Choose Reagent</label></p>
                    <select value={item.reagent} onChange={(e) => {
                        listReagents.filter((reag) => e.target.value === reag.name).map(selectedReagent => setItem({ ...item, reagentID: selectedReagent.id, reagentName: selectedReagent.name }))}}>
                        {listReagents.map((option) =>{
                            return <option key={option.id}>{option.name}</option>
                        })}
                    </select>
                </div>
                <div>
                    <p><label htmlFor="expirationDate">Expiration Date</label></p>
                    <input
                        name="expirationDate"
                        type="date"
                        value={item.expirationDate}
                        placeholder="Exiration Date"
                        onChange={(e) => setItem({ ...item, expirationDate: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <p><label htmlFor="receivedDate">Received Date</label></p>
                    <input
                        name="receivedDate"
                        type="date"
                        value={item.receivedDate}
                        placeholder="Received Date"
                        onChange={(e) => setItem({ ...item, receivedDate: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <p><label htmlFor="itemQuantity">Quantity</label></p>
                    <p><input
                        name="itemQuantity"
                        type="number"
                        value={item.quantity}
                        placeholder="Quantity"
                        onChange={(e) => setItem({ ...item, quantity: e.target.value })}
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

export default AddItemForm;