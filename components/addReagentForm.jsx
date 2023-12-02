import React, {useState, useEffect} from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import * as mutations from '../src/graphqlcopy/mutations';
import {v4 as uuidv4} from 'uuid';
import InPut from '/components/input';
import Selection from '/components/select';
import Option from '@mui/joy/Option';
import Button from '@mui/joy/Button';


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
        e.preventDefault()
        setFormState(!formState)
    }

    return(
        <div>
            {formState ?
            <form className="" >
                <InPut 
                    htmlFor={"reagentName"}
                    label={"Reagent Name"}
                    name={"reagentName"}
                    type={"text"}
                    value={reagent.name}
                    placeHolder={"Reagent Name"}
                    onChange={(e) => setReagent({ ...reagent, name: e.target.value })}
                    />
                <InPut 
                    htmlFor={"upperLimitQuantity"}
                    label={"Upper Limit Quantity"}
                    name={"upperLimitQuantity"}
                    type={"number"}
                    value={reagent.upperLimitQuantity}
                    placeHolder={"Upper Limit Quantity"}
                    onChange={(e) => setReagent({ ...reagent, upperLimitQuantity: e.target.value })}
                    />
                <InPut 
                    htmlFor={"lowerLimitQuantity"}
                    label={"Lower Limit Quantity"}
                    name={"lowerLimityQuantity"}
                    type={"number"}
                    value={reagent.lowerLimitQuantity}
                    placeHolder={"Lower Limit Quantity"}
                    onChange={(e) => setReagent({ ...reagent, lowerLimitQuantity: e.target.value })}
                    />
                <Selection
                    label={"Quality Control Interval"}
                    value={reagent.qualityControlInterval}
                    onChange={(e, newValue) => setReagent({ ...reagent, qualityControlInterval: newValue })}
                >
                    <Option value="" disabled>Select an option</Option>
                    {qualityControlIntervalOptions.map((option, index) =>{
                            return <Option key={index} value ={option}>{option}</Option>
                        })}
                </Selection>
                <Button color="neutral" variant="soft" onClick={handleSubmit}>Submit</Button>
                <Button color="neutral" variant="soft" onClick={handleToggle}>Cancel</Button>
                
            </form>
            : <Button color="neutral" variant="soft" onClick={handleToggle}>Add Reagent Template</Button>}
        </div>
    )

}

export default AddReagentForm;