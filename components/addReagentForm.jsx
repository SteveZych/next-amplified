import React, {useState, useEffect} from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
import * as mutations from '../src/graphql/mutations';
import * as queries from '../src/graphql/queries';
import {v4 as uuidv4} from 'uuid';
import {reagentTemplateData} from './reagentTemplateData';

const AddReagentForm = () => {

    //State to keep track of the form
    const [reagent, setReagent] = useState({
        name: "",
        qualityControlInterval: "None"
    });

    const [listReagents, setListReagents] = useState([]);

    const qualityControlIntervalOptions = ["None", "Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]

    //Query for existing reagents and put them in a table on page load
    useEffect(() =>{
        reagentTemplateData().then(data => setListReagents(data));
    }, [])

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
            //Recall the newly submitted data from API
            reagentTemplateData().then(data => setListReagents(data));
            console.log('Successfully added new reagent.')
        }catch (err){
            console.log(err)
        }
    }

    const editReagent = (id) => {
        //change the isEditing property to true to enable editing of input
        setListReagents(prevListReagents => {
            return prevListReagents.map(reagent => reagent.id === id ? {...reagent, isEditing: true} : reagent)
        })
    }
    const saveReagent = async (index) => {
        
        const {id, name, qualityControlInterval} = listReagents[index]
        
        //API call to update paramaters
        try{
            const updateCurrentReagent = await API.graphql({ 
                query: mutations.updateReagent, 
                variables: { input: {id, name, qualityControlInterval} }
              });
              console.log("Successfully updated reagent.")

              //Recall the newly submitted data from API
              reagentTemplateData().then(data => setListReagents(data));
      }catch (err){
          console.log(err);
      }
    }

    const deleteReagent = async (reagentID) => {

        //API call to delete with id
        try{
              const deleteCurrentReagent = await API.graphql({ 
                query: mutations.deleteReagent, 
                variables: { input: {id: reagentID} }
              });
              console.log("Successfully deleted reagent.")

              //Recall the newly submitted data from API
              reagentTemplateData().then(data => setListReagents(data));
        }catch (err){
            console.log(err);
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
            <table>
                <tbody>
                    {listReagents.map((thisReagent, index) =>{
                        return (
                            <tr key={thisReagent.id}>
                                <td>{thisReagent.id}</td>
                                <td><input
                                name="reagentName"
                                type="text"
                                value={thisReagent.name}
                                onChange={(e) => setListReagents(prevListReagents => {
                                    return prevListReagents.map(reag => thisReagent.id === reag.id ? {...reag, name: e.target.value} : reag)
                                })}
                                disabled={!thisReagent.isEditing ? "disabled" : ''}
                                ></input></td>
                                <td><input
                                name="qualityControlInterval"
                                type="text"
                                value={thisReagent.qualityControlInterval}
                                onChange={(e) => setListReagents(prevListReagents => {
                                    return prevListReagents.map(reag => thisReagent.id === reag.id ? {...reag, qualityControlInterval: e.target.value} : reag)
                                })}
                                disabled={!thisReagent.isEditing ? "disabled" : ''}
                                ></input></td>
                                
                                <td>{!thisReagent.isEditing ? <button onClick={()=> editReagent(thisReagent.id)}>Edit</button> : <button onClick={()=> saveReagent(index)}>Save</button>}</td>
                                <td><button onClick={()=> deleteReagent(thisReagent.id)}>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )

}

export default AddReagentForm;