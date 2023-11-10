import React, {useState, useEffect} from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import * as mutations from '../src/graphqlcopy/mutations';
import {v4 as uuidv4} from 'uuid';
import {reagentTemplateData} from '../Functions/reagentTemplateData';
import Input from '/components/input';
import Select from '/components/select';
import Link from 'next/link';


const AddItemForm = ({recallLisOfItems}) => {

    //State to keep track of the form
    const [item, setItem] = useState({
        reagentID: "",
        reagentName: "",
        lot: "",
        expirationDate: "",
        receivedDate: "",
        quantity: ""
    })

    const [formState, setFormState] = useState(false)

    const [listReagents, setListReagents] = useState([]);

    //Query for existing reagents and put them in state on page load
    useEffect(() =>{
        reagentTemplateData().then(data => {
            if (data === false || data.length === 0){
                setListReagents(false)
            }else{
                setListReagents(data);
            }
        })
    }, [])

    //Handles form submit to create a new item
    const handleSubmit = async(e) => {
        e.preventDefault();

        //create a unique id
        let uniqueID = uuidv4();

        let newItem = {
            id: uniqueID,
            reagentID: item.reagentID,
            lot: item.lot,
            expirationDate: item.expirationDate,
            receivedDate: item.receivedDate,
            initialQuantity: item.quantity,
            currentQuantity: item.quantity
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
                lot: "",
                expirationDate: "",
                receivedDate: "",
                quantity: ""
            });

            setFormState(false);
            recall();
            console.log('Successfully added new item.')
        }catch (err){
            console.log(err)
        }
    }

    const handleFormChange = (e) =>{
        e.preventDefault();
        if (!formState){
            setFormState(true);
        }else{
            setFormState(false)
        }
        renderIfReagentsExist();
    }

    const renderIfReagentsExist = () =>{
        if (listReagents && formState){
            return(
                <form className="" onSubmit={handleSubmit}>
                
                    <Select
                        label={"Choose Reagent"}
                        value={item.reagentID}
                        onChange={(e) => setItem({...item, reagentID: e.target.value})}
                    >
                        <option value="" disabled>Select an option</option>
                        {listReagents.map((option) =>{
                                return <option key={option.id} value={option.id}>{option.name}</option>
                            })}
                    </Select>

                    <Input 
                        htmlFor={"lot"}
                        label={"Lot"}
                        name={"lot"}
                        type={"text"}
                        value={item.lot}
                        placeHolder={"Lot"}
                        onChange={(e) => setItem({ ...item, lot: e.target.value })}
                        />
                    
                    <Input 
                        htmlFor={"expirationDate"}
                        label={"Expiration Date"}
                        name={"expirationDate"}
                        type={"date"}
                        value={item.expirationDate}
                        placeHolder={"Date Performed"}
                        onChange={(e) => setItem({ ...item, expirationDate: e.target.value })}
                        />
                    
                    <Input 
                        htmlFor={"receivedDate"}
                        label={"Received Date"}
                        name={"receivedDate"}
                        type={"date"}
                        value={item.receivedDate}
                        placeHolder={"Received Date"}
                        onChange={(e) => setItem({ ...item, receivedDate: e.target.value })}
                        />
                    
                    <Input 
                        htmlFor={"itemQuantity"}
                        label={"Quantity"}
                        name={"itemQuantity"}
                        type={"number"}
                        value={item.quantity}
                        placeHolder={"Quantity"}
                        onChange={(e) => setItem({ ...item, quantity: e.target.value })}
                        />
                    
                    <div className="submit-form">
                        <button className="btn" type="submit">Submit</button>
                    </div>
                    <div>
                        <button onClick={handleFormChange}>Cancel</button>
                    </div>
                </form>
            )
        }else if (listReagents && !formState){
            return <button onClick={handleFormChange}>Add Reagent</button>
        }else{
            return <Link href="/addReagent"><button>Add reagent template</button></Link>
        }
    }

    return(
        <div>
            {renderIfReagentsExist()}
        </div>
    )

}

export default AddItemForm;