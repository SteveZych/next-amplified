import React, {useState, useEffect} from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import * as mutations from '../src/graphql/mutations';
import {v4 as uuidv4} from 'uuid';
import Input from '/components/input';
import Select from '/components/select';

const AddReagentForm = ({formSubmit}) => {

    //State to keep track of the form
    const [reagent, setReagent] = useState({
        name: "",
        qualityControlInterval: "None",
        upperLimitQuantity: "",
        lowerLimitQuantity: ""
    });

    const qualityControlIntervalOptions = ["None", "Once", "Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]

    //Handles form submit to create a new reagent
    const handleSubmit = async(e) => {
        e.preventDefault();

        //create a unique id
        let uniqueID = uuidv4();

        let newReagent = {
            id: uniqueID,
            name: reagent.name,
            qualityControlInterval: reagent.qualityControlInterval,
            upperLimitQuantity: reagent.upperLimitQuantity,
            lowerLimitQuantity: reagent.lowerLimitQuantity
        }
        
        const reagentParams = {
            input: newReagent
        };
       
        try{
            await API.graphql(graphqlOperation(mutations.createReagent, reagentParams));
            
            setReagent({
                name: "",
                qualityControlInterval: "None",
                upperLimitQuantity: "",
                lowerLimitQuantity: ""
            });
            console.log('Successfully added new reagent.')
            formSubmit;
        }catch (err){
            console.log(err)
        }
    }

    return(
        <div>
            <form className="" onSubmit={handleSubmit}>
                <Input 
                    htmlFor={"reagentName"}
                    label={"Reagent Name"}
                    name={"reagentName"}
                    type={"text"}
                    value={reagent.name}
                    placeHolder={"Reagent Name"}
                    onChange={(e) => setReagent({ ...reagent, name: e.target.value })}
                    />
                <Input 
                    htmlFor={"upperLimitQuantity"}
                    label={"Upper Limit Quantity"}
                    name={"upperLimitQuantity"}
                    type={"number"}
                    value={reagent.upperLimitQuantity}
                    placeHolder={"Upper Limit Quantity"}
                    onChange={(e) => setReagent({ ...reagent, upperLimitQuantity: e.target.value })}
                    />
                <Input 
                    htmlFor={"lowerLimitQuantity"}
                    label={"Lower Limit Quantity"}
                    name={"lowerLimityQuantity"}
                    type={"number"}
                    value={reagent.lowerLimitQuantity}
                    placeHolder={"Lower Limit Quantity"}
                    onChange={(e) => setReagent({ ...reagent, lowerLimitQuantity: e.target.value })}
                    />
                <Select
                    label={"Quality Control Interval"}
                    value={reagent.qualityControlInterval}
                    onChange={(e) => setReagent({ ...reagent, qualityControlInterval: e.target.value })}
                >
                    {qualityControlIntervalOptions.map((option, index) =>{
                            return <option key={index}>{option}</option>
                        })}
                </Select>
                <div className="submit-form">
                    <button className="btn" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )

}

export default AddReagentForm;