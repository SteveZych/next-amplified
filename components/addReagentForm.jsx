import React, {useState, useEffect} from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
// import {createReagent} from '../src/graphql/mutations';
import * as mutations from '../src/graphql/mutations';
//comment

const AddReagentForm = () => {

    //State to keep track of the form
    const [reagent, setReagent] = useState({
        id: "789",
        name: "",
        qualityControlInterval: ""
    });

    const qualityControlIntervalOptions = ["Test","Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]


    const handleSubmit = async(e) => {
        e.preventDefault();
        const reagentParams = {
            input: reagent
        };
        try{
            console.log(reagent);
            await API.graphql(graphqlOperation(mutations.createReagent, reagentParams));
        }catch (err){
            console.log(err)
        }
        
        
    }
    // const handleSubmit = async(e) => {
    //     e.preventDefault();
        
    //     try{
    //         console.log(reagent);
    //         await API.graphql({ 
    //             query: mutations.createReagent, 
    //             variables: { input: reagent }
    //           });
    //     }catch (err){
    //         console.log(err)
    //     }
        
        
    // }

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