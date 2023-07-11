import React, {useState, useEffect} from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
import * as mutations from '../src/graphql/mutations';
import {v4 as uuidv4} from 'uuid';

const AddReagentForm = () => {

    //State to keep track of the form
    const [reagent, setReagent] = useState({
        id: "",
        name: "",
        qualityControlInterval: ""
    });

    const qualityControlIntervalOptions = ["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]


    const handleSubmit = async(e) => {
        e.preventDefault();

        //create a unique id
        let uniqueID = uuidv4();
        setReagent({...reagent, id: uniqueID})

        const reagentParams = {
            input: reagent
        };
        try{
            await API.graphql(graphqlOperation(mutations.createReagent, reagentParams));
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
                    <select onChange={(e) => setReagent({ ...reagent, qualityControlInterval: e.target.value })}>
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