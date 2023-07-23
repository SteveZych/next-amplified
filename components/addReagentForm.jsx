import React, {useState, useEffect} from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
import * as mutations from '../src/graphql/mutations';
import * as queries from '../src/graphql/queries';
import {v4 as uuidv4} from 'uuid';

const AddReagentForm = () => {

    //State to keep track of the form
    const [reagent, setReagent] = useState({
        id: "",
        name: "",
        qualityControlInterval: ""
    });

    const [listReagents, setListReagents] = useState([]);

    const qualityControlIntervalOptions = ["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]

    //Query for existing reagents and put them in a table
    useEffect(() =>{
        //make an API call 
        async function fetchData(){
            try{
                let data = await API.graphql(graphqlOperation(queries.listReagents));
                let existingReagents = data.data.listReagents.items;
                existingReagents.map(obj =>{
                    obj.isEditing = false;
                })
                setListReagents(existingReagents);
                console.log(existingReagents);
            }catch (err){
                console.log(err)
            }
        }
        fetchData();
    }, [])

    //Handles form submit to create a new reagent
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

    const editReagent = (id) => {
        //change the isEditing property to true
        setListReagents(prevListReagents => {
            return prevListReagents.map(reagent => reagent.id === id ? {...reagent, isEditing: true} : reagent)
        })
    }
    const saveReagent = (id) => {
        //change object isEditing to false
        setListReagents(prevListReagents => {
            return prevListReagents.map(reagent => reagent.id === id ? {...reagent, isEditing: false} : reagent)
        })
        console.log(listReagents);
        //API call to update paramaters
    }

    const deleteReagent = async (reagentID) => {
        //delete from listReagent state

        //API call to delete with id
        try{
              const deletedTodo = await API.graphql({ 
                query: mutations.deleteReagent, 
                variables: { input: {id: reagentID} }
              });
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
                                
                                <td>{!thisReagent.isEditing ? <button onClick={()=> editReagent(thisReagent.id)}>Edit</button> : <button onClick={()=> saveReagent(thisReagent.id)}>Save</button>}</td>
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