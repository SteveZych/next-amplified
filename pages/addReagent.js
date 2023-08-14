import AddReagentForm from "../components/addReagentForm";

import React, {useState, useEffect} from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import * as mutations from '../src/graphql/mutations';
import {v4 as uuidv4} from 'uuid';
import {reagentTemplateData} from '../Functions/reagentTemplateData';
import Link from 'next/link';

// TODO: Figure out how to recall the new data when user submits form now 
// that the form is abstracted to a component File.

const AddReagent = () => {

    const [listReagents, setListReagents] = useState([]);

    const qualityControlIntervalOptions = ["None", "Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]

    //Query for existing reagents and put them in a table on page load
    useEffect(() =>{
        reagentTemplateData().then(data => {
            if (data == null){
                setListReagents([])
            }else{
                setListReagents(data);
            }
        })
    }, [])


    //Allows user to edit the reagent inputs
    const editReagent = (id) => {
        setListReagents(prevListReagents => {
            return prevListReagents.map(reagent => reagent.id === id ? {...reagent, isEditing: true} : reagent)
        })
    }

    //Allows user to save edited reagent input and pushes changes to server
    const saveReagent = async (index) => {
        const {id, name, qualityControlInterval} = listReagents[index]
        
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

    //Allows user to delete reagent 
    const deleteReagent = async (reagentID) => {

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
            <Link href="/dashboard">Back to Dashboard</Link>
            <AddReagentForm/>

            {listReagents === [] ? "No reagents available." :
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
                                
                                    <td><select 
                                        value={thisReagent.qualityControlInterval} 
                                        onChange={(e) => setListReagents(prevListReagents => {
                                            return prevListReagents.map(reag => thisReagent.id === reag.id ? {...reag, qualityControlInterval: e.target.value} : reag)
                                        })}
                                        disabled={!thisReagent.isEditing ? "disabled" : ''}
                                        >
                                        {qualityControlIntervalOptions.map((option, index) =>{
                                            return <option key={index}>{option}</option>
                                        })}
                                        </select></td>

                                    <td>{!thisReagent.isEditing ? <button onClick={()=> editReagent(thisReagent.id)}>Edit</button> : <button onClick={()=> saveReagent(index)}>Save</button>}</td>

                                    <td><button onClick={()=> deleteReagent(thisReagent.id)}>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            }
        </div>
    )

}

export default AddReagent;