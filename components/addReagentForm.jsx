import React, {useState, useEffect} from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import * as mutations from '../src/graphqlcopy/mutations';
import {v4 as uuidv4} from 'uuid';
import Input from '/components/input';
import Select from '/components/select';
import Button from "/components/button";

const AddReagentForm = ({recallReagentTemplateData}) => {

    //State to keep track of the form
    const [reagent, setReagent] = useState({
        name: "",
        qualityControlInterval: "",
        upperLimitQuantity: "",
        lowerLimitQuantity: ""
    });

    const [formState, setFormState] = useState(false);

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
            recallReagentTemplateData();
        }catch (err){
            console.log(err)
        }
    }

    const handleToggle = (e) =>{
        setFormState(!formState);
        setReagent({
            name: "",
            qualityControlInterval: "None",
            upperLimitQuantity: "",
            lowerLimitQuantity: ""
        });
    }

    return(
        <div>
            {formState ?
            <div className="overlayForm">
                <form className="form" >
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
                        <option value="" disabled>Select an option</option>
                        {qualityControlIntervalOptions.map((option, index) =>{
                                return <option key={index} value ={option}>{option}</option>
                            })}
                    </Select>
                    <Button className={"btn"} click={handleSubmit}>Submit</Button>
                    <Button className={"btn cancelBtn"} click={handleToggle}>Cancel</Button>
                    
                </form>
            </div> 
            : <Button className={"btn"} click={handleToggle}>+ Reagent Template</Button>}
        </div>
    )

}

export default AddReagentForm;