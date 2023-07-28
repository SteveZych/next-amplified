import React, {useState, useEffect} from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import * as mutations from '../src/graphql/mutations';
import {v4 as uuidv4} from 'uuid';
import {reagentTemplateData} from './reagentTemplateData';

const AddReagentForm = () => {

    //State to keep track of the form
    const [reagent, setReagent] = useState({
        name: "",
        qualityControlInterval: "None"
    });

    //Handles form submit to create a new reagent
    const handleSubmit = async(e) => {
        e.preventDefault();

        //create a unique id
        let uniqueID = uuidv4();

        let newReagent = {
            id: uniqueID,
            name: reagent.name,
            qualityControlInterval: reagent.qualityControlInterval
        }
        
        const reagentParams = {
            input: newReagent
        };
       
        try{
            await API.graphql(graphqlOperation(mutations.createReagent, reagentParams));
            
            setReagent({
                name: "",
                qualityControlInterval: "None"
            });
            console.log('Successfully added new reagent.')
        }catch (err){
            console.log(err)
        }
    }

    return(
        <div>
            <form className="" onSubmit={handleSubmit}>
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
                <div>
                    <select value={reagent.qualityControlInterval} onChange={(e) => setReagent({ ...reagent, qualityControlInterval: e.target.value })}>
                        {qualityControlIntervalOptions.map((option, index) =>{
                            return <option key={index}>{option}</option>
                        })}
                    </select>
                </div>
                <div className="submit-form">
                    <button className="btn" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )

}

export default AddReagentForm;